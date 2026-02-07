import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
  RefreshControl,
  TextInput,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import Navbar from "../components/Navbar";
import CustomIcon from "../components/CustomIcon";
import useStore from "../store/useStore";
import { auth } from "../firebaseConfig";
import { useNetworkCheck } from "../store/useNetwork";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [userName, setUserName] = useState("Guest");
  const BASE_URL = "https://orbitmediasolutions.com/";

  const { allData, loading, fetchHomeData, _hasHydrated, blogs } = useStore();
  useNetworkCheck();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUserName(auth.currentUser?.displayName || "Guest");
    });

    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    const initApp = async () => {
      if (_hasHydrated) {
        try {
          await fetchHomeData();
        } catch (error) {
          console.log("App opened offline or fetch failed");
        }
      }
    };
    
    initApp();
  }, [_hasHydrated]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHomeData();
    setRefreshing(false);
  }, [fetchHomeData]);

  const filteredItems = useMemo(() => {
    let data = allData;
    if (searchQuery.trim()) {
      return data.filter(
        (item) =>
          item.displayTitle
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (activeTab !== "All") {
      data = data.filter((item) => item.type === activeTab);
    }
    return data;
  }, [searchQuery, activeTab, allData]);

  const handleEmergencyCall = () => {
    const phoneNumber = "tel:00447935390848";
    Linking.canOpenURL(phoneNumber).then((supported) => {
      if (supported) Linking.openURL(phoneNumber);
      else Alert.alert("Error", "Phone calls not supported");
    });
  };

  const getHeroIcon = (title, type) => {
    const t = title.toLowerCase();
    if (t.includes("erp") || t.includes("management")) return "layer-group";
    if (t.includes("pos") || t.includes("shop")) return "layer-group";
    // if (t.includes("web") || t.includes("code")) return "concierge-bell";
    if (t.includes("app") || t.includes("mobile")) return "concierge-bell";
    return type === "Products" ? "layer-group" : "concierge-bell";
  };

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => navigation.navigate("BlogDetails", { blog: item })}
    >
      <Image
        source={{ uri: `${BASE_URL}${item.displayImage}` }}
        style={styles.blogImage}
        resizeMode="cover"
      />

      <View style={styles.blogInfo}>
        <Text style={styles.blogTitle} numberOfLines={2}>
          {item.displayTitle}
        </Text>

        <Text style={styles.blogReadMore}>Read Post →</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() =>
        navigation.navigate(
          item.type === "Products" ? "ProductDetails" : "ServiceDetails",
          { [item.type === "Products" ? "product" : "service"]: item },
        )
      }
    >
      <Image
        source={{ uri: `${BASE_URL}${item.displayImage}` }}
        style={styles.cardImage}
      />
      <View style={styles.cardInfo}>
        <View
          style={[
            styles.typeBadge,
            {
              backgroundColor: item.type === "Products" ? "#6200EE" : "#03DAC6",
            },
          ]}
        >
          <Text style={styles.typeText}>
            {item.type === "Products" ? "PRODUCT" : "SERVICE"}
          </Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.displayTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // HEADER
  const renderHeader = () => (
    <View style={styles.headerContent}>
      {!searchQuery && (
        <>
          <View style={styles.quickAccessWrapper}>
            <Text style={styles.miniSectionTitle}>Quick Access</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickAccessContainer}
            >
              {allData.map((item) => (
                <TouchableOpacity
                  key={item.uniqueKey}
                  style={styles.miniButton}
                  onPress={() =>
                    navigation.navigate(
                      item.type === "Products"
                        ? "ProductDetails"
                        : "ServiceDetails",
                      {
                        [item.type === "Products" ? "product" : "service"]:
                          item,
                      },
                    )
                  }
                >
                  <View
                    style={[
                      styles.miniIconCircle,
                      {
                        backgroundColor:
                          item.type === "Products" ? "#F0F3FF" : "#F8F0FF",
                      },
                    ]}
                  >
                    <CustomIcon
                      name={getHeroIcon(item.displayTitle, item.type)}
                      size={20}
                      color={item.type === "Products" ? "#1A3067" : "#6200EE"}
                    />
                  </View>
                  <Text style={styles.miniButtonLabel} numberOfLines={1}>
                    {item.displayTitle.split(" ")[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Featured Solutions</Text>
          </View>
          <View style={styles.filterContainer}>
            {["All", "Products", "Services"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.filterBtn,
                  activeTab === tab && styles.filterBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeTab === tab && styles.filterTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {searchQuery ? (
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Search Results</Text>
        </View>
      ) : null}
    </View>
  );

  const renderFooter = () => {
    if (searchQuery || blogs.length === 0)
      return <View style={{ height: 100 }} />;

    return (
      <View style={{ marginTop: 20, paddingBottom: 100 }}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Latest Insights</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={blogs}
          horizontal
          renderItem={renderBlogItem}
          keyExtractor={(item) => `blog-footer-${item.id}`}
          contentContainerStyle={{ paddingLeft: 20 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.greetingText}>Hello {userName}</Text>
        <Text style={styles.subGreeting}>
          How can Orbit help your business today?
        </Text>
        <View style={styles.searchBarContainer}>
          <CustomIcon name="search" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for ERP, POS, or Web Dev..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <CustomIcon name="times-circle" size={18} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && allData.length === 0 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1A3067" />
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderCard}
          keyExtractor={(item) => item.uniqueKey}
          extraData={[activeTab, searchQuery]}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          numColumns={2}
          keyboardShouldPersistTaps="handled"
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No matches found.</Text>
          }
        />
      )}

      {/* Floating Buttons */}
      <View style={styles.floatingGroup}>
        <TouchableOpacity
          style={[styles.stickyBtn, styles.supportSticky]}
          onPress={handleEmergencyCall}
        >
          <CustomIcon name="phone-alt" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stickyBtn}
          onPress={() => navigation.navigate("Form")}
        >
          <CustomIcon name="calendar-check" size={18} color="white" />
          <Text style={styles.stickyBtnText}>Book Services</Text>
        </TouchableOpacity>
      </View>
      <Navbar />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerContent: { paddingBottom: 10 },
  welcomeSection: { padding: 20, backgroundColor: "#fff", zIndex: 10 },
  greetingText: { fontSize: 24, fontWeight: "bold", color: "#1A3067" },
  subGreeting: { fontSize: 14, color: "#666", marginTop: 4 },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 15,
    height: 50,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "black" },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e8e8e8",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterBtnActive: { backgroundColor: "#1A3067", borderColor: "#1A3067" },
  filterText: { color: "#1A3067", fontWeight: "bold", fontSize: 12 },
  filterTextActive: { color: "#fff" },
  quickAccessWrapper: { marginTop: 10 },
  miniSectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1A3067",
    marginLeft: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  quickAccessContainer: { paddingLeft: 20 },
  miniButton: { alignItems: "center", marginRight: 15, width: 70 },
  miniIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    elevation: 1,
  },
  miniButtonLabel: { fontSize: 10, fontWeight: "600", color: "#555" },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
  seeAllText: { color: "#1A3067", fontWeight: "bold", fontSize: 18 },
  blogCard: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  blogImage: { width: "100%", height: 90 },
  blogInfo: { padding: 8 },
  blogTitle: { fontSize: 12, fontWeight: "bold", height: 32 },
  blogReadMore: {
    fontSize: 10,
    color: "#1A3067",
    marginTop: 4,
    fontWeight: "bold",
  },
  row: { justifyContent: "space-between", paddingHorizontal: 20 },
  itemCard: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    elevation: 2,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 100 },
  cardInfo: { padding: 10 },
  cardTitle: { fontSize: 12, fontWeight: "bold", color: "#333" },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  typeText: { fontSize: 8, color: "#fff", fontWeight: "bold" },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 14,
  },
  floatingGroup: {
    position: "absolute",
    bottom: 90,
    right: 20,
    alignItems: "flex-end",
  },
  stickyBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#1A3067",
    marginTop: 10,
  },
  supportSticky: {
    backgroundColor: "green",
    height: 50,
    width: 50,
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  stickyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 13,
  },
});
