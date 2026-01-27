import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import Navbar from "../components/Navbar";
import ProductMarquee from "../components/ProductMarquee";
import ServiceMarquee from "../components/ServiceMarquee";
import CustomIcon from "../components/CustomIcon";
import useStore from "../store/useStore";
const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL);
  const [activeTab, setActiveTab] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const BASE_URL = "https://theorbit.one/";
const { products, services, blogs, allData, loading, fetchHomeData } = useStore();


useEffect(() => {
    if (allData.length === 0) {
      fetchHomeData();
    }
  }, []);

  const filteredItems = useMemo(() => {
    return activeTab === "All"
      ? allData
      : allData.filter((item) => item.type === activeTab);
  }, [activeTab, allData]);
  useFocusEffect(
    useCallback(() => {
      setDisplayName(auth.currentUser?.displayName);
      setPhotoURL(auth.currentUser?.photoURL);
    }, []),
  );

  const handleLogout = () => {
    setModalVisible(false);
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => signOut(auth).catch((err) => console.log(err)),
      },
    ]);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHomeData();
    setRefreshing(false);
  }, [fetchHomeData]);

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => navigation.navigate("BlogDetails", { blog: item })}
    >
      <Image
        source={{ uri: `${BASE_URL}${item.banner_image}` }}
        style={styles.blogImage}
        resizeMode="cover"
      />
      <View style={styles.blogInfo}>
        <Text style={styles.blogTag}>Article</Text>
        <Text style={styles.blogTitle} numberOfLines={2}>
          {item.blog_title}
        </Text>
        <View style={styles.blogFooter}>
          <Text
            style={styles.blogReadMore}
            onPress={() => navigation.navigate("BlogDetails", { blog: item })}
          >
            Read Post
          </Text>
          <CustomIcon
            name="arrow-right"
            size={14}
            color="#1A3067"
            type="Solid"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCard = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.itemCard}
        onPress={() =>
          navigation.navigate(
            item.type === "Products" ? "ProductDetails" : "ServiceDetails",
            { service: item, product: item },
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
                backgroundColor:
                  item.type === "Products" ? "#6200EE" : "#03DAC6",
              },
            ]}
          >
            <Text style={styles.typeText}>
              {item.type === "Products" ? "PRODUCT" : "SERVICE"}
            </Text>
          </View>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.displayTitle}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.viewText}>View Details</Text>
            <CustomIcon name="chevron-right" size={12} color="#1A3067" />
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation],
  );

  const renderHeader = () => (
    <View>
      <View style={styles.connectContainer}>
        <View style={styles.connectCard}>
          <View style={styles.connectTextContainer}>
            <Text style={styles.connectSubtitle}>Ready to grow?</Text>
            <Text style={styles.connectTitle}>
              Connect with us to get premium services
            </Text>
            <TouchableOpacity
              style={styles.connectBtn}
              onPress={() => navigation.navigate("Form")}
            >
              <Text style={styles.connectBtnText}>Connect Now</Text>
              <CustomIcon name="arrow-right" size={16} color="#1A3067" />
            </TouchableOpacity>
          </View>
    
        </View>
      </View>

      {/* Blogs Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Latest Insights</Text>
        <Text
          style={styles.seeAllText}
          onPress={() => navigation.navigate("Blogs")}
        >
          See All
        </Text>
      </View>
      <FlatList
        data={blogs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `blog-${item.id}`}
        renderItem={renderBlogItem}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
      />

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Featured Systems</Text>
        <Text
          style={styles.seeAllText}
          onPress={() => navigation.navigate("Product")}
        >
          See All
        </Text>
      </View>
      <ProductMarquee data={products} />

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Service Portfolio</Text>
        <Text
          style={styles.seeAllText}
          onPress={() => navigation.navigate("Service")}
        >
          See All
        </Text>
      </View>
      <ServiceMarquee data={services} />
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Explore all items</Text>
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

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>{activeTab} Items</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/orbitLogo.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.headerBrand}>Orbit Media</Text>
            <Text style={styles.headerSubBrand}>Solutions</Text>
          </View>
        </View>
  

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {photoURL ? (
            <Image
              key={photoURL}
              source={{ uri: photoURL }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#1A3067",
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: "#1A3067",
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomIcon name="user-circle" size={20} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {loading && !refreshing ?(
        <ActivityIndicator
          color="#1A3067"
          size="large"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderCard}
          keyExtractor={(item) => item.uniqueKey}
          getItemLayout={(data, index) => ({
            length: 220,
            offset: 220 * index,
            index,
          })}

          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor="#1A3067" 
              colors={["#1A3067"]} 
            />
          }
          numColumns={2}
          ListHeaderComponent={renderHeader}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No {activeTab} available.</Text>
          }
          ListFooterComponent={<View style={{ height: 120 }} />}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
        />
      )}

      {/* Modal & Navbar */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.profileHeader}>
              {photoURL ? (
                <Image
                  source={{ uri: photoURL }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginBottom: 10,
                  }}
                />
              ) : (
                <CustomIcon name="user-circle" size={60} color="#1A3067" />
              )}
              <Text style={styles.profileName}>
                {displayName || "No Name Set"}
              </Text>
              <Text style={styles.profileEmail}>{auth.currentUser?.email}</Text>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("UpdateProfile");
              }}
            >
              <CustomIcon name="user-alt" size={18} color="#333" />
              <Text style={styles.modalText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Contact");
              }}
            >
              <CustomIcon name="question-circle" size={18} color="#333" />
              <Text style={styles.modalText}>Emergency Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <CustomIcon name="sign-out-alt" size={18} color="#ff4444" />
              <Text style={styles.logoutLabel}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  logo: { width: 45, height: 45, borderRadius: 22.5 },
  headerBrand: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A3067",
    marginLeft: 10,
  },
  headerSubBrand: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
    marginTop: -4,
  },
  flatListContainer: { paddingBottom: 20 },
  row: { flex: 1, justifyContent: "space-between", paddingHorizontal: 15 },
  itemCard: {
    backgroundColor: "#fff",
    width: width / 2 - 22,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 110, backgroundColor: "#f0f0f0" },
  cardInfo: { padding: 12 },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  typeText: { color: "#fff", fontSize: 9, fontWeight: "bold" },
  cardTitle: { fontSize: 14, fontWeight: "700", color: "#333", height: 38 },
  cardFooter: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  viewText: {
    fontSize: 12,
    color: "#1A3067",
    fontWeight: "bold",
    marginRight: 4,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A3067",
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  seeAllText: { color: "#1A3067", fontWeight: "600", marginTop: 10 },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 18,
    marginVertical: 15,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginHorizontal: 5,
  },
  filterBtnActive: { backgroundColor: "#1A3067" },
  filterText: { color: "#666", fontWeight: "bold" },
  filterTextActive: { color: "#fff" },
  blogCard: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    elevation: 3,
    marginBottom: 10,
    overflow: "hidden",
  },
  blogImage: { width: "100%", height: 140 },
  blogInfo: { padding: 15 },
  blogTag: {
    color: "#1A3067",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  blogTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    lineHeight: 20,
    height: 40,
  },
  blogFooter: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  blogReadMore: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A3067",
    marginRight: 5,
  },
  connectContainer: { width: "100%", paddingHorizontal: 20, marginTop: 10 },
  connectCard: {
    backgroundColor: "#1A3067",
    borderRadius: 25,
    padding: 25,
    flexDirection: "row",
    overflow: "hidden",
  },
  connectTextContainer: { flex: 1, zIndex: 2 },
  connectSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  connectTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  connectBtn: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  connectBtnText: { color: "#1A3067", fontWeight: "bold", marginRight: 5 },
  connectIconBg: { position: "absolute", right: -20, bottom: -20, zIndex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 100,
    paddingRight: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: 260,
    elevation: 10,
  },
  profileHeader: { alignItems: "center", marginBottom: 15 },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  profileEmail: { fontSize: 13, color: "#777" },
  separator: { height: 1, backgroundColor: "#eee", marginVertical: 10 },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalText: { marginLeft: 12, fontSize: 16, color: "#444" },
  logoutItem: { marginTop: 5 },
  logoutLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: "#ff4444",
    fontWeight: "bold",
  },
  emptyText: { textAlign: "center", marginTop: 40, color: "#999" },
});
