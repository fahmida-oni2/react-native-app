// // // import React, { useCallback, useState, useEffect, useMemo } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Image,
// // //   ActivityIndicator,
// // //   FlatList,
// // //   Dimensions,
// // //   RefreshControl,
// // //   TextInput,
// // //   ScrollView,
// // //   Linking,
// // //   Alert,
// // //   Animated,
// // // } from "react-native";
// // // import Navbar from "../components/Navbar";
// // // import CustomIcon from "../components/CustomIcon";
// // // import useStore from "../store/useStore";
// // // import { auth } from "../firebaseConfig";
// // // import { useNetworkCheck } from "../store/useNetwork";
// // // import Toast from "react-native-toast-message";


// // // const { width } = Dimensions.get("window");
// // // const SERVICES_PILLS = [
// // //   { icon: "layer-group", label: "ERP Systems" },
// // //   { icon: "concierge-bell", label: "Web Development" },
// // //   { icon: "tasks", label: "POS Solutions" },
// // //   { icon: "code", label: "Mobile Apps" },
// // // ];

// // // export default function Home({ navigation }) {
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [activeTab, setActiveTab] = useState("All");
// // //   const [userName, setUserName] = useState("Guest");
// // //   const BASE_URL = "https://orbitmediasolutions.com/";
// // //   const fadeAnim = useState(new Animated.Value(0))[0];

// // //   const { allData, loading, fetchHomeData, blogs } = useStore();
// // //   useNetworkCheck();

// // //   useEffect(() => {
// // //     Animated.timing(fadeAnim, {
// // //       toValue: 1,
// // //       duration: 600,
// // //       useNativeDriver: true,
// // //     }).start();
// // //   }, []);
// // //   useEffect(() => {
// // //     const unsubscribe = navigation.addListener("focus", () => {
// // //       setUserName(auth.currentUser?.displayName || "Guest");
// // //     });

// // //     return unsubscribe;
// // //   }, [navigation]);



// // //   useEffect(() => {
// // //     fetchHomeData();
// // //   }, []);
// // //   const onRefresh = useCallback(async () => {
// // //     setRefreshing(true);
// // //     await fetchHomeData();
// // //     setRefreshing(false);
// // //   }, [fetchHomeData]);

// // //   const filteredItems = useMemo(() => {
// // //     let data = allData;
// // //     if (searchQuery.trim()) {
// // //       return data.filter(
// // //         (item) =>
// // //           item.displayTitle
// // //             ?.toLowerCase()
// // //             .includes(searchQuery.toLowerCase()) ||
// // //           item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
// // //       );
// // //     }
// // //     if (activeTab !== "All") {
// // //       data = data.filter((item) => item.type === activeTab);
// // //     }
// // //     return data;
// // //   }, [searchQuery, activeTab, allData]);

// // //   const handleEmergencyCall = () => {
// // //     const phoneNumber = "tel:00447935390848";
// // //     Linking.canOpenURL(phoneNumber).then((supported) => {
// // //       if (supported) Linking.openURL(phoneNumber);
// // //       else Alert.alert("Error", "Phone calls not supported");
// // //     });
// // //   };

// // //   const getHeroIcon = (title, type) => {
// // //     const t = title.toLowerCase();
// // //     if (t.includes("erp") || t.includes("management")) return "layer-group";
// // //     if (t.includes("pos") || t.includes("shop")) return "layer-group";
// // //     if (t.includes("app") || t.includes("mobile")) return "concierge-bell";
// // //     return type === "Products" ? "layer-group" : "concierge-bell";
// // //   };


// // //     // ─── HERO SECTION ───────────────────────────────────────────
// // //   const renderHero = () => (
// // //     <Animated.View style={[styles.hero, { opacity: fadeAnim }]}>
// // //       {/* Top bar: greeting + avatar */}
// // //       <View style={styles.heroTopBar}>
// // //         <View>
// // //           <Text style={styles.heroGreeting}>Hello, {userName} 👋</Text>
// // //           <Text style={styles.heroDate}>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</Text>
// // //         </View>
// // //         <TouchableOpacity
// // //           style={styles.avatarBtn}
// // //           onPress={() => navigation.navigate("Profile")}
// // //         >
// // //           <CustomIcon name="user-circle" size={32} color="#fff" />
// // //         </TouchableOpacity>
// // //       </View>

// // //       {/* Headline */}
// // //       <View style={styles.heroHeadline}>
// // //         <Text style={styles.heroTitle}>Smart Business{"\n"}Solutions for You</Text>
// // //         <Text style={styles.heroSub}>
// // //           Orbit Media delivers cutting-edge ERP, POS, web & mobile solutions — built to scale your business.
// // //         </Text>
// // //       </View>

// // //       {/* What we offer pills */}
// // //       <ScrollView
// // //         horizontal
// // //         showsHorizontalScrollIndicator={false}
// // //         contentContainerStyle={styles.pillsRow}
// // //       >
// // //         {SERVICES_PILLS.map((pill, i) => (
// // //           <View key={i} style={styles.pill}>
// // //             <CustomIcon name={pill.icon} size={13} color="#fff" />
// // //             <Text style={styles.pillText}>{pill.label}</Text>
// // //           </View>
// // //         ))}
// // //       </ScrollView>

// // //     </Animated.View>
// // //   );

// // //   // ─── STATS STRIP ────────────────────────────────────────────
// // //   const renderStats = () => (
// // //     <View style={styles.statsStrip}>
// // //       {[
// // //         { value: "10+", label: "Products" },
// // //         { value: "20+", label: "Services" },
// // //         { value: "24/7", label: "Support" },
// // //         { value: "100%", label: "Reliable" },
// // //       ].map((stat, i) => (
// // //         <View key={i} style={[styles.statItem, i < 3 && styles.statBorder]}>
// // //           <Text style={styles.statValue}>{stat.value}</Text>
// // //           <Text style={styles.statLabel}>{stat.label}</Text>
// // //         </View>
// // //       ))}
// // //     </View>
// // //   );
// // //   const renderBlogItem = ({ item }) => (
// // //     <TouchableOpacity
// // //       style={styles.blogCard}
// // //       onPress={() => navigation.navigate("BlogDetails", { blog: item })}
// // //     >
// // //       <Image
// // //         source={{ uri: `${BASE_URL}${item.displayImage}` }}
// // //         style={styles.blogImage}
// // //         resizeMode="cover"
// // //       />

// // //       <View style={styles.blogInfo}>
// // //         <Text style={styles.blogTitle} numberOfLines={2}>
// // //           {item.displayTitle}
// // //         </Text>

// // //         <Text style={styles.blogReadMore}>Read Post →</Text>
// // //       </View>
// // //     </TouchableOpacity>
// // //   );

// // //   const renderCard = ({ item }) => (
// // //     <TouchableOpacity
// // //       style={styles.itemCard}
// // //       onPress={() =>
// // //         navigation.navigate(
// // //           item.type === "Products" ? "ProductDetails" : "ServiceDetails",
// // //           { [item.type === "Products" ? "product" : "service"]: item },
// // //         )
// // //       }
// // //     >
// // //       <Image
// // //         source={{ uri: `${BASE_URL}${item.displayImage}` }}
// // //         style={styles.cardImage}
// // //       />
// // //       <View style={styles.cardInfo}>
// // //         <View
// // //           style={[
// // //             styles.typeBadge,
// // //             {
// // //               backgroundColor: item.type === "Products" ? "#6200EE" : "#03DAC6",
// // //             },
// // //           ]}
// // //         >
// // //           <Text style={styles.typeText}>
// // //             {item.type === "Products" ? "PRODUCT" : "SERVICE"}
// // //           </Text>
// // //         </View>
// // //         <Text style={styles.cardTitle} numberOfLines={1}>
// // //           {item.displayTitle}
// // //         </Text>
// // //       </View>
// // //     </TouchableOpacity>
// // //   );


// // //   const renderHeader = () => (
// // //     <View>
// // //       {renderHero()}
// // //       {renderStats()}
// // //        {!searchQuery && (
// // //         <>
// // //           <View style={styles.quickAccessWrapper}>
// // //             <Text style={styles.miniSectionTitle}>Quick Access</Text>
// // //             <ScrollView
// // //               horizontal
// // //               showsHorizontalScrollIndicator={false}
// // //               contentContainerStyle={styles.quickAccessContainer}
// // //             >
// // //               {allData.map((item) => (
// // //                 <TouchableOpacity
// // //                   key={item.uniqueKey}
// // //                   style={styles.miniButton}
// // //                   onPress={() =>
// // //                     navigation.navigate(
// // //                       item.type === "Products"
// // //                         ? "ProductDetails"
// // //                         : "ServiceDetails",
// // //                       {
// // //                         [item.type === "Products" ? "product" : "service"]:
// // //                           item,
// // //                       },
// // //                     )
// // //                   }
// // //                 >
// // //                   <View
// // //                     style={[
// // //                       styles.miniIconCircle,
// // //                       {
// // //                         backgroundColor:
// // //                           item.type === "Products" ? "#F0F3FF" : "#F8F0FF",
// // //                       },
// // //                     ]}
// // //                   >
// // //                     <CustomIcon
// // //                       name={getHeroIcon(item.displayTitle, item.type)}
// // //                       size={20}
// // //                       color={item.type === "Products" ? "#1A3067" : "#6200EE"}
// // //                     />
// // //                   </View>
// // //                   <Text style={styles.miniButtonLabel} numberOfLines={1}>
// // //                     {item.displayTitle.split(" ")[0]}
// // //                   </Text>
// // //                 </TouchableOpacity>
// // //               ))}
// // //             </ScrollView>
// // //           </View>

// // //           <View style={styles.sectionHeaderRow}>
// // //             <Text style={styles.sectionTitle}>Featured Solutions</Text>
// // //           </View>
// // //           <View style={styles.filterContainer}>
// // //             {["All", "Products", "Services"].map((tab) => (
// // //               <TouchableOpacity
// // //                 key={tab}
// // //                 onPress={() => setActiveTab(tab)}
// // //                 style={[
// // //                   styles.filterBtn,
// // //                   activeTab === tab && styles.filterBtnActive,
// // //                 ]}
// // //               >
// // //                 <Text
// // //                   style={[
// // //                     styles.filterText,
// // //                     activeTab === tab && styles.filterTextActive,
// // //                   ]}
// // //                 >
// // //                   {tab}
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             ))}
// // //           </View>
// // //         </>
// // //       )}
// // //       {searchQuery ? (
// // //         <View style={styles.sectionHeaderRow}>
// // //           <Text style={styles.sectionTitle}>Search Results</Text>
// // //         </View>
// // //       ) : null}

// // //     </View>
// // //   );

// // //   const renderFooter = () => {
// // //     if (searchQuery || blogs.length === 0)
// // //       return <View style={{ height: 100 }} />;

// // //     return (
// // //       <View style={{ marginTop: 20, paddingBottom: 100 }}>
// // //         <View style={styles.sectionHeaderRow}>
// // //           <Text style={styles.sectionTitle}>Latest Insights</Text>
// // //           <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
// // //             <Text style={styles.seeAllText}>See All</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //         <FlatList
// // //           data={blogs}
// // //           horizontal
// // //           renderItem={renderBlogItem}
// // //           keyExtractor={(item) => `blog-footer-${item.id}`}
// // //           contentContainerStyle={{ paddingLeft: 20 }}
// // //           showsHorizontalScrollIndicator={false}
// // //         />
// // //       </View>
// // //     );
// // //   };
// // //   return (
// // //     <View style={styles.container}>
// // //       <View style={styles.welcomeSection}>
// // //         <View style={styles.searchBarContainer}>
// // //           <CustomIcon name="search" size={18} color="#999" />
// // //           <TextInput
// // //             style={styles.searchInput}
// // //             placeholder="Search for ERP, POS, or Web Dev..."
// // //             value={searchQuery}
// // //             onChangeText={setSearchQuery}
// // //             placeholderTextColor="#999"
// // //           />
// // //           {searchQuery.length > 0 && (
// // //             <TouchableOpacity onPress={() => setSearchQuery("")}>
// // //               <CustomIcon name="times-circle" size={18} color="#ccc" />
// // //             </TouchableOpacity>
// // //           )}
// // //         </View>
// // //       </View>

// // //       {loading && allData.length === 0 ? (
// // //         <View style={styles.loaderContainer}>
// // //           {renderHero()}
// // //           <View style={styles.loaderInner}>
// // //             <ActivityIndicator size="large" color="#1A3067" />
// // //             <Text style={styles.loadingText}>Loading solutions...</Text>
// // //           </View>
// // //         </View>
// // //       ) : (
// // //         <FlatList
// // //           data={filteredItems}
// // //           renderItem={renderCard}
// // //           keyExtractor={(item) => item.uniqueKey}
// // //           extraData={[activeTab, searchQuery]}
// // //           ListHeaderComponent={renderHeader}
// // //           ListFooterComponent={renderFooter}
// // //           numColumns={2}
// // //           keyboardShouldPersistTaps="handled"
// // //           columnWrapperStyle={styles.row}
// // //           refreshControl={
// // //             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// // //           }
// // //           contentContainerStyle={{ paddingBottom: 20 }}
// // //           ListEmptyComponent={
// // //             <Text style={styles.emptyText}>No matches found.</Text>
// // //           }
// // //         />
// // //       )}

// // //       {/* Floating Buttons */}
// // //       <View style={styles.floatingGroup}>
// // //         <TouchableOpacity
// // //           style={[styles.stickyBtn, styles.supportSticky]}
// // //           onPress={handleEmergencyCall}
// // //         >
// // //           <CustomIcon name="phone-alt" size={18} color="white" />
// // //         </TouchableOpacity>
// // //         <TouchableOpacity
// // //           style={styles.stickyBtn}
// // //           onPress={() => navigation.navigate("Form")}
// // //         >
// // //           <CustomIcon name="calendar-check" size={18} color="white" />
// // //           <Text style={styles.stickyBtnText}>Book Services</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //       <Navbar />
// // //       <Toast />
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, backgroundColor: "#fff" },
// // //    loaderContainer: { flex: 1 },
// // //   loaderInner: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
// // //   loadingText: { color: "#1A3067", fontSize: 14, fontWeight: "600" },

// // //   // ── HERO ──────────────────────────────────────────────────────
// // //   hero: {
// // //     backgroundColor: "#1A3067",
// // //     paddingTop: 52,
// // //     paddingBottom: 28,
// // //     paddingHorizontal: 22,
// // //     borderBottomLeftRadius: 28,
// // //     borderBottomRightRadius: 28,
// // //   },
// // //   heroTopBar: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: 24,
// // //   },
// // //   heroGreeting: { color: "#fff", fontSize: 18, fontWeight: "700" },
// // //   heroDate: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 },
// // //   avatarBtn: {
// // //     width: 44,
// // //     height: 44,
// // //     borderRadius: 22,
// // //     backgroundColor: "rgba(255,255,255,0.12)",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     borderWidth: 1,
// // //     borderColor: "rgba(255,255,255,0.2)",
// // //   },
// // //   heroHeadline: { marginBottom: 20 },
// // //   heroTitle: {
// // //     color: "#fff",
// // //     fontSize: 26,
// // //     fontWeight: "800",
// // //     lineHeight: 34,
// // //     marginBottom: 10,
// // //   },
// // //   heroSub: {
// // //     color: "rgba(255,255,255,0.7)",
// // //     fontSize: 13,
// // //     lineHeight: 20,
// // //   },
// // //   pillsRow: { paddingRight: 10, marginBottom: 18, gap: 8 },
// // //   pill: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: "rgba(255,255,255,0.12)",
// // //     borderRadius: 20,
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 6,
// // //     gap: 6,
// // //     borderWidth: 1,
// // //     borderColor: "rgba(255,255,255,0.15)",
// // //   },
// // //   pillText: { color: "#fff", fontSize: 11, fontWeight: "600" },
// // //   welcomeSection: { padding: 20, backgroundColor: "#fff", zIndex: 10 },
// // //   greetingText: { fontSize: 24, fontWeight: "bold", color: "#1A3067" },
// // //   subGreeting: { fontSize: 14, color: "#666", marginTop: 4 },
// // //     statsStrip: {
// // //     flexDirection: "row",
// // //     backgroundColor: "#fff",
// // //     marginHorizontal: 16,
// // //     marginTop: 16,
// // //     borderRadius: 16,
// // //     paddingVertical: 16,
// // //     shadowColor: "#000",
// // //     shadowOpacity: 0.05,
// // //     shadowRadius: 6,
// // //     elevation: 2,
// // //   },
// // //   statItem: { flex: 1, alignItems: "center" },
// // //   statBorder: { borderRightWidth: 1, borderRightColor: "#f0f0f0" },
// // //   statValue: { fontSize: 18, fontWeight: "800", color: "#1A3067" },
// // //   statLabel: { fontSize: 11, color: "#9ca3af", marginTop: 2 },

// // //   searchBarContainer: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: "#f0f0f0",
// // //     borderRadius: 12,
// // //     paddingHorizontal: 15,
// // //     marginTop: 15,
// // //     height: 50,
// // //   },
// // //   searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "black" },
// // //   filterContainer: {
// // //     flexDirection: "row",
// // //     paddingHorizontal: 20,
// // //     marginVertical: 15,
// // //   },
// // //   filterBtn: {
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 8,
// // //     borderRadius: 20,
// // //     backgroundColor: "#e8e8e8",
// // //     marginRight: 10,
// // //     borderWidth: 1,
// // //     borderColor: "#ddd",
// // //   },
// // //   filterBtnActive: { backgroundColor: "#1A3067", borderColor: "#1A3067" },
// // //   filterText: { color: "#1A3067", fontWeight: "bold", fontSize: 12 },
// // //   filterTextActive: { color: "#fff" },
// // //   quickAccessWrapper: { marginTop: 10 },
// // //   miniSectionTitle: {
// // //     fontSize: 13,
// // //     fontWeight: "bold",
// // //     color: "#1A3067",
// // //     marginLeft: 20,
// // //     marginBottom: 10,
// // //     textTransform: "uppercase",
// // //   },
// // //   quickAccessContainer: { paddingLeft: 20 },
// // //   miniButton: { alignItems: "center", marginRight: 15, width: 70 },
// // //   miniIconCircle: {
// // //     width: 50,
// // //     height: 50,
// // //     borderRadius: 25,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginBottom: 5,
// // //     elevation: 1,
// // //   },
// // //   miniButtonLabel: { fontSize: 10, fontWeight: "600", color: "#555" },
// // //   sectionHeaderRow: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //     marginTop: 20,
// // //     marginBottom: 10,
// // //   },
// // //   sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
// // //   seeAllText: { color: "#1A3067", fontWeight: "bold", fontSize: 18 },
// // //   blogCard: {
// // //     width: 180,
// // //     backgroundColor: "#fff",
// // //     borderRadius: 12,
// // //     marginRight: 15,
// // //     overflow: "hidden",
// // //     borderWidth: 1,
// // //     borderColor: "#eee",
// // //   },
// // //   blogImage: { width: "100%", height: 90 },
// // //   blogInfo: { padding: 8 },
// // //   blogTitle: { fontSize: 12, fontWeight: "bold", height: 32 },
// // //   blogReadMore: {
// // //     fontSize: 10,
// // //     color: "#1A3067",
// // //     marginTop: 4,
// // //     fontWeight: "bold",
// // //   },
// // //   row: { justifyContent: "space-between", paddingHorizontal: 20 },
// // //   itemCard: {
// // //     width: "48%",
// // //     marginBottom: 15,
// // //     borderRadius: 12,
// // //     backgroundColor: "#f9f9f9",
// // //     elevation: 2,
// // //     overflow: "hidden",
// // //   },
// // //   cardImage: { width: "100%", height: 100 },
// // //   cardInfo: { padding: 10 },
// // //   cardTitle: { fontSize: 12, fontWeight: "bold", color: "#333" },
// // //   typeBadge: {
// // //     alignSelf: "flex-start",
// // //     paddingHorizontal: 6,
// // //     paddingVertical: 2,
// // //     borderRadius: 4,
// // //     marginBottom: 4,
// // //   },
// // //   typeText: { fontSize: 8, color: "#fff", fontWeight: "bold" },
// // //   emptyText: {
// // //     textAlign: "center",
// // //     marginTop: 40,
// // //     color: "#999",
// // //     fontSize: 14,
// // //   },
// // //   floatingGroup: {
// // //     position: "absolute",
// // //     bottom: 90,
// // //     right: 20,
// // //     alignItems: "flex-end",
// // //   },
// // //   stickyBtn: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     paddingHorizontal: 15,
// // //     paddingVertical: 12,
// // //     borderRadius: 30,
// // //     elevation: 5,
// // //     backgroundColor: "#1A3067",
// // //     marginTop: 10,
// // //   },
// // //   supportSticky: {
// // //     backgroundColor: "green",
// // //     height: 50,
// // //     width: 50,
// // //     justifyContent: "center",
// // //     paddingHorizontal: 0,
// // //   },
// // //   stickyBtnText: {
// // //     color: "#fff",
// // //     fontWeight: "bold",
// // //     marginLeft: 8,
// // //     fontSize: 13,
// // //   },
// // // });


// // import React, { useCallback, useState, useEffect, useMemo } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Image,
// //   ActivityIndicator,
// //   FlatList,
// //   Dimensions,
// //   RefreshControl,
// //   TextInput,
// //   ScrollView,
// //   Linking,
// //   Alert,
// //   Animated,
// // } from "react-native";
// // import Navbar from "../components/Navbar";
// // import CustomIcon from "../components/CustomIcon";
// // import useStore from "../store/useStore";
// // import { auth } from "../firebaseConfig";
// // import { useNetworkCheck } from "../store/useNetwork";
// // import Toast from "react-native-toast-message";

// // const { width } = Dimensions.get("window");
// // const BASE_URL = "https://orbitmediasolutions.com/";


// // // ─── SKELETON CARD ──────────────────────────────────────────
// // function SkeletonCard() {
// //   const shimmer = useState(new Animated.Value(0))[0];

// //   useEffect(() => {
// //     Animated.loop(
// //       Animated.sequence([
// //         Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
// //         Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
// //       ])
// //     ).start();
// //   }, []);

// //   const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.75] });

// //   return (
// //     <Animated.View style={[styles.skeletonCard, { opacity }]}>
// //       <View style={styles.skeletonImage} />
// //       <View style={styles.skeletonBody}>
// //         <View style={styles.skeletonBadge} />
// //         <View style={styles.skeletonTitle} />
// //         <View style={styles.skeletonTitleShort} />
// //       </View>
// //     </Animated.View>
// //   );
// // }

// // // ─── SKELETON QUICK ACCESS ───────────────────────────────────
// // function SkeletonQuickItem() {
// //   const shimmer = useState(new Animated.Value(0))[0];
// //   useEffect(() => {
// //     Animated.loop(
// //       Animated.sequence([
// //         Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
// //         Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
// //       ])
// //     ).start();
// //   }, []);
// //   const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });
// //   return (
// //     <Animated.View style={[styles.skeletonQuickItem, { opacity }]}>
// //       <View style={styles.skeletonQuickCircle} />
// //       <View style={styles.skeletonQuickLabel} />
// //     </Animated.View>
// //   );
// // }

// // export default function Home({ navigation }) {
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [activeTab, setActiveTab] = useState("All");
// //   const [userName, setUserName] = useState("Guest");
// //   const fadeAnim = useState(new Animated.Value(1))[0];

// //   const { allData, loading, fetchHomeData, blogs } = useStore();
// //   useNetworkCheck();

// //   useEffect(() => {
// //     Animated.timing(fadeAnim, {
// //       toValue: 1,
// //       duration: 600,
// //       useNativeDriver: true,
// //     }).start();
// //   }, []);

// //   useEffect(() => {
// //     const unsubscribe = navigation.addListener("focus", () => {
// //       setUserName(auth.currentUser?.displayName || "Guest");
// //     });
// //     return unsubscribe;
// //   }, [navigation]);

// //   useEffect(() => {
// //     fetchHomeData();
// //   }, []);

// //   const onRefresh = useCallback(async () => {
// //     setRefreshing(true);
// //     await fetchHomeData();
// //     setRefreshing(false);
// //   }, [fetchHomeData]);

// //   const filteredItems = useMemo(() => {
// //     let data = allData;
// //     if (searchQuery.trim()) {
// //       return data.filter(
// //         (item) =>
// //           item.displayTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //           item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
// //       );
// //     }
// //     if (activeTab !== "All") {
// //       data = data.filter((item) => item.type === activeTab);
// //     }
// //     return data;
// //   }, [searchQuery, activeTab, allData]);


// // const handleEmergencyCall = () => {
// //   const whatsappURL = "https://wa.me/447935390848";
// //   Linking.openURL(whatsappURL).catch(() => {
// //     Alert.alert("Error", "Unable to open WhatsApp");
// //   });
// // };
// //   const getHeroIcon = (title, type) => {
// //     const t = title.toLowerCase();
// //     if (t.includes("erp") || t.includes("management")) return "layer-group";
// //     if (t.includes("pos") || t.includes("shop")) return "layer-group";
// //     if (t.includes("app") || t.includes("mobile")) return "concierge-bell";
// //     return type === "Products" ? "layer-group" : "concierge-bell";
// //   };

// //   // ─── HERO ────────────────────────────────────────────────────

// // const renderHero = () => (
// //   <Animated.View style={[styles.heroWrapper, { opacity: fadeAnim }]}>
// //     <View style={styles.heroAccentCircle1} />
// //     <View style={styles.heroAccentCircle2} />

// //     {/* Brand + greeting row */}
// //     <View style={styles.heroTopRow}>
// //       <View style={styles.heroBrandBadge}>
// //         <CustomIcon name="globe" size={10} color="#7EB3FF" />
// //         <Text style={styles.heroBrandText}>ORBIT MEDIA SOLUTIONS</Text>
// //       </View>
// //       <Text style={styles.heroGreeting}>Hi, {userName} 👋</Text>
// //     </View>

// //     {/* Core value proposition */}
// //    <Text style={styles.heroTitle}>
// //   Smarter Solutions{"\n"}
// //   <Text style={styles.heroTitleAccent}>Built for Your Business</Text>
// // </Text>
// // <Text style={styles.heroSub}>
// //   ERP, POS, web & mobile — Orbit delivers the technology your business needs to grow, manage, and scale.
// // </Text>

// //     {/* Action chips */}
// //     <View style={styles.heroChips}>
// //       {[
// //         { icon: "boxes",          label: "View Products" },
// //         { icon: "concierge-bell", label: "Get Services"  },
// //         { icon: "calendar-check", label: "Book a Call"   },
// //       ].map((chip, i) => (
// //         <View key={i} style={styles.heroChip}>
// //           <CustomIcon name={chip.icon} size={11} color="#7EB3FF" />
// //           <Text style={styles.heroChipText}>{chip.label}</Text>
// //         </View>
// //       ))}
// //     </View>
// //   </Animated.View>
// // );

// //   // ─── SKELETON LOADING VIEW ───────────────────────────────────
// //   const renderSkeleton = () => (
// //     <View style={{ flex: 1 }}>
// //       {/* Quick Access skeleton */}
// //       <View style={styles.quickAccessWrapper}>
// //         <View style={styles.skeletonSectionTitle} />
// //         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAccessContainer}>
// //           {[1, 2, 3, 4, 5].map((i) => <SkeletonQuickItem key={i} />)}
// //         </ScrollView>
// //       </View>

// //       {/* Featured Solutions skeleton header */}
// //       <View style={styles.sectionHeaderRow}>
// //         <View style={styles.skeletonSectionTitle} />
// //       </View>

// //       {/* Filter tabs skeleton */}
// //       <View style={styles.filterContainer}>
// //         {[1, 2, 3].map((i) => (
// //           <View key={i} style={styles.skeletonFilterBtn} />
// //         ))}
// //       </View>

// //       {/* Cards grid skeleton */}
// //       <View style={styles.skeletonGrid}>
// //         {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
// //       </View>
// //     </View>
// //   );

// //   // ─── BLOG CARD ───────────────────────────────────────────────
// //   const renderBlogItem = ({ item }) => (
// //     <TouchableOpacity
// //       style={styles.blogCard}
// //       onPress={() => navigation.navigate("BlogDetails", { blog: item })}
// //     >
// //       <Image
// //         source={{ uri: `${BASE_URL}${item.displayImage}` }}
// //         style={styles.blogImage}
// //         resizeMode="cover"
// //       />
// //       <View style={styles.blogInfo}>
// //         <Text style={styles.blogTitle} numberOfLines={2}>
// //           {item.displayTitle}
// //         </Text>
// //         <Text style={styles.blogReadMore}>Read Post →</Text>
// //       </View>
// //     </TouchableOpacity>
// //   );

// //   // ─── PRODUCT CARD ────────────────────────────────────────────
// //   const renderCard = ({ item }) => (
// //     <TouchableOpacity
// //       style={styles.itemCard}
// //       onPress={() =>
// //         navigation.navigate(
// //           item.type === "Products" ? "ProductDetails" : "ServiceDetails",
// //           { [item.type === "Products" ? "product" : "service"]: item },
// //         )
// //       }
// //     >
// //       <Image
// //         source={{ uri: `${BASE_URL}${item.displayImage}` }}
// //         style={styles.cardImage}
// //       />
// //       <View style={styles.cardInfo}>
// //         <View
// //           style={[
// //             styles.typeBadge,
// //             {
// //               backgroundColor: item.type === "Products" ? "#6200EE" : "#03DAC6",
// //             },
// //           ]}
// //         >
// //           <Text style={styles.typeText}>
// //             {item.type === "Products" ? "PRODUCT" : "SERVICE"}
// //           </Text>
// //         </View>
// //         <Text style={styles.cardTitle} numberOfLines={1}>
// //           {item.displayTitle}
// //         </Text>
// //       </View>
// //     </TouchableOpacity>
// //   );

// //   // ─── LIST HEADER ─────────────────────────────────────────────
// //   const renderHeader = () => (
// //     <View>
// //       {!searchQuery && (
// //         <>
// //           {renderHero()}
// //           <View style={styles.quickAccessWrapper}>
// //             <Text style={styles.miniSectionTitle}>Quick Access</Text>
// //             <ScrollView
// //               horizontal
// //               showsHorizontalScrollIndicator={false}
// //               contentContainerStyle={styles.quickAccessContainer}
// //             >
// //               {allData.map((item) => (
// //                 <TouchableOpacity
// //                   key={item.uniqueKey}
// //                   style={styles.miniButton}
// //                   onPress={() =>
// //                     navigation.navigate(
// //                       item.type === "Products" ? "ProductDetails" : "ServiceDetails",
// //                       { [item.type === "Products" ? "product" : "service"]: item },
// //                     )
// //                   }
// //                 >
// //                   <View
// //                     style={[
// //                       styles.miniIconCircle,
// //                       {
// //                         backgroundColor:
// //                           item.type === "Products" ? "#F0F3FF" : "#F8F0FF",
// //                       },
// //                     ]}
// //                   >
// //                     <CustomIcon
// //                       name={getHeroIcon(item.displayTitle, item.type)}
// //                       size={20}
// //                       color={item.type === "Products" ? "#1A3067" : "#6200EE"}
// //                     />
// //                   </View>
// //                   <Text style={styles.miniButtonLabel} numberOfLines={1}>
// //                     {item.displayTitle.split(" ")[0]}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </ScrollView>
// //           </View>

// //           <View style={styles.sectionHeaderRow}>
// //             <Text style={styles.sectionTitle}>Featured Solutions</Text>
// //           </View>
// //           <View style={styles.filterContainer}>
// //             {["All", "Products", "Services"].map((tab) => (
// //               <TouchableOpacity
// //                 key={tab}
// //                 onPress={() => setActiveTab(tab)}
// //                 style={[
// //                   styles.filterBtn,
// //                   activeTab === tab && styles.filterBtnActive,
// //                 ]}
// //               >
// //                 <Text
// //                   style={[
// //                     styles.filterText,
// //                     activeTab === tab && styles.filterTextActive,
// //                   ]}
// //                 >
// //                   {tab}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         </>
// //       )}

// //       {searchQuery ? (
// //         <View style={styles.sectionHeaderRow}>
// //           <Text style={styles.sectionTitle}>Search Results</Text>
// //         </View>
// //       ) : null}
// //     </View>
// //   );

// //   // ─── LIST FOOTER ─────────────────────────────────────────────
// //   const renderFooter = () => {
// //     if (searchQuery || blogs.length === 0)
// //       return <View style={{ height: 100 }} />;
// //     return (
// //       <View style={{ marginTop: 20, paddingBottom: 100 }}>
// //         <View style={styles.sectionHeaderRow}>
// //           <Text style={styles.sectionTitle}>Latest Insights</Text>
// //           <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
// //             <Text style={styles.seeAllText}>See All</Text>
// //           </TouchableOpacity>
// //         </View>
// //         <FlatList
// //           data={blogs}
// //           horizontal
// //           renderItem={renderBlogItem}
// //           keyExtractor={(item) => `blog-footer-${item.id}`}
// //           contentContainerStyle={{ paddingLeft: 20 }}
// //           showsHorizontalScrollIndicator={false}
// //         />
// //       </View>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Fixed search bar — always visible, position never changes */}
// //       <View style={styles.welcomeSection}>
// //         <View style={styles.searchBarContainer}>
// //           <CustomIcon name="search" size={18} color="#999" />
// //           <TextInput
// //             style={styles.searchInput}
// //             placeholder="Search for ERP, POS, or Web Dev..."
// //             value={searchQuery}
// //             onChangeText={setSearchQuery}
// //             placeholderTextColor="#999"
// //           />
// //           {searchQuery.length > 0 && (
// //             <TouchableOpacity onPress={() => setSearchQuery("")}>
// //               <CustomIcon name="times-circle" size={18} color="#ccc" />
// //             </TouchableOpacity>
// //           )}
// //         </View>
// //       </View>


// //       {/* Loading state: show hero + stats + skeleton */}
// //       {loading && allData.length === 0 ? (
// //         <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
// //           {renderHero()}
// //           {renderSkeleton()}
// //         </ScrollView>
// //       ) : (
// //         <FlatList
// //           data={filteredItems}
// //           renderItem={renderCard}
// //           keyExtractor={(item) => item.uniqueKey}
// //           extraData={[activeTab, searchQuery]}
// //           ListHeaderComponent={renderHeader}
// //           ListFooterComponent={renderFooter}
// //           numColumns={2}
// //           keyboardShouldPersistTaps="handled"
// //           columnWrapperStyle={styles.row}
// //           refreshControl={
// //             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// //           }
// //           contentContainerStyle={{ paddingBottom: 20 }}
// //           showsVerticalScrollIndicator={false}
// //           ListEmptyComponent={
// //             <View style={styles.emptyBox}>
// //               <CustomIcon name="search" size={32} color="#ccc" />
// //               <Text style={styles.emptyText}>No matches found.</Text>
// //             </View>
// //           }
// //         />
// //       )}

// //       {/* Floating Buttons */}
// //       <View style={styles.floatingGroup}>
// //         <TouchableOpacity
// //           style={[styles.stickyBtn, styles.supportSticky]}
// //           onPress={handleEmergencyCall}
// //         >
// //           <CustomIcon name="phone-alt" size={18} color="white" />
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={styles.stickyBtn}
// //           onPress={() => navigation.navigate("Form")}
// //         >
// //           <CustomIcon name="calendar-check" size={18} color="white" />
// //           <Text style={styles.stickyBtnText}>Book Services</Text>
// //         </TouchableOpacity>
// //       </View>

// //       <Navbar />
// //       <Toast />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#ffffff' },
// //   loaderContainer: { flex: 1 },

// //   // ── SEARCH BAR (fixed top, position unchanged) ────────────────
// //   welcomeSection: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 12,
// //     backgroundColor: '#ffffff',
// //     zIndex: 10,
// //   },
// //   searchBarContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //     borderRadius: 14,
// //     paddingHorizontal: 14,
// //     height: 48,
// //     gap: 10,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.06,
// //     shadowRadius: 6,
// //     elevation: 3,
// //     borderWidth: 1,
// //     borderColor: "#eef0f5",
// //   },
// //   searchInput: { flex: 1, fontSize: 14, color: "#1A3067" },

// //   // ── HERO ─────────────────────────────────────────────────────
// //   // ── HERO ─────────────────────────────────────────────────────
// // heroWrapper: {
// //   backgroundColor: "#0F1E45",
// //   paddingTop: 18,
// //   paddingBottom: 20,
// //   paddingHorizontal: 20,
// //   borderBottomLeftRadius: 24,
// //   borderBottomRightRadius: 24,
// //   overflow: "hidden",
// // },
// // heroAccentCircle1: {
// //   position: "absolute",
// //   width: 160,
// //   height: 160,
// //   borderRadius: 80,
// //   borderWidth: 1,
// //   borderColor: "rgba(255,255,255,0.05)",
// //   top: -55,
// //   right: -55,
// // },
// // heroAccentCircle2: {
// //   position: "absolute",
// //   width: 90,
// //   height: 90,
// //   borderRadius: 45,
// //   backgroundColor: "rgba(30,80,180,0.28)",
// //   top: -20,
// //   right: -10,
// // },
// // heroTopRow: {
// //   flexDirection: "row",
// //   justifyContent: "space-between",
// //   alignItems: "center",
// //   marginBottom: 14,
// // },
// // heroBrandBadge: {
// //   flexDirection: "row",
// //   alignItems: "center",
// //   backgroundColor: "rgba(255,255,255,0.07)",
// //   borderRadius: 14,
// //   paddingHorizontal: 9,
// //   paddingVertical: 4,
// //   gap: 5,
// //   borderWidth: 1,
// //   borderColor: "rgba(126,179,255,0.25)",
// // },
// // heroBrandText: {
// //   color: "#7EB3FF",
// //   fontSize: 9,
// //   fontWeight: "800",
// //   letterSpacing: 0.8,
// // },
// // heroGreeting: {
// //   color: "rgba(255,255,255,0.5)",
// //   fontSize: 12,
// //   fontWeight: "500",
// // },
// // heroTitle: {
// //   color: "#fff",
// //   fontSize: 22,
// //   fontWeight: "800",
// //   lineHeight: 30,
// //   letterSpacing: -0.4,
// //   marginBottom: 8,
// // },
// // heroTitleAccent: {
// //   color: "#7EB3FF",
// // },
// // heroSub: {
// //   color: "rgba(255,255,255,0.55)",
// //   fontSize: 12,
// //   lineHeight: 18,
// //   marginBottom: 16,
// // },
// // heroChips: {
// //   flexDirection: "row",
// //   gap: 8,
// //   flexWrap: "wrap",
// // },
// // heroChip: {
// //   flexDirection: "row",
// //   alignItems: "center",
// //   gap: 5,
// //   backgroundColor: "rgba(255,255,255,0.07)",
// //   borderRadius: 20,
// //   paddingHorizontal: 10,
// //   paddingVertical: 5,
// //   borderWidth: 1,
// //   borderColor: "rgba(255,255,255,0.1)",
// // },
// // heroChipText: {
// //   color: "rgba(255,255,255,0.75)",
// //   fontSize: 11,
// //   fontWeight: "600",
// // },
// //   // ── STATS ─────────────────────────────────────────────────────
// //   statsStrip: {
// //     flexDirection: "row",
// //     backgroundColor: "#fff",
// //     marginHorizontal: 16,
// //     marginTop: 16,
// //     borderRadius: 16,
// //     paddingVertical: 16,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.05,
// //     shadowRadius: 6,
// //     elevation: 2,
// //   },
// //   statItem: { flex: 1, alignItems: "center" },
// //   statBorder: { borderRightWidth: 1, borderRightColor: "#f0f0f0" },
// //   statValue: { fontSize: 18, fontWeight: "800", color: "#1A3067" },
// //   statLabel: { fontSize: 11, color: "#9ca3af", marginTop: 2 },

// //   // ── QUICK ACCESS ─────────────────────────────────────────────
// //   quickAccessWrapper: { marginTop: 16 },
// //   miniSectionTitle: {
// //     fontSize: 13,
// //     fontWeight: "bold",
// //     color: "#1A3067",
// //     marginLeft: 20,
// //     marginBottom: 10,
// //     textTransform: "uppercase",
// //   },
// //   quickAccessContainer: { paddingLeft: 20, paddingRight: 10 },
// //   miniButton: { alignItems: "center", marginRight: 15, width: 70 },
// //   miniIconCircle: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 25,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: 5,
// //     elevation: 1,
// //   },
// //   miniButtonLabel: { fontSize: 10, fontWeight: "600", color: "#555" },

// //   // ── SECTION HEADER + TABS ────────────────────────────────────
// //   sectionHeaderRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     marginTop: 20,
// //     marginBottom: 10,
// //   },
// //   sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
// //   seeAllText: { color: "#1A3067", fontWeight: "bold", fontSize: 18 },
// //   filterContainer: {
// //     flexDirection: "row",
// //     paddingHorizontal: 20,
// //     marginVertical: 10,
// //     gap: 8,
// //   },
// //   filterBtn: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     backgroundColor: "#fff",
// //     borderWidth: 1,
// //     borderColor: "#e5e7eb",
// //   },
// //   filterBtnActive: { backgroundColor: "#1A3067", borderColor: "#1A3067" },
// //   filterText: { color: "#1A3067", fontWeight: "bold", fontSize: 12 },
// //   filterTextActive: { color: "#fff" },

// //   // ── PRODUCT CARDS ────────────────────────────────────────────
// //   row: { justifyContent: "space-between", paddingHorizontal: 20 },
// //   itemCard: {
// //     width: "48%",
// //     marginBottom: 15,
// //     borderRadius: 12,
// //     backgroundColor: "#f9f9f9",
// //     elevation: 2,
// //     overflow: "hidden",
// //   },
// //   cardImage: { width: "100%", height: 100 },
// //   cardInfo: { padding: 10 },
// //   cardTitle: { fontSize: 12, fontWeight: "bold", color: "#333" },
// //   typeBadge: {
// //     alignSelf: "flex-start",
// //     paddingHorizontal: 6,
// //     paddingVertical: 2,
// //     borderRadius: 4,
// //     marginBottom: 4,
// //   },
// //   typeText: { fontSize: 8, color: "#fff", fontWeight: "bold" },

// //   // ── BLOG ─────────────────────────────────────────────────────
// //   blogCard: {
// //     width: 180,
// //     backgroundColor: "#fff",
// //     borderRadius: 12,
// //     marginRight: 15,
// //     overflow: "hidden",
// //     borderWidth: 1,
// //     borderColor: "#eee",
// //   },
// //   blogImage: { width: "100%", height: 90 },
// //   blogInfo: { padding: 8 },
// //   blogTitle: { fontSize: 12, fontWeight: "bold", height: 32 },
// //   blogReadMore: { fontSize: 10, color: "#1A3067", marginTop: 4, fontWeight: "bold" },

// //   // ── SKELETON ─────────────────────────────────────────────────
// //   skeletonGrid: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 20,
// //     marginTop: 4,
// //   },
// //   skeletonCard: {
// //     width: "48%",
// //     marginBottom: 15,
// //     borderRadius: 14,
// //     backgroundColor: "#e2e6f0",
// //     overflow: "hidden",
// //   },
// //   skeletonImage: {
// //     width: "100%",
// //     height: 100,
// //     backgroundColor: "#cdd3e0",
// //   },
// //   skeletonBody: { padding: 10, gap: 7 },
// //   skeletonBadge: {
// //     width: 55,
// //     height: 16,
// //     borderRadius: 6,
// //     backgroundColor: "#cdd3e0",
// //   },
// //   skeletonTitle: {
// //     width: "90%",
// //     height: 12,
// //     borderRadius: 6,
// //     backgroundColor: "#cdd3e0",
// //   },
// //   skeletonTitleShort: {
// //     width: "60%",
// //     height: 12,
// //     borderRadius: 6,
// //     backgroundColor: "#cdd3e0",
// //   },
// //   skeletonQuickItem: {
// //     alignItems: "center",
// //     marginRight: 15,
// //     width: 70,
// //     gap: 6,
// //   },
// //   skeletonQuickCircle: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 25,
// //     backgroundColor: "#dde2ed",
// //   },
// //   skeletonQuickLabel: {
// //     width: 44,
// //     height: 10,
// //     borderRadius: 5,
// //     backgroundColor: "#dde2ed",
// //   },
// //   skeletonSectionTitle: {
// //     width: 120,
// //     height: 14,
// //     borderRadius: 7,
// //     backgroundColor: "#dde2ed",
// //     marginLeft: 20,
// //     marginBottom: 10,
// //   },
// //   skeletonFilterBtn: {
// //     width: 70,
// //     height: 34,
// //     borderRadius: 20,
// //     backgroundColor: "#dde2ed",
// //   },

// //   // ── EMPTY ────────────────────────────────────────────────────
// //   emptyBox: { alignItems: "center", paddingTop: 40, gap: 8 },
// //   emptyText: { textAlign: "center", color: "#999", fontSize: 14 },

// //   // ── FLOATING BUTTONS ─────────────────────────────────────────
// //   floatingGroup: {
// //     position: "absolute",
// //     bottom: 90,
// //     right: 20,
// //     alignItems: "flex-end",
// //   },
// //   stickyBtn: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     borderRadius: 30,
// //     elevation: 5,
// //     backgroundColor: "#1A3067",
// //     marginTop: 10,
// //   },
// //   supportSticky: {
// //     backgroundColor: "green",
// //     height: 50,
// //     width: 50,
// //     justifyContent: "center",
// //     paddingHorizontal: 0,
// //   },
// //   stickyBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 8, fontSize: 13 },
// // });

// import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   FlatList,
//   Dimensions,
//   RefreshControl,
//   TextInput,
//   ScrollView,
//   Linking,
//   Alert,
//   Animated,
// } from "react-native";
// import Navbar from "../components/Navbar";
// import CustomIcon from "../components/CustomIcon";
// import useStore from "../store/useStore";
// import { auth } from "../firebaseConfig";
// import { useNetworkCheck } from "../store/useNetwork";
// import Toast from "react-native-toast-message";

// const { width } = Dimensions.get("window");
// const BASE_URL = "https://orbitmediasolutions.com/";
// const HERO_HEIGHT = 210;
// const SEARCH_BAR_HEIGHT = 46;
// const SEARCH_OVERLAP = 22;
// const CONTENT_TOP_OFFSET = HERO_HEIGHT - SEARCH_OVERLAP + SEARCH_BAR_HEIGHT + 12;

// // ─── HERO SLIDES CONFIG ──────────────────────────────────────
// const HERO_SLIDES = [
//   {
//     type: "products",
//     tag: "OUR PRODUCTS",
//     headline: "Powerful Software\nfor Every Business",
//     sub: "ERP, POS, HR, CRM & more — ready-to-use systems built to streamline your operations.",
//     cta: "Explore Products",
//     ctaNav: "Product",
//     accentColor: "#7EB3FF",
//     bgColor: "#0F1E45",
//     icon: "boxes",
//   },
//   {
//     type: "services",
//     tag: "OUR SERVICES",
//     headline: "Web, Mobile &\nDigital Solutions",
//     sub: "From stunning websites to custom apps — we turn bold ideas into results-driven solutions.",
//     cta: "Explore Services",
//     ctaNav: "Service",
//     accentColor: "#4ECDC4",
//     bgColor: "#0D2B2B",
//     icon: "concierge-bell",
//   },
//   {
//     type: "support",
//     tag: "SINCE 2018",
//     headline: "Global Reach,\nLocal Expertise",
//     sub: "A global digital agency helping startups, SMEs & enterprises thrive in a digital world.",
//     cta: "Book a Service",
//     ctaNav: "Form",
//     accentColor: "#F7B731",
//     bgColor: "#1A1200",
//     icon: "globe",
//   },
// ];

// // ─── SPINNING REFRESH ICON ───────────────────────────────────
// function SpinIcon({ spinning, color = "#1A3067" }) {
//   const spinAnim = useRef(new Animated.Value(0)).current;
//   const loopRef = useRef(null);

//   useEffect(() => {
//     if (spinning) {
//       loopRef.current = Animated.loop(
//         Animated.timing(spinAnim, {
//           toValue: 1,
//           duration: 700,
//           useNativeDriver: true,
//         })
//       );
//       loopRef.current.start();
//     } else {
//       loopRef.current?.stop();
//       spinAnim.setValue(0);
//     }
//     return () => loopRef.current?.stop();
//   }, [spinning]);

//   const rotate = spinAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   return (
//     <Animated.View style={{ transform: [{ rotate }] }}>
//       <CustomIcon name="sync-alt" size={16} color={color} />
//     </Animated.View>
//   );
// }

// // ─── FIXED HERO SLIDER ───────────────────────────────────────
// function HeroSlider({ navigation, userName }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatRef = useRef(null);
//   const timerRef = useRef(null);
//   const contentOpacity = useRef(new Animated.Value(1)).current;

//   const goTo = (idx) => {
//     Animated.sequence([
//       Animated.timing(contentOpacity, { toValue: 0.2, duration: 150, useNativeDriver: true }),
//       Animated.timing(contentOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
//     ]).start();
//     setActiveIndex(idx);
//     flatRef.current?.scrollToIndex({ index: idx, animated: true });
//   };

//   const startAutoSlide = () => {
//     timerRef.current = setInterval(() => {
//       setActiveIndex((prev) => {
//         const next = (prev + 1) % HERO_SLIDES.length;
//         flatRef.current?.scrollToIndex({ index: next, animated: true });
//         Animated.sequence([
//           Animated.timing(contentOpacity, { toValue: 0.2, duration: 150, useNativeDriver: true }),
//           Animated.timing(contentOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
//         ]).start();
//         return next;
//       });
//     }, 4000);
//   };

//   useEffect(() => {
//     startAutoSlide();
//     return () => clearInterval(timerRef.current);
//   }, []);

//   const handleDotPress = (i) => {
//     clearInterval(timerRef.current);
//     goTo(i);
//     startAutoSlide();
//   };

//   const slide = HERO_SLIDES[activeIndex];

//   return (
//     <View style={[styles.heroFixed, { backgroundColor: slide.bgColor }]}>
//       <View style={[styles.heroCircle1, { borderColor: slide.accentColor + "20" }]} />
//       <View style={[styles.heroCircle2, { backgroundColor: slide.accentColor + "15" }]} />

//       <FlatList
//         ref={flatRef}
//         data={HERO_SLIDES}
//         renderItem={() => <View style={{ width, height: HERO_HEIGHT }} />}
//         keyExtractor={(_, i) => `s${i}`}
//         horizontal
//         pagingEnabled
//         scrollEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={(e) => {
//           const idx = Math.round(e.nativeEvent.contentOffset.x / width);
//           goTo(idx);
//         }}
//         style={StyleSheet.absoluteFillObject}
//         nestedScrollEnabled={false}
//       />

//       <Animated.View style={[styles.heroOverlay, { opacity: contentOpacity }]} pointerEvents="box-none">
//         <View style={styles.heroTopRow}>
//           <View style={[styles.heroBrandBadge, { borderColor: slide.accentColor + "50" }]}>
//             <CustomIcon name={slide.icon} size={9} color={slide.accentColor} />
//             <Text style={[styles.heroBrandText, { color: slide.accentColor }]}>{slide.tag}</Text>
//           </View>
//         </View>

//         <Text style={styles.heroTitle}>{slide.headline}</Text>
//         <Text style={styles.heroSub}>{slide.sub}</Text>

//         <View style={styles.heroBottom}>
//           <TouchableOpacity
//             style={[styles.heroCTA, { backgroundColor: slide.accentColor }]}
//             onPress={() => navigation.navigate(slide.ctaNav)}
//             activeOpacity={0.85}
//           >
//             <Text style={styles.heroCTAText}>{slide.cta}</Text>
//             <CustomIcon name="arrow-right" size={11} color="#000" />
//           </TouchableOpacity>

//           <View style={styles.dotsRow}>
//             {HERO_SLIDES.map((_, i) => (
//               <TouchableOpacity key={i} onPress={() => handleDotPress(i)} activeOpacity={0.7}>
//                 <View
//                   style={[
//                     styles.dot,
//                     {
//                       backgroundColor: i === activeIndex ? slide.accentColor : "rgba(255,255,255,0.25)",
//                       width: i === activeIndex ? 20 : 6,
//                     },
//                   ]}
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </Animated.View>
//     </View>
//   );
// }

// // ─── SKELETON CARD ──────────────────────────────────────────
// function SkeletonCard() {
//   const shimmer = useState(new Animated.Value(0))[0];
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
//         Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
//       ])
//     ).start();
//   }, []);
//   const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.75] });
//   return (
//     <Animated.View style={[styles.skeletonCard, { opacity }]}>
//       <View style={styles.skeletonImage} />
//       <View style={styles.skeletonBody}>
//         <View style={styles.skeletonBadge} />
//         <View style={styles.skeletonTitle} />
//         <View style={styles.skeletonTitleShort} />
//       </View>
//     </Animated.View>
//   );
// }

// function SkeletonQuickItem() {
//   const shimmer = useState(new Animated.Value(0))[0];
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
//         Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
//       ])
//     ).start();
//   }, []);
//   const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });
//   return (
//     <Animated.View style={[styles.skeletonQuickItem, { opacity }]}>
//       <View style={styles.skeletonQuickCircle} />
//       <View style={styles.skeletonQuickLabel} />
//     </Animated.View>
//   );
// }

// // ─── MAIN SCREEN ─────────────────────────────────────────────
// export default function Home({ navigation }) {
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [userName, setUserName] = useState("Guest");

//   const { allData, loading, fetchHomeData, blogs } = useStore();
//   useNetworkCheck();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       setUserName(auth.currentUser?.displayName || "Guest");
//     });
//     return unsubscribe;
//   }, [navigation]);

//   useEffect(() => { fetchHomeData(); }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchHomeData();
//     setRefreshing(false);
//   }, [fetchHomeData]);

//   const filteredItems = useMemo(() => {
//     let data = allData;
//     if (searchQuery.trim()) {
//       return data.filter(
//         (item) =>
//           item.displayTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
//       );
//     }
//     if (activeTab !== "All") data = data.filter((item) => item.type === activeTab);
//     return data;
//   }, [searchQuery, activeTab, allData]);

//   const handleEmergencyCall = () => {
//     Linking.openURL("https://wa.me/447935390848").catch(() =>
//       Alert.alert("Error", "Unable to open WhatsApp")
//     );
//   };

//   const getHeroIcon = (title, type) => {
//     const t = title.toLowerCase();
//     if (t.includes("erp") || t.includes("management")) return "layer-group";
//     if (t.includes("pos") || t.includes("shop")) return "layer-group";
//     if (t.includes("app") || t.includes("mobile")) return "concierge-bell";
//     return type === "Products" ? "layer-group" : "concierge-bell";
//   };

//   const renderSkeleton = () => (
//     <View>
//       <View style={styles.quickAccessWrapper}>
//         <View style={styles.skeletonSectionTitle} />
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAccessContainer}>
//           {[1, 2, 3, 4, 5].map((i) => <SkeletonQuickItem key={i} />)}
//         </ScrollView>
//       </View>
//       <View style={styles.sectionHeaderRow}>
//         <View style={styles.skeletonSectionTitle} />
//       </View>
//       <View style={styles.filterContainer}>
//         {[1, 2, 3].map((i) => <View key={i} style={styles.skeletonFilterBtn} />)}
//       </View>
//       <View style={styles.skeletonGrid}>
//         {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
//       </View>
//     </View>
//   );

//   const renderBlogItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.blogCard}
//       onPress={() => navigation.navigate("BlogDetails", { blog: item })}
//     >
//       <Image source={{ uri: `${BASE_URL}${item.displayImage}` }} style={styles.blogImage} resizeMode="cover" />
//       <View style={styles.blogInfo}>
//         <Text style={styles.blogTitle} numberOfLines={2}>{item.displayTitle}</Text>
//         <Text style={styles.blogReadMore}>Read Post →</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.itemCard}
//       onPress={() =>
//         navigation.navigate(
//           item.type === "Products" ? "ProductDetails" : "ServiceDetails",
//           { [item.type === "Products" ? "product" : "service"]: item },
//         )
//       }
//     >
//       <Image source={{ uri: `${BASE_URL}${item.displayImage}` }} style={styles.cardImage} />
//       <View style={styles.cardInfo}>
//         <View style={[styles.typeBadge, { backgroundColor: item.type === "Products" ? "#6200EE" : "#03DAC6" }]}>
//           <Text style={styles.typeText}>{item.type === "Products" ? "PRODUCT" : "SERVICE"}</Text>
//         </View>
//         <Text style={styles.cardTitle} numberOfLines={1}>{item.displayTitle}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderHeader = () => (
//     <View>
//       {!searchQuery && (
//         <>
//           <View style={{ height: CONTENT_TOP_OFFSET }} />

//           <View style={styles.quickAccessWrapper}>
//             <Text style={styles.miniSectionTitle}>Quick Access</Text>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.quickAccessContainer}
//             >
//               {allData.map((item) => (
//                 <TouchableOpacity
//                   key={item.uniqueKey}
//                   style={styles.miniButton}
//                   onPress={() =>
//                     navigation.navigate(
//                       item.type === "Products" ? "ProductDetails" : "ServiceDetails",
//                       { [item.type === "Products" ? "product" : "service"]: item },
//                     )
//                   }
//                 >
//                   <View style={[styles.miniIconCircle, { backgroundColor: item.type === "Products" ? "#F0F3FF" : "#F8F0FF" }]}>
//                     <CustomIcon
//                       name={getHeroIcon(item.displayTitle, item.type)}
//                       size={20}
//                       color={item.type === "Products" ? "#1A3067" : "#6200EE"}
//                     />
//                   </View>
//                   <Text style={styles.miniButtonLabel} numberOfLines={1}>
//                     {item.displayTitle.split(" ")[0]}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           <View style={styles.sectionHeaderRow}>
//             <Text style={styles.sectionTitle}>Featured Solutions</Text>
//           </View>
//           <View style={styles.filterContainer}>
//             {["All", "Products", "Services"].map((tab) => (
//               <TouchableOpacity
//                 key={tab}
//                 onPress={() => setActiveTab(tab)}
//                 style={[styles.filterBtn, activeTab === tab && styles.filterBtnActive]}
//               >
//                 <Text style={[styles.filterText, activeTab === tab && styles.filterTextActive]}>{tab}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </>
//       )}

//       {searchQuery ? (
//         <View>
//           <View style={{ height: CONTENT_TOP_OFFSET }} />
//           <View style={styles.sectionHeaderRow}>
//             <Text style={styles.sectionTitle}>Search Results</Text>
//           </View>
//         </View>
//       ) : null}
//     </View>
//   );

//   const renderFooter = () => {
//     if (searchQuery || blogs.length === 0) return <View style={{ height: 100 }} />;
//     return (
//       <View style={{ marginTop: 20, paddingBottom: 100 }}>
//         <View style={styles.sectionHeaderRow}>
//           <Text style={styles.sectionTitle}>Latest Insights</Text>
//           <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           data={blogs}
//           horizontal
//           renderItem={renderBlogItem}
//           keyExtractor={(item) => `blog-footer-${item.id}`}
//           contentContainerStyle={{ paddingLeft: 20 }}
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>

//       {/* ── LAYER 1: Fixed hero ── */}
//       <View style={styles.heroAnchor}>
//         <HeroSlider navigation={navigation} userName={userName} />
//       </View>

//       {/* ── LAYER 2: Fixed search bar + refresh button ── */}
//       <View style={styles.searchWrapper}>
//         <View style={styles.searchBarContainer}>
//           <CustomIcon name="search" size={16} color="#999" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for ERP, POS, or Web Dev..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#999"
//           />
//           {/* Clear button when typing */}
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.searchAction}>
//               <CustomIcon name="times-circle" size={16} color="#ccc" />
//             </TouchableOpacity>
//           )}

//           {/* Divider */}
//           <View style={styles.searchDivider} />

//           {/* Refresh button */}
//           <TouchableOpacity
//             onPress={onRefresh}
//             disabled={refreshing}
//             style={styles.searchAction}
//             activeOpacity={0.6}
//           >
//             <SpinIcon spinning={refreshing} color="#1A3067" />
//           </TouchableOpacity>
//         </View>

//         {/* Refreshing toast strip */}
//         {refreshing && (
//           <View style={styles.refreshStrip}>
//             <SpinIcon spinning color="#1A3067" />

//           </View>
//         )}
//       </View>

//       {/* ── LAYER 3: Scrollable content ── */}
//       {loading && allData.length === 0 ? (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           style={{ flex: 1 }}
//           contentContainerStyle={{ paddingTop: CONTENT_TOP_OFFSET }}
//         >
//           {renderSkeleton()}
//         </ScrollView>
//       ) : (
//         <FlatList
//           data={filteredItems}
//           renderItem={renderCard}
//           keyExtractor={(item) => item.uniqueKey}
//           extraData={[activeTab, searchQuery]}
//           ListHeaderComponent={renderHeader}
//           ListFooterComponent={renderFooter}
//           numColumns={2}
//           keyboardShouldPersistTaps="handled"
//           columnWrapperStyle={styles.row}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={["#1A3067"]}
//               tintColor="#1A3067"
//             />
//           }
//           contentContainerStyle={{ paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//           style={styles.flatList}
//           ListEmptyComponent={
//             <View style={styles.emptyBox}>
//               <CustomIcon name="search" size={32} color="#ccc" />
//               <Text style={styles.emptyText}>No matches found.</Text>
//             </View>
//           }
//         />
//       )}

//       {/* ── LAYER 4: Floating buttons ── */}
//       <View style={styles.floatingGroup}>
//         <TouchableOpacity style={[styles.stickyBtn, styles.supportSticky]} onPress={handleEmergencyCall}>
//           <CustomIcon name="whatsapp" size={20} color="white" type="Brands" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.stickyBtn} onPress={() => navigation.navigate("Form")}>
//           <CustomIcon name="calendar-check" size={18} color="white" />
//           <Text style={styles.stickyBtnText}>Book Services</Text>
//         </TouchableOpacity>
//       </View>

//       <Navbar />
//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#ffffff" },

//   // ── HERO ─────────────────────────────────────────────────────
//   heroAnchor: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   heroFixed: {
//     width: "100%",
//     height: HERO_HEIGHT,
//     overflow: "hidden",
//     borderRadius: 10,
//   },
//   heroCircle1: {
//     position: "absolute",
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     borderWidth: 1,
//     top: -60,
//     right: -50,
//   },
//   heroCircle2: {
//     position: "absolute",
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     top: -15,
//     right: -10,
//   },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     paddingBottom: 12,
//     justifyContent: "space-between",
//   },
//   heroTopRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   heroBrandBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.07)",
//     borderRadius: 14,
//     paddingHorizontal: 9,
//     paddingVertical: 4,
//     gap: 5,
//     borderWidth: 1,
//   },
//   heroBrandText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.9 },
//   heroTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "900",
//     lineHeight: 24,
//     letterSpacing: -0.3,
//     flex: 1,
//     marginTop: 5,
//   },
//   heroSub: { color: "rgba(255,255,255,0.5)", fontSize: 11, lineHeight: 20 },
//   heroBottom: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   heroCTA: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 13,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   heroCTAText: { color: "#000", fontSize: 11, fontWeight: "800" },
//   dotsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
//   dot: { height: 6, borderRadius: 3 },

//   // ── SEARCH BAR ───────────────────────────────────────────────
//   searchWrapper: {
//     position: "absolute",
//     top: HERO_HEIGHT - SEARCH_OVERLAP,
//     left: 16,
//     right: 16,
//     zIndex: 10,
//   },
//   searchBarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     height: SEARCH_BAR_HEIGHT,
//     gap: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 6,
//     borderWidth: 1,
//     borderColor: "#eef0f5",
//   },
//   searchInput: { flex: 1, fontSize: 13, color: "#1A3067" },
//   searchAction: {
//     padding: 4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchDivider: {
//     width: 1,
//     height: 20,
//     backgroundColor: "#e5e7eb",
//   },

//   // ── REFRESH STRIP (appears below search bar while refreshing) ─
//  refreshStrip: {
//   flexDirection: "row",
//   alignItems: "center",
//   gap: 6,
//   backgroundColor: "#ffffff",
//   borderRadius: 20,
//   paddingHorizontal: 12,
//   paddingVertical: 6,
//   marginTop: 6,
//   alignSelf: "center",
//   shadowColor: "#1A3067",
//   shadowOpacity: 0.12,
//   shadowRadius: 8,
//   shadowOffset: { width: 0, height: 2 },
//   elevation: 4,
//   borderWidth: 1,
//   borderColor: "#e8edf5",
// },
// refreshStripText: {
//   color: "#1A3067",
//   fontSize: 11,
//   fontWeight: "700",
//   letterSpacing: 0.3,
// },
//   // ── FLATLIST ─────────────────────────────────────────────────
//   flatList: { zIndex: 2 },

//   // ── QUICK ACCESS ─────────────────────────────────────────────
//   quickAccessWrapper: { marginTop: 16 },
//   miniSectionTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#1A3067",
//     marginLeft: 20,
//     marginBottom: 10,
//     textTransform: "uppercase",
//   },
//   quickAccessContainer: { paddingLeft: 20, paddingRight: 10 },
//   miniButton: { alignItems: "center", marginRight: 15, width: 70 },
//   miniIconCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 5,
//     elevation: 1,
//   },
//   miniButtonLabel: { fontSize: 10, fontWeight: "600", color: "#555" },

//   // ── SECTION HEADER + TABS ────────────────────────────────────
//   sectionHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
//   seeAllText: { color: "#1A3067", fontWeight: "bold", fontSize: 18 },
//   filterContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginVertical: 10,
//     gap: 8,
//   },
//   filterBtn: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   filterBtnActive: { backgroundColor: "#1A3067", borderColor: "#1A3067" },
//   filterText: { color: "#1A3067", fontWeight: "bold", fontSize: 12 },
//   filterTextActive: { color: "#fff" },

//   // ── PRODUCT CARDS ────────────────────────────────────────────
//   row: { justifyContent: "space-between", paddingHorizontal: 20 },
//   itemCard: {
//     width: "48%",
//     marginBottom: 15,
//     borderRadius: 12,
//     backgroundColor: "#f9f9f9",
//     elevation: 2,
//     overflow: "hidden",
//   },
//   cardImage: { width: "100%", height: 100 },
//   cardInfo: { padding: 10 },
//   cardTitle: { fontSize: 12, fontWeight: "bold", color: "#333" },
//   typeBadge: {
//     alignSelf: "flex-start",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginBottom: 4,
//   },
//   typeText: { fontSize: 8, color: "#fff", fontWeight: "bold" },

//   // ── BLOG ─────────────────────────────────────────────────────
//   blogCard: {
//     width: 180,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginRight: 15,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   blogImage: { width: "100%", height: 90 },
//   blogInfo: { padding: 8 },
//   blogTitle: { fontSize: 12, fontWeight: "bold", height: 32 },
//   blogReadMore: { fontSize: 10, color: "#1A3067", marginTop: 4, fontWeight: "bold" },

//   // ── SKELETON ─────────────────────────────────────────────────
//   skeletonGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     marginTop: 4,
//   },
//   skeletonCard: {
//     width: "48%",
//     marginBottom: 15,
//     borderRadius: 14,
//     backgroundColor: "#e2e6f0",
//     overflow: "hidden",
//   },
//   skeletonImage: { width: "100%", height: 100, backgroundColor: "#cdd3e0" },
//   skeletonBody: { padding: 10, gap: 7 },
//   skeletonBadge: { width: 55, height: 16, borderRadius: 6, backgroundColor: "#cdd3e0" },
//   skeletonTitle: { width: "90%", height: 12, borderRadius: 6, backgroundColor: "#cdd3e0" },
//   skeletonTitleShort: { width: "60%", height: 12, borderRadius: 6, backgroundColor: "#cdd3e0" },
//   skeletonQuickItem: { alignItems: "center", marginRight: 15, width: 70, gap: 6 },
//   skeletonQuickCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#dde2ed" },
//   skeletonQuickLabel: { width: 44, height: 10, borderRadius: 5, backgroundColor: "#dde2ed" },
//   skeletonSectionTitle: {
//     width: 120, height: 14, borderRadius: 7,
//     backgroundColor: "#dde2ed", marginLeft: 20, marginBottom: 10,
//   },
//   skeletonFilterBtn: { width: 70, height: 34, borderRadius: 20, backgroundColor: "#dde2ed" },

//   // ── EMPTY ────────────────────────────────────────────────────
//   emptyBox: { alignItems: "center", paddingTop: 40, gap: 8 },
//   emptyText: { textAlign: "center", color: "#999", fontSize: 14 },

//   // ── FLOATING BUTTONS ─────────────────────────────────────────
//   floatingGroup: {
//     position: "absolute",
//     bottom: 90,
//     right: 20,
//     alignItems: "flex-end",
//   },
//   stickyBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderRadius: 30,
//     elevation: 5,
//     backgroundColor: "#1A3067",
//     marginTop: 10,
//   },
//   supportSticky: {
//     backgroundColor: "#25D366",
//     height: 50,
//     width: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 0,
//   },
//   stickyBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 8, fontSize: 13 },
// });


import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Image, FlatList,
  Dimensions, RefreshControl, TextInput, ScrollView,
  Linking, Alert, Animated,
} from "react-native";
import Navbar from "../components/Navbar";
import CustomIcon from "../components/CustomIcon";
import useStore from "../store/useStore";
import { auth } from "../firebaseConfig";
import { useNetworkCheck } from "../store/useNetwork";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const BASE_URL = "https://orbitmediasolutions.com/";
const SLIDE_W  = width;

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  navy:   "#060E28",
  navyM:  "#0C1A42",
  blue:   "#1A3067",
  bg:     "#F1F4FB",
  white:  "#FFFFFF",
  ink:    "#08112B",
  ink3:   "#3D4F72",
  ink4:   "#6B7FA8",
  ink5:   "#A8B8D8",
  border: "rgba(8,17,43,0.07)",
};

// ─── KEYWORD MAPS ────────────────────────────────────────────────────────────
const BG_MAP = [
  { kw: "erp",      c: ["#0F2167", "#1847E5"] },
  { kw: "hr",       c: ["#064E3B", "#059669"] },
  { kw: "pos",      c: ["#4C1D95", "#7C3AED"] },
  { kw: "invent",   c: ["#78350F", "#D97706"] },
  { kw: "hotel",    c: ["#1A2E05", "#65A30D"] },
  { kw: "web",      c: ["#0C4A6E", "#0284C7"] },
  { kw: "market",   c: ["#7C2D12", "#EA580C"] },
  { kw: "mobile",   c: ["#1E1B4B", "#4338CA"] },
  { kw: "app",      c: ["#1E1B4B", "#4338CA"] },
  { kw: "news",     c: ["#1C1917", "#78716C"] },
  { kw: "pharma",   c: ["#064E3B", "#10B981"] },
  { kw: "account",  c: ["#0C4A6E", "#0284C7"] },
  { kw: "payroll",  c: ["#78350F", "#B45309"] },
  { kw: "restaur",  c: ["#7C2D12", "#EA580C"] },
  { kw: "ecomm",    c: ["#312E81", "#6D28D9"] },
  { kw: "school",   c: ["#164E63", "#0891B2"] },
  { kw: "clinic",   c: ["#831843", "#BE185D"] },
  { kw: "salon",    c: ["#4A1942", "#A21CAF"] },
  { kw: "gym",      c: ["#1A1200", "#CA8A04"] },
];

const EM_MAP = [
  { kw: "erp",     e: "🏢" }, { kw: "hr",      e: "👥" }, { kw: "pos",     e: "🖥️" },
  { kw: "invent",  e: "📦" }, { kw: "hotel",   e: "🏨" }, { kw: "web",     e: "💻" },
  { kw: "market",  e: "📈" }, { kw: "mobile",  e: "📱" }, { kw: "app",     e: "📱" },
  { kw: "news",    e: "📰" }, { kw: "pharma",  e: "💊" }, { kw: "account", e: "📊" },
  { kw: "payroll", e: "💰" }, { kw: "restaur", e: "🍽️" }, { kw: "ecomm",   e: "🛒" },
  { kw: "school",  e: "🎓" }, { kw: "clinic",  e: "🏥" }, { kw: "salon",   e: "💇" },
  { kw: "gym",     e: "🏋️" }, { kw: "law",     e: "⚖️" },
];

const getBg = (title = "", isProd = true) => {
  const t = title.toLowerCase();
  for (const { kw, c } of BG_MAP) if (t.includes(kw)) return c;
  return isProd ? ["#0F2167", "#1847E5"] : ["#0C4A6E", "#0284C7"];
};

const getEmoji = (title = "") => {
  const t = title.toLowerCase();
  for (const { kw, e } of EM_MAP) if (t.includes(kw)) return e;
  return "📁";
};

/** Short human-readable category derived from product title */
const getCategory = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("erp"))                         return "Enterprise Resource Planning";
  if (t.includes("hr") || t.includes("human"))   return "HR Management";
  if (t.includes("payroll"))                      return "Payroll & Finance";
  if (t.includes("pos"))                          return "Point of Sale";
  if (t.includes("invent"))                       return "Inventory Control";
  if (t.includes("hotel"))                        return "Hospitality";
  if (t.includes("restaur"))                      return "Restaurant & F&B";
  if (t.includes("school") || t.includes("edu"))  return "Education";
  if (t.includes("clinic") || t.includes("health"))return "Healthcare";
  if (t.includes("pharma"))                       return "Pharmacy";
  if (t.includes("account"))                      return "Accounting";
  if (t.includes("ecomm"))                        return "E-Commerce";
  if (t.includes("salon"))                        return "Salon & Beauty";
  if (t.includes("gym") || t.includes("fitness")) return "Fitness";
  if (t.includes("law"))                          return "Legal";
  if (t.includes("web"))                          return "Web Development";
  if (t.includes("mobile") || t.includes("app"))  return "Mobile App";
  if (t.includes("market"))                       return "Digital Marketing";
  if (t.includes("crm"))                          return "Customer Relations";
  return "Business Solution";
};

/** 3 feature bullet-points for a product, derived from title keywords */
const getFeatures = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("erp"))     return ["Multi-module", "Real-time Reports", "Cloud Ready"];
  if (t.includes("hr"))      return ["Attendance", "Leave Management", "Staff Portal"];
  if (t.includes("payroll")) return ["Auto Payslip", "Tax Ready", "Bank Transfer"];
  if (t.includes("pos"))     return ["Fast Checkout", "Offline Mode", "Receipt Print"];
  if (t.includes("invent"))  return ["Stock Alerts", "Barcode Scan", "Multi-location"];
  if (t.includes("hotel"))   return ["Booking Engine", "Room Map", "Housekeeping"];
  if (t.includes("restaur")) return ["Table Orders", "KDS Support", "Menu Builder"];
  if (t.includes("school"))  return ["Attendance", "Grade Book", "Parent Portal"];
  if (t.includes("clinic"))  return ["Patient Records", "Appointments", "Billing"];
  if (t.includes("pharma"))  return ["Drug Inventory", "Prescriptions", "Expiry Alert"];
  if (t.includes("account")) return ["Ledger", "Invoicing", "Tax Reports"];
  if (t.includes("ecomm"))   return ["Product Catalog", "Cart", "Order Tracking"];
  if (t.includes("salon"))   return ["Appointments", "Staff Tips", "Client History"];
  if (t.includes("web"))     return ["Responsive", "SEO Optimised", "CMS Included"];
  if (t.includes("mobile"))  return ["iOS & Android", "Push Alerts", "Offline Sync"];
  if (t.includes("market"))  return ["SEO & SEM", "Social Ads", "Analytics"];
  if (t.includes("crm"))     return ["Lead Pipeline", "Email Sync", "Task Follow-up"];
  return ["Custom Built", "Scalable", "24/7 Support"];
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

/** Two-layer gradient box (RN has no LinearGradient in core; this approximates it) */
function GradBox({ c1, c2, style, children }) {
  return (
    <View style={[style, { backgroundColor: c2, overflow: "hidden" }]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: c1, opacity: 0.65 }]} />
      {children}
    </View>
  );
}

/** Animated spinning refresh icon */
function SpinIcon({ spinning, color = C.blue }) {
  const anim = useRef(new Animated.Value(0)).current;
  const loop = useRef(null);
  useEffect(() => {
    if (spinning) {
      loop.current = Animated.loop(
        Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: true })
      );
      loop.current.start();
    } else { loop.current?.stop(); anim.setValue(0); }
    return () => loop.current?.stop();
  }, [spinning]);
  const rotate = anim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <CustomIcon name="sync-alt" size={15} color={color} />
    </Animated.View>
  );
}

/** Shimmer skeleton for grid cards shown during first load */
function SkeletonCard() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ])).start();
  }, []);
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.75] });
  return (
    <Animated.View style={[S.skCard, { opacity }]}>
      <View style={S.skImg} />
      <View style={S.skBody}>
        <View style={S.skBadge} />
        <View style={S.skLine} />
        <View style={[S.skLine, { width: "58%" }]} />
      </View>
    </Animated.View>
  );
}

// ─── POPULAR SLIDER ──────────────────────────────────────────────────────────
/**
 * Horizontal auto-scrolling carousel showing featured products.
 * Each card displays: type badge, category label, product name,
 * 3 feature pills, a "View Details" CTA, and product image/emoji.
 */
function PopularSlider({ allData, navigation }) {
  const products = useMemo(() => {
    const FEATURED_KW = ["erp", "hr", "payroll", "restaur"];
    const featured = allData.filter(i =>
      i.type === "Products" &&
      FEATURED_KW.some(kw => i.displayTitle?.toLowerCase().includes(kw))
    );
    return featured.length ? featured : allData.filter(i => i.type === "Products");
  }, [allData]);

  const [activeIdx, setActiveIdx]  = useState(0);
  const flatRef      = useRef(null);
  const timerRef     = useRef(null);
  const activeIdxRef = useRef(0);   // always-current ref — avoids stale closure in timer

  const CARD_W = SLIDE_W - 36;

  const goTo = useCallback((idx) => {
    const target = Math.max(0, Math.min(idx, products.length - 1));
    flatRef.current?.scrollToIndex({ index: target, animated: true });
    activeIdxRef.current = target;
    setActiveIdx(target);
  }, [products.length]);

  const startAuto = useCallback(() => {
    clearInterval(timerRef.current);
    if (products.length <= 1) return;
    timerRef.current = setInterval(() => {
      const next = (activeIdxRef.current + 1) % products.length;
      goTo(next);
    }, 3500);
  }, [goTo, products.length]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, [startAuto]);

  useEffect(() => {
    activeIdxRef.current = 0;
    setActiveIdx(0);
  }, [products.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      activeIdxRef.current = idx;
      setActiveIdx(idx);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

  // ── Enriched slide card ────────────────────────────────────────────────────
  const renderSlide = useCallback(({ item }) => {
    const [c1, c2]  = getBg(item.displayTitle, true);
    const emoji     = getEmoji(item.displayTitle);
    const category  = getCategory(item.displayTitle);
    const features  = getFeatures(item.displayTitle);

    return (
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={() => navigation.navigate("ProductDetails", { product: item })}
        style={{ width: CARD_W, marginHorizontal: 18 }}
      >
        <GradBox c1={c1} c2={c2} style={S.slideCard}>

          {/* Decorative rings */}
          <View style={S.sRing1} />
          <View style={S.sRing2} />

          {/* LEFT — all text content */}
          <View style={S.slideLeft}>

            {/* Type badge + category */}
            <View style={S.slideTopRow}>
              <View style={S.slideBadge}>
                <Text style={S.slideBadgeTxt}>PRODUCT</Text>
              </View>
              <Text style={S.slideCategoryTxt} numberOfLines={1}>{category}</Text>
            </View>

            {/* Product name */}
            <Text style={S.slideName} numberOfLines={2}>{item.displayTitle}</Text>

            {/* Feature pills */}
            <View style={S.slideFeatureRow}>
              {features.slice(0, 3).map((feat, i) => (
                <View key={i} style={S.slideFeaturePill}>
                  <Text style={S.slideFeatureTxt}>{feat}</Text>
                </View>
              ))}
            </View>

          

          </View>

          {/* RIGHT — image or emoji */}
          <View style={S.slideRight}>
            <View style={S.slideIconBox}>
              {item.displayImage ? (
                <Image
                  source={{ uri: `${BASE_URL}${item.displayImage}` }}
                  style={S.slideImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={S.slideEmoji}>{emoji}</Text>
              )}
            </View>
            <Text style={S.slideNudge}>Tap to{"\n"}explore</Text>
          </View>

        </GradBox>
      </TouchableOpacity>
    );
  }, [navigation, CARD_W]);

  if (!products.length) return null;

  return (
    <View style={S.sliderSection}>
      <Text style={S.sliderTitle}>Popular Products</Text>
      <FlatList
        ref={flatRef}
        data={products}
        renderItem={renderSlide}
        keyExtractor={item => item.uniqueKey}
        horizontal
        pagingEnabled={false}             // intentionally absent — conflicts with snapToInterval
        snapToInterval={CARD_W + 36}      // snap exactly one card per swipe
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({   // required for scrollToIndex without layout measurement
          length: CARD_W + 36,
          offset: (CARD_W + 36) * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollBeginDrag={() => clearInterval(timerRef.current)}  // pause on manual drag
        onMomentumScrollEnd={startAuto}                            // resume after swipe settles
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingRight: 18 }}
      />
      {/* Dot pagination */}
      <View style={S.dotsRow}>
        {products.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => { clearInterval(timerRef.current); goTo(i); startAuto(); }}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          >
            <View style={[S.dot, {
              width:           i === activeIdx ? 20 : 6,
              backgroundColor: i === activeIdx ? C.blue : "#C5D0E8",
            }]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab]   = useState("All");
  const fadeIn = useRef(new Animated.Value(0)).current;

  const { allData, loading, fetchHomeData, blogs } = useStore();
  useNetworkCheck();

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  useEffect(() => { fetchHomeData(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHomeData();
    setRefreshing(false);
  }, [fetchHomeData]);

  const filteredItems = useMemo(() => {
    let d = allData;
    if (searchQuery.trim())
      return d.filter(i =>
        i.displayTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (activeTab !== "All") d = d.filter(i => i.type === activeTab);
    return d;
  }, [searchQuery, activeTab, allData]);

  const goItem = (item) =>
    navigation.navigate(
      item.type === "Products" ? "ProductDetails" : "ServiceDetails",
      { [item.type === "Products" ? "product" : "service"]: item }
    );

  // ── SEARCH BAR (fixed, never scrolls) ───────────────────────────────────
  const renderFixedSearch = () => (
    <View style={S.fixedSearch}>
      <View style={S.searchBar}>
        <CustomIcon name="search" size={16} color={C.ink5} />
        <TextInput
          style={S.searchInput}
          placeholder="Search ERP, HRM, POS, Web Dev..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={C.ink5}
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity onPress={() => setSearchQuery("")} style={S.searchBtn}>
            <CustomIcon name="times-circle" size={16} color={C.ink5} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onRefresh} style={S.searchBtn} disabled={refreshing}>
            <SpinIcon spinning={refreshing} color={C.blue} />
          </TouchableOpacity>
        )}
        <View style={S.searchDivider} />
        <TouchableOpacity style={S.searchBtn}>
          <CustomIcon name="sliders-h" size={15} color={C.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // ── HERO ────────────────────────────────────────────────────────────────
  const renderTopHeader = () => (
    <Animated.View style={[S.hero, { opacity: fadeIn }]}>
      <View style={S.heroTop}>
        <View style={S.heroBrandRow}>
          <View style={S.heroBrandDot} />
          <Text style={S.heroBrandLabel}>ORBIT MEDIA SOLUTIONS</Text>
        </View>
        <Text style={S.heroHeadline}>
          Empowering Brands with{"\n"}
          <Text style={S.heroHeadlineAccent}>Digital Innovation</Text>
        </Text>
        <Text style={S.heroSub}>
          Web & Apps · ERP & CRM · SEO · Digital Marketing — helping businesses innovate, grow & succeed since 2018.
        </Text>
      </View>

      {/* Book consultation CTA banner */}
      <TouchableOpacity
        style={S.bookBanner}
        onPress={() => navigation.navigate("Form")}
        activeOpacity={0.88}
      >
        <View style={S.bbGlow1} /><View style={S.bbGlow2} />
        <View style={S.bbIconBox}>
          <CustomIcon name="calendar-check" size={20} color="#fff" />
        </View>
        <View style={S.bbTextBox}>
          <Text style={S.bbTitle}>Book a Free Consultation</Text>
          <Text style={S.bbSub}>Tell us your needs · We handle the rest</Text>
        </View>
        <View style={S.bbArrow}>
          <CustomIcon name="arrow-right" size={14} color="rgba(255,255,255,0.8)" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  // ── QUICK ACCESS ────────────────────────────────────────────────────────
  const renderQuickAccess = () => (
    <View style={S.qaSec}>
      <Text style={S.qaTitle}>Quick Access</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={S.qaRow}
      >
        {allData.map((item) => {
          const isProd = item.type === "Products";
          const [c1, c2] = getBg(item.displayTitle, isProd);
          const emoji = getEmoji(item.displayTitle);
          const shortLabel = item.displayTitle?.split(" ").slice(0, 2).join(" ") || "";
          const abbr = item.displayTitle?.split(" ")[0]?.slice(0, 6).toUpperCase() || "";
          return (
            <TouchableOpacity
              key={item.uniqueKey}
              style={S.qaItem}
              onPress={() => goItem(item)}
              activeOpacity={0.78}
            >
              <View style={S.qaImgWrap}>
                <GradBox c1={c1} c2={c2} style={S.qaImg}>
                  <Text style={S.qaEmoji}>{emoji}</Text>
                  <Text style={S.qaAbbr}>{abbr}</Text>
                </GradBox>
              </View>
              <Text style={S.qaLabel} numberOfLines={1}>{shortLabel}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  // ── STATS STRIP ─────────────────────────────────────────────────────────
  const renderStats = () => {
    const productCount = allData.filter(i => i.type === "Products").length;
    const serviceCount = allData.filter(i => i.type === "Services").length;
    const stats = [
      { v: productCount ? `${productCount}+` : "—", l: "Products" },
      { v: serviceCount ? `${serviceCount}+` : "—", l: "Services" },
      { v: "24/7", l: "Support" },
      { v: "200+", l: "Clients" },
    ];
    return (
      <View style={S.stats}>
        {stats.map((s, i, a) => (
          <View key={s.l} style={[S.statItem, i < a.length - 1 && S.statDivider]}>
            <Text style={S.statVal}>{s.v}</Text>
            <Text style={S.statLbl}>{s.l}</Text>
          </View>
        ))}
      </View>
    );
  };

  // ── FEATURED GRID CARD (enriched with category + feature pills) ──────────
  const renderCard = ({ item }) => {
    const isProd   = item.type === "Products";
    const [c1, c2] = getBg(item.displayTitle, isProd);
    const features = getFeatures(item.displayTitle);
    const category = getCategory(item.displayTitle);

    return (
      <TouchableOpacity style={S.featCard} onPress={() => goItem(item)} activeOpacity={0.85}>

        {/* Gradient image banner */}
        <GradBox c1={c1} c2={c2} style={S.fcBanner}>
          {item.displayImage ? (
            <Image
              source={{ uri: `${BASE_URL}${item.displayImage}` }}
              style={[StyleSheet.absoluteFill, { opacity: 0.50 }]}
              resizeMode="cover"
            />
          ) : null}
          {/* Type pill top-left */}
          <View style={S.fcPill}>
            <Text style={S.fcPillTxt}>{isProd ? "PRODUCT" : "SERVICE"}</Text>
          </View>
          {/* Emoji bottom-right */}
          <Text style={S.fcEmoji}>{getEmoji(item.displayTitle)}</Text>
        </GradBox>

        {/* Text body */}
        <View style={S.fcBody}>
          {/* Category label */}
          <Text style={S.fcCategory} numberOfLines={1}>{category}</Text>
          {/* Product/service name */}
          <Text style={S.fcName} numberOfLines={2}>{item.displayTitle}</Text>
          {/* Top 2 feature tags */}
          <View style={S.fcFeatureRow}>
            {features.slice(0, 2).map((feat, i) => (
              <View key={i} style={S.fcFeaturePill}>
                <Text style={S.fcFeatureTxt}>{feat}</Text>
              </View>
            ))}
          </View>
          {/* Footer: type label + arrow */}
          <View style={S.fcFooter}>
            <Text style={S.fcType}>{isProd ? "Product" : "Service"}</Text>
            <View style={S.fcArrow}>
              <CustomIcon name="arrow-right" size={9} color={C.white} />
            </View>
          </View>
        </View>

      </TouchableOpacity>
    );
  };

  // ── BLOG / INSIGHT CARD ─────────────────────────────────────────────────
  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={S.insCard}
      onPress={() => navigation.navigate("BlogDetails", { blog: item })}
      activeOpacity={0.85}
    >
      <View style={S.insThumb}>
        <Image source={{ uri: `${BASE_URL}${item.displayImage}` }}
          style={StyleSheet.absoluteFill} resizeMode="cover" />
        <View style={S.insOverlay} />
      </View>
      <View style={S.insBody}>
        <Text style={S.insCat}>INSIGHT</Text>
        <Text style={S.insName} numberOfLines={3}>{item.displayTitle}</Text>
        <Text style={S.insMore}>Read More →</Text>
      </View>
    </TouchableOpacity>
  );

  // ── FLATLIST HEADER ─────────────────────────────────────────────────────
  const renderListHeader = () => (
    <View>
      {searchQuery ? (
        <Text style={[S.sectionTitle, { marginTop: 16, marginBottom: 4 }]}>Search Results</Text>
      ) : (
        <>
          {renderTopHeader()}
          {renderQuickAccess()}
          {renderStats()}
          <PopularSlider allData={allData} navigation={navigation} />
          <View style={{ marginTop: 20 }}>
            <Text style={S.sectionTitle}>Featured Solutions</Text>
            <View style={S.tabRow}>
              {["All", "Products", "Services"].map(tab => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[S.tabBtn, activeTab === tab && S.tabBtnOn]}
                >
                  <Text style={[S.tabTxt, activeTab === tab && S.tabTxtOn]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );

  // ── FLATLIST FOOTER ─────────────────────────────────────────────────────
  const renderListFooter = () => {
    if (searchQuery || blogs.length === 0) return <View style={{ height: 100 }} />;
    return (
      <View style={{ marginTop: 4, paddingBottom: 110 }}>
        <View style={S.insightRow}>
          <Text style={S.sectionTitle}>Latest Insights</Text>
          <Text style={S.insightSeeAll} onPress={() => navigation.navigate("Blogs")}>See All</Text>
        </View>
        <FlatList
          data={blogs}
          horizontal
          renderItem={renderBlogItem}
          keyExtractor={b => `ins-${b.id}`}
          contentContainerStyle={{ paddingLeft: 18 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <View style={S.container}>

      {/* Fixed search bar — never scrolls */}
      {renderFixedSearch()}

      {/* Loading state: hero + skeletons */}
      {loading && allData.length === 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {renderTopHeader()}
          <View style={S.qaSec}>
            <View style={S.skSecLine} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.qaRow}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <View key={i} style={S.qaItem}>
                  <View style={[S.qaImgWrap, { backgroundColor: "#DDE4F0" }]} />
                  <View style={{ width: 44, height: 9, borderRadius: 4, backgroundColor: "#DDE4F0", marginTop: 7 }} />
                </View>
              ))}
            </ScrollView>
          </View>
          {renderStats()}
          <View style={S.sliderSection}>
            <View style={S.skSecLine} />
            <View style={S.slidePad}>
              <View style={[S.slideCard, { backgroundColor: "#DDE4F0" }]} />
            </View>
            <View style={S.dotsRow}>
              {[1, 2, 3].map(i => (
                <View key={i} style={[S.dot, { width: i === 1 ? 20 : 6, backgroundColor: "#DDE4F0" }]} />
              ))}
            </View>
          </View>
          <View style={{ marginTop: 20 }}><View style={S.skSecLine} /></View>
          <View style={S.skGrid}>
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderCard}
          keyExtractor={item => item.uniqueKey}
          extraData={[activeTab, searchQuery]}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          numColumns={2}
          keyboardShouldPersistTaps="handled"
          columnWrapperStyle={S.row}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[C.blue]}
              tintColor={C.blue}
            />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={S.emptyBox}>
              <CustomIcon name="search" size={34} color="#ccc" />
              <Text style={S.emptyTxt}>No matches found.</Text>
            </View>
          }
        />
      )}

      {/* WhatsApp floating action button */}
      <View style={S.fabGroup}>
        <TouchableOpacity
          style={[S.fab, S.fabWA]}
          onPress={() =>
            Linking.openURL("https://wa.me/447935390848").catch(() =>
              Alert.alert("Error", "Unable to open WhatsApp")
            )
          }
          activeOpacity={0.85}
        >
          <CustomIcon name="whatsapp" size={22} color="#fff" type="Brands" />
        </TouchableOpacity>
      </View>

      <Navbar />
      <Toast />
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },

  // ── FIXED SEARCH ────────────────────────────────────────────
  fixedSearch: {
    backgroundColor: C.white,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  searchBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: C.white, borderRadius: 14,
    paddingHorizontal: 14, height: 48,
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
    borderWidth: 1, borderColor: C.border,
  },
  searchInput: { flex: 1, fontSize: 13.5, color: C.ink3, fontWeight: "500" },
  searchBtn:   { padding: 4, justifyContent: "center", alignItems: "center" },
  searchDivider: { width: 1, height: 20, backgroundColor: "#E4E9F7" },

  // ── HERO ────────────────────────────────────────────────────
  hero: { paddingTop: 18, paddingHorizontal: 18, paddingBottom: 4 },
  heroTop: { marginBottom: 14 },
  heroBrandRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
  heroBrandDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.blue },
  heroBrandLabel: { fontSize: 10, fontWeight: "800", color: C.blue, letterSpacing: 1.2 },
  heroHeadline: {
    fontSize: 22, fontWeight: "900", color: C.blue,
    letterSpacing: -0.5, lineHeight: 30, marginBottom: 8,
  },
  heroHeadlineAccent: { color: C.blue },
  heroSub: { fontSize: 12.5, color: C.ink4, fontWeight: "500", lineHeight: 18 },

  // ── BOOK BANNER ─────────────────────────────────────────────
  bookBanner: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: C.blue, borderRadius: 16,
    paddingVertical: 14, paddingHorizontal: 16, overflow: "hidden",
    shadowColor: C.blue, shadowOpacity: 0.30, shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  bbGlow1: {
    position: "absolute", width: 90, height: 90, borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.07)", right: -18, top: -18,
  },
  bbGlow2: {
    position: "absolute", width: 60, height: 60, borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.04)", right: 28, bottom: -24,
  },
  bbIconBox: {
    width: 44, height: 44, borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center", alignItems: "center",
  },
  bbTextBox: { flex: 1 },
  bbTitle: { fontSize: 14, fontWeight: "800", color: "#fff", letterSpacing: -0.3, marginBottom: 2 },
  bbSub:   { fontSize: 11, color: "rgba(255,255,255,0.60)" },
  bbArrow: {
    width: 32, height: 32, borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.16)",
    justifyContent: "center", alignItems: "center",
  },

  // ── QUICK ACCESS ────────────────────────────────────────────
  qaSec:  { marginTop: 20 },
  qaTitle: {
    fontSize: 15, fontWeight: "800", color: C.ink,
    letterSpacing: -0.3, paddingHorizontal: 18, marginBottom: 12,
  },
  qaRow:    { paddingHorizontal: 18, gap: 12, paddingBottom: 6 },
  qaItem:   { alignItems: "center", width: 64 },
  qaImgWrap: {
    width: 54, height: 54, borderRadius: 14, overflow: "hidden",
    borderWidth: 2, borderColor: "#fff",
    shadowColor: "#000", shadowOpacity: 0.10, shadowRadius: 8, elevation: 3,
    marginBottom: 6,
  },
  qaImg:   { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  qaEmoji: { fontSize: 20, zIndex: 1 },
  qaAbbr:  {
    position: "absolute", bottom: 3, left: 0, right: 0,
    textAlign: "center", fontSize: 7.5, fontWeight: "900",
    color: "rgba(255,255,255,0.72)", letterSpacing: 0.5,
    textTransform: "uppercase", zIndex: 1,
  },
  qaLabel: { fontSize: 10, fontWeight: "600", color: C.ink3, textAlign: "center", lineHeight: 13 },

  // ── STATS STRIP ─────────────────────────────────────────────
  stats: {
    flexDirection: "row", marginHorizontal: 18, marginTop: 18,
    backgroundColor: C.white, borderRadius: 16, paddingVertical: 14,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
    borderWidth: 1, borderColor: C.border,
  },
  statItem:   { flex: 1, alignItems: "center" },
  statDivider:{ borderRightWidth: 1, borderRightColor: "#E4E9F7" },
  statVal:    { fontSize: 18, fontWeight: "900", color: C.blue, letterSpacing: -0.5, marginBottom: 2 },
  statLbl:    { fontSize: 10.5, fontWeight: "600", color: C.ink5, letterSpacing: 0.2 },

  // ── POPULAR SLIDER ──────────────────────────────────────────
  sliderSection: { marginTop: 20 },
  sliderTitle: {
    fontSize: 15, fontWeight: "800", color: C.ink,
    letterSpacing: -0.3, paddingHorizontal: 18, marginBottom: 12,
  },
  slidePad: { width: SLIDE_W, paddingHorizontal: 18 },

  // Card shell — taller than default to accommodate feature pills
  slideCard: {
    width: "100%", height: 172, borderRadius: 20,
    flexDirection: "row", alignItems: "stretch",
    paddingLeft: 18, paddingRight: 12, paddingVertical: 16,
    overflow: "hidden",
  },
  sRing1: {
    position: "absolute", width: 150, height: 150, borderRadius: 75,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.10)",
    right: -30, top: -45,
  },
  sRing2: {
    position: "absolute", width: 80, height: 80, borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.05)",
    right: 56, bottom: -30,
  },

  // Left column — text content
  slideLeft: { flex: 1, paddingRight: 10, justifyContent: "space-between", zIndex: 1 },

  // Type badge + category in one row
  slideTopRow: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 2 },
  slideBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2.5,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.22)",
  },
  slideBadgeTxt: {
    fontSize: 8, fontWeight: "900", letterSpacing: 0.8,
    color: "rgba(255,255,255,0.92)", textTransform: "uppercase",
  },
  slideCategoryTxt: {
    fontSize: 9.5, fontWeight: "600",
    color: "rgba(255,255,255,0.55)", flex: 1,
  },

  // Product name
  slideName: {
    fontSize: 17, fontWeight: "900", color: "#FFFFFF",
    letterSpacing: -0.4, lineHeight: 22, marginVertical: 6,
  },

  // Feature pills
  slideFeatureRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginBottom: 10 },
  slideFeaturePill: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.18)",
  },
  slideFeatureTxt: { fontSize: 9, fontWeight: "700", color: "rgba(255,255,255,0.80)" },

  // CTA button
  slideCTA: {
    flexDirection: "row", alignItems: "center", gap: 5,
    alignSelf: "flex-start", backgroundColor: "#FFFFFF",
    borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6,
    shadowColor: "#000", shadowOpacity: 0.10, shadowRadius: 5, elevation: 3,
  },
  slideCTATxt: { fontSize: 11, fontWeight: "800" },

  // Right column — image + nudge
  slideRight: { width: 82, alignItems: "center", justifyContent: "center", gap: 6, zIndex: 1 },
  slideIconBox: {
    width: 78, height: 78, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1.5, borderColor: "rgba(255,255,255,0.20)",
    justifyContent: "center", alignItems: "center", overflow: "hidden",
  },
  slideImage: { width: "100%", height: "100%", borderRadius: 18 },
  slideEmoji: { fontSize: 32 },
  slideNudge: {
    fontSize: 8.5, fontWeight: "600",
    color: "rgba(255,255,255,0.38)", textAlign: "center", lineHeight: 12,
  },

  // Dot indicators
  dotsRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 5, marginTop: 12,
  },
  dot: { height: 6, borderRadius: 3 },

  // ── SECTION TITLE ───────────────────────────────────────────
  sectionTitle: {
    fontSize: 15, fontWeight: "800", color: C.ink,
    letterSpacing: -0.3, paddingHorizontal: 18, marginBottom: 0,
  },

  // ── FILTER TABS ─────────────────────────────────────────────
  tabRow: { flexDirection: "row", gap: 8, paddingHorizontal: 18, marginTop: 12, marginBottom: 14 },
  tabBtn: {
    paddingHorizontal: 18, paddingVertical: 9, borderRadius: 100,
    borderWidth: 1.5, borderColor: "#E4E9F7",
  },
  tabBtnOn: {
    backgroundColor: C.navy, borderColor: C.navy,
    shadowColor: C.navy, shadowOpacity: 0.22, shadowRadius: 8, elevation: 3,
  },
  tabTxt:   { fontSize: 12.5, fontWeight: "700", color: C.ink3 },
  tabTxtOn: { color: "#fff" },

  // ── FEATURED GRID CARDS ─────────────────────────────────────
  row: { justifyContent: "space-between", paddingHorizontal: 18 },
  featCard: {
    width: "48%", marginBottom: 14,
    backgroundColor: C.white, borderRadius: 16, overflow: "hidden",
    borderWidth: 1, borderColor: C.border,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  fcBanner: { height: 100 },
  fcPill: {
    position: "absolute", top: 8, left: 9,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2.5,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
  },
  fcPillTxt: {
    fontSize: 8.5, fontWeight: "800", letterSpacing: 0.7,
    color: "rgba(255,255,255,0.92)", textTransform: "uppercase",
  },
  // Emoji placed bottom-right of banner
  fcEmoji: {
    position: "absolute", bottom: 7, right: 10,
    fontSize: 28, opacity: 0.75,
  },
  fcBody:    { padding: 11 },
  fcCategory:{ fontSize: 9, fontWeight: "700", letterSpacing: 0.5, color: C.ink5, marginBottom: 3, textTransform: "uppercase" },
  fcName:    { fontSize: 12.5, fontWeight: "800", color: C.ink, lineHeight: 17, letterSpacing: -0.1, marginBottom: 8 },

  // Mini feature pills inside grid card
  fcFeatureRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 8 },
  fcFeaturePill: {
    backgroundColor: C.bg, borderRadius: 20,
    paddingHorizontal: 7, paddingVertical: 2.5,
    borderWidth: 1, borderColor: "#E4E9F7",
  },
  fcFeatureTxt: { fontSize: 8.5, fontWeight: "700", color: C.ink3 },

  // Footer row: type label + arrow circle
  fcFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  fcType:   { fontSize: 9.5, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", color: C.blue },
  fcArrow:  {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: C.blue,
    justifyContent: "center", alignItems: "center",
  },

  // ── INSIGHT CARDS ───────────────────────────────────────────
  insCard: {
    width: 164, backgroundColor: C.white, borderRadius: 14,
    overflow: "hidden", borderWidth: 1, borderColor: C.border,
    marginRight: 12,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  insThumb:   { height: 94, backgroundColor: "#E0EAFF" },
  insOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(8,17,43,0.1)" },
  insBody:    { padding: 10 },
  insCat:     { fontSize: 9, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", color: C.blue, marginBottom: 4 },
  insName:    { fontSize: 11.5, fontWeight: "700", color: C.ink, lineHeight: 16, marginBottom: 8 },
  insMore:    { fontSize: 11, fontWeight: "700", color: C.blue },
  insightRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 6, marginBottom: 12,
  },
  insightSeeAll: { fontSize: 13, fontWeight: "700", color: C.blue, marginRight: 25 },

  // ── SKELETON ────────────────────────────────────────────────
  skGrid: {
    flexDirection: "row", flexWrap: "wrap",
    justifyContent: "space-between", paddingHorizontal: 18, marginTop: 4,
  },
  skCard:    { width: "48%", marginBottom: 14, borderRadius: 16, backgroundColor: "#E2E8F4", overflow: "hidden" },
  skImg:     { width: "100%", height: 100, backgroundColor: "#CDD5E4" },
  skBody:    { padding: 11, gap: 7 },
  skBadge:   { width: 52, height: 14, borderRadius: 5, backgroundColor: "#CDD5E4" },
  skLine:    { width: "88%", height: 11, borderRadius: 5, backgroundColor: "#CDD5E4" },
  skSecLine: { width: 120, height: 14, borderRadius: 6, backgroundColor: "#DDE4F0", marginLeft: 18, marginBottom: 12 },

  // ── EMPTY STATE ─────────────────────────────────────────────
  emptyBox: { alignItems: "center", paddingTop: 48, gap: 10 },
  emptyTxt: { textAlign: "center", color: "#A8B8D8", fontSize: 14, fontWeight: "600" },

  // ── FLOATING ACTION BUTTONS ─────────────────────────────────
  fabGroup: { position: "absolute", bottom: 90, right: 18, alignItems: "flex-end", gap: 10 },
  fab: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingVertical: 13,
    borderRadius: 30, backgroundColor: C.navy,
    shadowColor: C.navy, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  fabWA: {
    backgroundColor: "#25D366",
    width: 50, height: 50, borderRadius: 25,
    paddingHorizontal: 0, justifyContent: "center", alignItems: "center",
  },
  fabTxt: { color: "#fff", fontWeight: "800", marginLeft: 8, fontSize: 13 },
});