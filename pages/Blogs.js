import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
  Keyboard,
  RefreshControl
} from "react-native";
import Navbar from "../components/Navbar";
import CustomIcon from "../components/CustomIcon";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 50) / 2;

export default function Blogs({ navigation }) {
  const [blogs, setBlogs] = useState([]);
  const [productCategories, setProductCategories] = useState([]); 
  const [serviceCategories, setServiceCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All"); 
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); 

  const BASE_URL = "https://orbitmediasolutions.com/";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://orbitmediasolutions.com/api/blog/page");
      const json = await response.json();
      if (json.success) {
        setBlogs(json.data?.blogs || []);
        setProductCategories(json.data?.itemProducts || []);
        setServiceCategories(json.data?.itemService || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBlogs();
    setRefreshing(false);
  }, []);

  const handleReset = () => {
    setSearchQuery("");
    setActiveTab("All");
    setSelectedSubCategory(null);
    Keyboard.dismiss();
  };

  // Helper to extract the first word for matching
  const getFirstWord = (title) => title ? title.split(' ')[0] : "";

  const filteredBlogs = useMemo(() => {
    let data = [...blogs];
    
    if (activeTab === "Products") {
      data = data.filter((item) => item.product_id !== null);
    } else if (activeTab === "Services") {
      data = data.filter((item) => item.service_id !== null);
    }

    if (selectedSubCategory) {
      const matchWord = selectedSubCategory.toLowerCase();
      data = data.filter((item) => {
        const title = item.banner_title?.toLowerCase() || "";
        const blogTitle = item.blog_title?.toLowerCase() || "";
        return title.includes(matchWord) || blogTitle.includes(matchWord);
      });
    }

    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      data = data.filter((item) => 
        item.banner_title?.toLowerCase().includes(query) ||
        item.blog_title?.toLowerCase().includes(query)
      );
    }
    
    return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [blogs, searchQuery, activeTab, selectedSubCategory]);

const renderCategoryButton = (item) => {
    const firstWord = getFirstWord(item.banner_title);
    const isSelected = selectedSubCategory === firstWord;

    return (
      <TouchableOpacity 
        key={`${item.id}-${item.slug}`}
        activeOpacity={0.8}
        onPress={() => setSelectedSubCategory(isSelected ? null : firstWord)}
        style={[
          styles.subBtn, 
          isSelected ? styles.subBtnActive : styles.subBtnInactive
        ]}
      >
        <Text style={[
          styles.subBtnText, 
          isSelected ? styles.textWhite : styles.textGray
        ]}>
          {item.banner_title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.staticHeader}>
        <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
        >
          <CustomIcon name="arrow-left" size={22} color="#1A3067" />
        </TouchableOpacity>
        
        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>Industry Insights</Text>
        </View>
        
        <View style={{ width: 32 }} />
      </View>
        

        <View style={styles.searchBarContainer}>
          <CustomIcon name="search" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles..."
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

        <View style={styles.mainTabRow}>
          {["All", "Products", "Services"].map((tab) => {
            const isTabActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.8}
                onPress={() => { setActiveTab(tab); setSelectedSubCategory(null); }}
                style={[styles.tabBtn, isTabActive ? styles.tabBtnActive : styles.tabBtnInactive]}
              >
                <Text style={[styles.tabText, isTabActive ? styles.textWhite : styles.textBlue]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
          {(activeTab !== "All" || selectedSubCategory || searchQuery) && (
            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
               <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#1A3067" /></View>
      ) : (
        <FlatList
          data={filteredBlogs}
         ListHeaderComponent={
    <View style={styles.subFilterSection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
        {(activeTab === "All" || activeTab === "Products") && productCategories.map(item => renderCategoryButton(item))}
        {(activeTab === "All" || activeTab === "Services") && serviceCategories.map(item => renderCategoryButton(item))}
      </ScrollView>
    </View>
  }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("BlogDetails", { blog: item })}>
              <Image source={{ uri: `${BASE_URL}${item.banner_image}` }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.categoryTag}>{item.product_id ? "PRODUCT" : "SERVICE"}</Text>
                <Text style={styles.blogTitle} numberOfLines={2}>{item.banner_title}</Text>
                <View style={styles.readMoreRow}>
                  <Text style={styles.readMoreText}>Read More</Text>
                  <CustomIcon name="chevron-right" size={10} color="#1A3067" />
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}><Text style={styles.emptyText}>No articles found.</Text></View>
          }
        />
      )}
      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  staticHeader: { paddingHorizontal: 20, paddingTop: 10, backgroundColor: "#ffffff" },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 15, justifyContent: 'start' },
headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  titleWrapper: { alignItems: 'center' },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
  countBadge: { backgroundColor: '#1A3067', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  countText: { color: '#ffffff', fontSize: 10, fontWeight: 'bold' },
  searchBarContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F2F4F7", borderRadius: 12, paddingHorizontal: 15, height: 48, marginBottom: 15 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "#000000" },
  
  mainTabRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1 },
  tabBtnInactive: { backgroundColor: "#ffffff", borderColor: "#E5E7EB" },
  tabBtnActive: { backgroundColor: "#1A3067", borderColor: "#1A3067" },
  tabText: { fontSize: 12, fontWeight: "700" },
  textWhite: { color: '#ffffff' }, 
  textBlue: { color: '#1A3067' },
  textGray: { color: '#4B5563' },

  resetBtn: { marginLeft: 'auto' },
  resetText: { color: '#EF4444', fontSize: 12, fontWeight: 'bold' },
  
  subFilterSection: { marginVertical: 12 },
  subBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: 'transparent' },
  subBtnActive: { backgroundColor: '#6366F1', borderColor: '#6366F1' },
  subBtnInactive: { backgroundColor: '#F3F4F6', borderColor: '#F3F4F6' },
  subBtnText: { fontSize: 11, fontWeight: '600' },

  listContent: { paddingBottom: 120 },
  row: { justifyContent: "space-between", paddingHorizontal: 20 },
  card: { 
    width: COLUMN_WIDTH, 
    marginBottom: 15, 
    backgroundColor: "#ffffff", 
    borderRadius: 12,
    ...Platform.select({
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' },
      default: { elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }
    }),
    borderWidth: 1, borderColor: '#f0f0f0', overflow: 'hidden'
  },
  image: { width: "100%", height: 100 },
  infoContainer: { padding: 10 },
  categoryTag: { fontSize: 8, fontWeight: "800", color: "#6366F1", marginBottom: 4 },
  blogTitle: { fontSize: 11, fontWeight: "700", color: "#1F2937", height: 34 },
  readMoreRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  readMoreText: { fontSize: 10, color: "#1A3067", fontWeight: "700", marginRight: 3 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainer: { alignItems: "center", marginTop: 60 },
  emptyText: { color: "#9CA3AF", fontSize: 15 },
});