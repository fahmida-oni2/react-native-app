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
// // const SERVICES_PILLS = [
// //   { icon: "layer-group", label: "ERP Systems" },
// //   { icon: "concierge-bell", label: "Web Development" },
// //   { icon: "tasks", label: "POS Solutions" },
// //   { icon: "code", label: "Mobile Apps" },
// // ];

// // export default function Home({ navigation }) {
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [activeTab, setActiveTab] = useState("All");
// //   const [userName, setUserName] = useState("Guest");
// //   const BASE_URL = "https://orbitmediasolutions.com/";
// //   const fadeAnim = useState(new Animated.Value(0))[0];

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
// //           item.displayTitle
// //             ?.toLowerCase()
// //             .includes(searchQuery.toLowerCase()) ||
// //           item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
// //       );
// //     }
// //     if (activeTab !== "All") {
// //       data = data.filter((item) => item.type === activeTab);
// //     }
// //     return data;
// //   }, [searchQuery, activeTab, allData]);

// //   const handleEmergencyCall = () => {
// //     const phoneNumber = "tel:00447935390848";
// //     Linking.canOpenURL(phoneNumber).then((supported) => {
// //       if (supported) Linking.openURL(phoneNumber);
// //       else Alert.alert("Error", "Phone calls not supported");
// //     });
// //   };

// //   const getHeroIcon = (title, type) => {
// //     const t = title.toLowerCase();
// //     if (t.includes("erp") || t.includes("management")) return "layer-group";
// //     if (t.includes("pos") || t.includes("shop")) return "layer-group";
// //     if (t.includes("app") || t.includes("mobile")) return "concierge-bell";
// //     return type === "Products" ? "layer-group" : "concierge-bell";
// //   };


// //     // ─── HERO SECTION ───────────────────────────────────────────
// //   const renderHero = () => (
// //     <Animated.View style={[styles.hero, { opacity: fadeAnim }]}>
// //       {/* Top bar: greeting + avatar */}
// //       <View style={styles.heroTopBar}>
// //         <View>
// //           <Text style={styles.heroGreeting}>Hello, {userName} 👋</Text>
// //           <Text style={styles.heroDate}>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</Text>
// //         </View>
// //         <TouchableOpacity
// //           style={styles.avatarBtn}
// //           onPress={() => navigation.navigate("Profile")}
// //         >
// //           <CustomIcon name="user-circle" size={32} color="#fff" />
// //         </TouchableOpacity>
// //       </View>

// //       {/* Headline */}
// //       <View style={styles.heroHeadline}>
// //         <Text style={styles.heroTitle}>Smart Business{"\n"}Solutions for You</Text>
// //         <Text style={styles.heroSub}>
// //           Orbit Media delivers cutting-edge ERP, POS, web & mobile solutions — built to scale your business.
// //         </Text>
// //       </View>

// //       {/* What we offer pills */}
// //       <ScrollView
// //         horizontal
// //         showsHorizontalScrollIndicator={false}
// //         contentContainerStyle={styles.pillsRow}
// //       >
// //         {SERVICES_PILLS.map((pill, i) => (
// //           <View key={i} style={styles.pill}>
// //             <CustomIcon name={pill.icon} size={13} color="#fff" />
// //             <Text style={styles.pillText}>{pill.label}</Text>
// //           </View>
// //         ))}
// //       </ScrollView>

// //     </Animated.View>
// //   );

// //   // ─── STATS STRIP ────────────────────────────────────────────
// //   const renderStats = () => (
// //     <View style={styles.statsStrip}>
// //       {[
// //         { value: "10+", label: "Products" },
// //         { value: "20+", label: "Services" },
// //         { value: "24/7", label: "Support" },
// //         { value: "100%", label: "Reliable" },
// //       ].map((stat, i) => (
// //         <View key={i} style={[styles.statItem, i < 3 && styles.statBorder]}>
// //           <Text style={styles.statValue}>{stat.value}</Text>
// //           <Text style={styles.statLabel}>{stat.label}</Text>
// //         </View>
// //       ))}
// //     </View>
// //   );
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


// //   const renderHeader = () => (
// //     <View>
// //       {renderHero()}
// //       {renderStats()}
// //        {!searchQuery && (
// //         <>
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
// //                       item.type === "Products"
// //                         ? "ProductDetails"
// //                         : "ServiceDetails",
// //                       {
// //                         [item.type === "Products" ? "product" : "service"]:
// //                           item,
// //                       },
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

// //       {loading && allData.length === 0 ? (
// //         <View style={styles.loaderContainer}>
// //           {renderHero()}
// //           <View style={styles.loaderInner}>
// //             <ActivityIndicator size="large" color="#1A3067" />
// //             <Text style={styles.loadingText}>Loading solutions...</Text>
// //           </View>
// //         </View>
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
// //           ListEmptyComponent={
// //             <Text style={styles.emptyText}>No matches found.</Text>
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
// //   container: { flex: 1, backgroundColor: "#fff" },
// //    loaderContainer: { flex: 1 },
// //   loaderInner: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
// //   loadingText: { color: "#1A3067", fontSize: 14, fontWeight: "600" },

// //   // ── HERO ──────────────────────────────────────────────────────
// //   hero: {
// //     backgroundColor: "#1A3067",
// //     paddingTop: 52,
// //     paddingBottom: 28,
// //     paddingHorizontal: 22,
// //     borderBottomLeftRadius: 28,
// //     borderBottomRightRadius: 28,
// //   },
// //   heroTopBar: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 24,
// //   },
// //   heroGreeting: { color: "#fff", fontSize: 18, fontWeight: "700" },
// //   heroDate: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 },
// //   avatarBtn: {
// //     width: 44,
// //     height: 44,
// //     borderRadius: 22,
// //     backgroundColor: "rgba(255,255,255,0.12)",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderWidth: 1,
// //     borderColor: "rgba(255,255,255,0.2)",
// //   },
// //   heroHeadline: { marginBottom: 20 },
// //   heroTitle: {
// //     color: "#fff",
// //     fontSize: 26,
// //     fontWeight: "800",
// //     lineHeight: 34,
// //     marginBottom: 10,
// //   },
// //   heroSub: {
// //     color: "rgba(255,255,255,0.7)",
// //     fontSize: 13,
// //     lineHeight: 20,
// //   },
// //   pillsRow: { paddingRight: 10, marginBottom: 18, gap: 8 },
// //   pill: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "rgba(255,255,255,0.12)",
// //     borderRadius: 20,
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     gap: 6,
// //     borderWidth: 1,
// //     borderColor: "rgba(255,255,255,0.15)",
// //   },
// //   pillText: { color: "#fff", fontSize: 11, fontWeight: "600" },
// //   welcomeSection: { padding: 20, backgroundColor: "#fff", zIndex: 10 },
// //   greetingText: { fontSize: 24, fontWeight: "bold", color: "#1A3067" },
// //   subGreeting: { fontSize: 14, color: "#666", marginTop: 4 },
// //     statsStrip: {
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

// //   searchBarContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#f0f0f0",
// //     borderRadius: 12,
// //     paddingHorizontal: 15,
// //     marginTop: 15,
// //     height: 50,
// //   },
// //   searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "black" },
// //   filterContainer: {
// //     flexDirection: "row",
// //     paddingHorizontal: 20,
// //     marginVertical: 15,
// //   },
// //   filterBtn: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     backgroundColor: "#e8e8e8",
// //     marginRight: 10,
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   filterBtnActive: { backgroundColor: "#1A3067", borderColor: "#1A3067" },
// //   filterText: { color: "#1A3067", fontWeight: "bold", fontSize: 12 },
// //   filterTextActive: { color: "#fff" },
// //   quickAccessWrapper: { marginTop: 10 },
// //   miniSectionTitle: {
// //     fontSize: 13,
// //     fontWeight: "bold",
// //     color: "#1A3067",
// //     marginLeft: 20,
// //     marginBottom: 10,
// //     textTransform: "uppercase",
// //   },
// //   quickAccessContainer: { paddingLeft: 20 },
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
// //   blogReadMore: {
// //     fontSize: 10,
// //     color: "#1A3067",
// //     marginTop: 4,
// //     fontWeight: "bold",
// //   },
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
// //   emptyText: {
// //     textAlign: "center",
// //     marginTop: 40,
// //     color: "#999",
// //     fontSize: 14,
// //   },
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
// //   stickyBtnText: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //     marginLeft: 8,
// //     fontSize: 13,
// //   },
// // });


// import React, { useCallback, useState, useEffect, useMemo } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
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

// // ─── SKELETON QUICK ACCESS ───────────────────────────────────
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

// export default function Home({ navigation }) {
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [userName, setUserName] = useState("Guest");
//   const fadeAnim = useState(new Animated.Value(1))[0];

//   const { allData, loading, fetchHomeData, blogs } = useStore();
//   useNetworkCheck();

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       setUserName(auth.currentUser?.displayName || "Guest");
//     });
//     return unsubscribe;
//   }, [navigation]);

//   useEffect(() => {
//     fetchHomeData();
//   }, []);

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
//     if (activeTab !== "All") {
//       data = data.filter((item) => item.type === activeTab);
//     }
//     return data;
//   }, [searchQuery, activeTab, allData]);


// const handleEmergencyCall = () => {
//   const whatsappURL = "https://wa.me/447935390848";
//   Linking.openURL(whatsappURL).catch(() => {
//     Alert.alert("Error", "Unable to open WhatsApp");
//   });
// };
//   const getHeroIcon = (title, type) => {
//     const t = title.toLowerCase();
//     if (t.includes("erp") || t.includes("management")) return "layer-group";
//     if (t.includes("pos") || t.includes("shop")) return "layer-group";
//     if (t.includes("app") || t.includes("mobile")) return "concierge-bell";
//     return type === "Products" ? "layer-group" : "concierge-bell";
//   };

//   // ─── HERO ────────────────────────────────────────────────────

// const renderHero = () => (
//   <Animated.View style={[styles.heroWrapper, { opacity: fadeAnim }]}>
//     <View style={styles.heroAccentCircle1} />
//     <View style={styles.heroAccentCircle2} />

//     {/* Brand + greeting row */}
//     <View style={styles.heroTopRow}>
//       <View style={styles.heroBrandBadge}>
//         <CustomIcon name="globe" size={10} color="#7EB3FF" />
//         <Text style={styles.heroBrandText}>ORBIT MEDIA SOLUTIONS</Text>
//       </View>
//       <Text style={styles.heroGreeting}>Hi, {userName} 👋</Text>
//     </View>

//     {/* Core value proposition */}
//    <Text style={styles.heroTitle}>
//   Smarter Solutions{"\n"}
//   <Text style={styles.heroTitleAccent}>Built for Your Business</Text>
// </Text>
// <Text style={styles.heroSub}>
//   ERP, POS, web & mobile — Orbit delivers the technology your business needs to grow, manage, and scale.
// </Text>

//     {/* Action chips */}
//     <View style={styles.heroChips}>
//       {[
//         { icon: "boxes",          label: "View Products" },
//         { icon: "concierge-bell", label: "Get Services"  },
//         { icon: "calendar-check", label: "Book a Call"   },
//       ].map((chip, i) => (
//         <View key={i} style={styles.heroChip}>
//           <CustomIcon name={chip.icon} size={11} color="#7EB3FF" />
//           <Text style={styles.heroChipText}>{chip.label}</Text>
//         </View>
//       ))}
//     </View>
//   </Animated.View>
// );

//   // ─── SKELETON LOADING VIEW ───────────────────────────────────
//   const renderSkeleton = () => (
//     <View style={{ flex: 1 }}>
//       {/* Quick Access skeleton */}
//       <View style={styles.quickAccessWrapper}>
//         <View style={styles.skeletonSectionTitle} />
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAccessContainer}>
//           {[1, 2, 3, 4, 5].map((i) => <SkeletonQuickItem key={i} />)}
//         </ScrollView>
//       </View>

//       {/* Featured Solutions skeleton header */}
//       <View style={styles.sectionHeaderRow}>
//         <View style={styles.skeletonSectionTitle} />
//       </View>

//       {/* Filter tabs skeleton */}
//       <View style={styles.filterContainer}>
//         {[1, 2, 3].map((i) => (
//           <View key={i} style={styles.skeletonFilterBtn} />
//         ))}
//       </View>

//       {/* Cards grid skeleton */}
//       <View style={styles.skeletonGrid}>
//         {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
//       </View>
//     </View>
//   );

//   // ─── BLOG CARD ───────────────────────────────────────────────
//   const renderBlogItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.blogCard}
//       onPress={() => navigation.navigate("BlogDetails", { blog: item })}
//     >
//       <Image
//         source={{ uri: `${BASE_URL}${item.displayImage}` }}
//         style={styles.blogImage}
//         resizeMode="cover"
//       />
//       <View style={styles.blogInfo}>
//         <Text style={styles.blogTitle} numberOfLines={2}>
//           {item.displayTitle}
//         </Text>
//         <Text style={styles.blogReadMore}>Read Post →</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // ─── PRODUCT CARD ────────────────────────────────────────────
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
//       <Image
//         source={{ uri: `${BASE_URL}${item.displayImage}` }}
//         style={styles.cardImage}
//       />
//       <View style={styles.cardInfo}>
//         <View
//           style={[
//             styles.typeBadge,
//             {
//               backgroundColor: item.type === "Products" ? "#6200EE" : "#03DAC6",
//             },
//           ]}
//         >
//           <Text style={styles.typeText}>
//             {item.type === "Products" ? "PRODUCT" : "SERVICE"}
//           </Text>
//         </View>
//         <Text style={styles.cardTitle} numberOfLines={1}>
//           {item.displayTitle}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // ─── LIST HEADER ─────────────────────────────────────────────
//   const renderHeader = () => (
//     <View>
//       {!searchQuery && (
//         <>
//           {renderHero()}
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
//                   <View
//                     style={[
//                       styles.miniIconCircle,
//                       {
//                         backgroundColor:
//                           item.type === "Products" ? "#F0F3FF" : "#F8F0FF",
//                       },
//                     ]}
//                   >
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
//                 style={[
//                   styles.filterBtn,
//                   activeTab === tab && styles.filterBtnActive,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.filterText,
//                     activeTab === tab && styles.filterTextActive,
//                   ]}
//                 >
//                   {tab}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </>
//       )}

//       {searchQuery ? (
//         <View style={styles.sectionHeaderRow}>
//           <Text style={styles.sectionTitle}>Search Results</Text>
//         </View>
//       ) : null}
//     </View>
//   );

//   // ─── LIST FOOTER ─────────────────────────────────────────────
//   const renderFooter = () => {
//     if (searchQuery || blogs.length === 0)
//       return <View style={{ height: 100 }} />;
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
//       {/* Fixed search bar — always visible, position never changes */}
//       <View style={styles.welcomeSection}>
//         <View style={styles.searchBarContainer}>
//           <CustomIcon name="search" size={18} color="#999" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for ERP, POS, or Web Dev..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#999"
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery("")}>
//               <CustomIcon name="times-circle" size={18} color="#ccc" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>


//       {/* Loading state: show hero + stats + skeleton */}
//       {loading && allData.length === 0 ? (
//         <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//           {renderHero()}
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
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           contentContainerStyle={{ paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyBox}>
//               <CustomIcon name="search" size={32} color="#ccc" />
//               <Text style={styles.emptyText}>No matches found.</Text>
//             </View>
//           }
//         />
//       )}

//       {/* Floating Buttons */}
//       <View style={styles.floatingGroup}>
//         <TouchableOpacity
//           style={[styles.stickyBtn, styles.supportSticky]}
//           onPress={handleEmergencyCall}
//         >
//           <CustomIcon name="phone-alt" size={18} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.stickyBtn}
//           onPress={() => navigation.navigate("Form")}
//         >
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
//   container: { flex: 1, backgroundColor: '#ffffff' },
//   loaderContainer: { flex: 1 },

//   // ── SEARCH BAR (fixed top, position unchanged) ────────────────
//   welcomeSection: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     backgroundColor: '#ffffff',
//     zIndex: 10,
//   },
//   searchBarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     height: 48,
//     gap: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#eef0f5",
//   },
//   searchInput: { flex: 1, fontSize: 14, color: "#1A3067" },

//   // ── HERO ─────────────────────────────────────────────────────
//   // ── HERO ─────────────────────────────────────────────────────
// heroWrapper: {
//   backgroundColor: "#0F1E45",
//   paddingTop: 18,
//   paddingBottom: 20,
//   paddingHorizontal: 20,
//   borderBottomLeftRadius: 24,
//   borderBottomRightRadius: 24,
//   overflow: "hidden",
// },
// heroAccentCircle1: {
//   position: "absolute",
//   width: 160,
//   height: 160,
//   borderRadius: 80,
//   borderWidth: 1,
//   borderColor: "rgba(255,255,255,0.05)",
//   top: -55,
//   right: -55,
// },
// heroAccentCircle2: {
//   position: "absolute",
//   width: 90,
//   height: 90,
//   borderRadius: 45,
//   backgroundColor: "rgba(30,80,180,0.28)",
//   top: -20,
//   right: -10,
// },
// heroTopRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: 14,
// },
// heroBrandBadge: {
//   flexDirection: "row",
//   alignItems: "center",
//   backgroundColor: "rgba(255,255,255,0.07)",
//   borderRadius: 14,
//   paddingHorizontal: 9,
//   paddingVertical: 4,
//   gap: 5,
//   borderWidth: 1,
//   borderColor: "rgba(126,179,255,0.25)",
// },
// heroBrandText: {
//   color: "#7EB3FF",
//   fontSize: 9,
//   fontWeight: "800",
//   letterSpacing: 0.8,
// },
// heroGreeting: {
//   color: "rgba(255,255,255,0.5)",
//   fontSize: 12,
//   fontWeight: "500",
// },
// heroTitle: {
//   color: "#fff",
//   fontSize: 22,
//   fontWeight: "800",
//   lineHeight: 30,
//   letterSpacing: -0.4,
//   marginBottom: 8,
// },
// heroTitleAccent: {
//   color: "#7EB3FF",
// },
// heroSub: {
//   color: "rgba(255,255,255,0.55)",
//   fontSize: 12,
//   lineHeight: 18,
//   marginBottom: 16,
// },
// heroChips: {
//   flexDirection: "row",
//   gap: 8,
//   flexWrap: "wrap",
// },
// heroChip: {
//   flexDirection: "row",
//   alignItems: "center",
//   gap: 5,
//   backgroundColor: "rgba(255,255,255,0.07)",
//   borderRadius: 20,
//   paddingHorizontal: 10,
//   paddingVertical: 5,
//   borderWidth: 1,
//   borderColor: "rgba(255,255,255,0.1)",
// },
// heroChipText: {
//   color: "rgba(255,255,255,0.75)",
//   fontSize: 11,
//   fontWeight: "600",
// },
//   // ── STATS ─────────────────────────────────────────────────────
//   statsStrip: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 16,
//     paddingVertical: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   statItem: { flex: 1, alignItems: "center" },
//   statBorder: { borderRightWidth: 1, borderRightColor: "#f0f0f0" },
//   statValue: { fontSize: 18, fontWeight: "800", color: "#1A3067" },
//   statLabel: { fontSize: 11, color: "#9ca3af", marginTop: 2 },

//   // ── QUICK ACCESS ─────────────────────────────────────────────
//   quickAccessWrapper: { marginTop: 16 },
//   miniSectionTitle: {
//     fontSize: 13,
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
//   skeletonImage: {
//     width: "100%",
//     height: 100,
//     backgroundColor: "#cdd3e0",
//   },
//   skeletonBody: { padding: 10, gap: 7 },
//   skeletonBadge: {
//     width: 55,
//     height: 16,
//     borderRadius: 6,
//     backgroundColor: "#cdd3e0",
//   },
//   skeletonTitle: {
//     width: "90%",
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: "#cdd3e0",
//   },
//   skeletonTitleShort: {
//     width: "60%",
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: "#cdd3e0",
//   },
//   skeletonQuickItem: {
//     alignItems: "center",
//     marginRight: 15,
//     width: 70,
//     gap: 6,
//   },
//   skeletonQuickCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#dde2ed",
//   },
//   skeletonQuickLabel: {
//     width: 44,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#dde2ed",
//   },
//   skeletonSectionTitle: {
//     width: 120,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: "#dde2ed",
//     marginLeft: 20,
//     marginBottom: 10,
//   },
//   skeletonFilterBtn: {
//     width: 70,
//     height: 34,
//     borderRadius: 20,
//     backgroundColor: "#dde2ed",
//   },

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
//     backgroundColor: "green",
//     height: 50,
//     width: 50,
//     justifyContent: "center",
//     paddingHorizontal: 0,
//   },
//   stickyBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 8, fontSize: 13 },
// });

import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  TextInput,
  ScrollView,
  Linking,
  Alert,
  Animated,
} from "react-native";
import Navbar from "../components/Navbar";
import CustomIcon from "../components/CustomIcon";
import useStore from "../store/useStore";
import { auth } from "../firebaseConfig";
import { useNetworkCheck } from "../store/useNetwork";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const BASE_URL = "https://orbitmediasolutions.com/";
const HERO_HEIGHT = 210;
const SEARCH_BAR_HEIGHT = 46;
const SEARCH_OVERLAP = 22;
const CONTENT_TOP_OFFSET = HERO_HEIGHT - SEARCH_OVERLAP + SEARCH_BAR_HEIGHT + 12;

// ─── HERO SLIDES CONFIG ──────────────────────────────────────
const HERO_SLIDES = [
  {
    type: "products",
    tag: "OUR PRODUCTS",
    headline: "Powerful Software\nfor Every Business",
    sub: "ERP, POS, HR, CRM & more — ready-to-use systems built to streamline your operations.",
    cta: "Explore Products",
    ctaNav: "Product",
    accentColor: "#7EB3FF",
    bgColor: "#0F1E45",
    icon: "boxes",
  },
  {
    type: "services",
    tag: "OUR SERVICES",
    headline: "Web, Mobile &\nDigital Solutions",
    sub: "From stunning websites to custom apps — we turn bold ideas into results-driven solutions.",
    cta: "Explore Services",
    ctaNav: "Service",
    accentColor: "#4ECDC4",
    bgColor: "#0D2B2B",
    icon: "concierge-bell",
  },
  {
    type: "support",
    tag: "SINCE 2018",
    headline: "Global Reach,\nLocal Expertise",
    sub: "A global digital agency helping startups, SMEs & enterprises thrive in a digital world.",
    cta: "Book a Service",
    ctaNav: "Form",
    accentColor: "#F7B731",
    bgColor: "#1A1200",
    icon: "globe",
  },
];

// ─── SPINNING REFRESH ICON ───────────────────────────────────
function SpinIcon({ spinning, color = "#1A3067" }) {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const loopRef = useRef(null);

  useEffect(() => {
    if (spinning) {
      loopRef.current = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        })
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
      spinAnim.setValue(0);
    }
    return () => loopRef.current?.stop();
  }, [spinning]);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <CustomIcon name="sync-alt" size={16} color={color} />
    </Animated.View>
  );
}

// ─── FIXED HERO SLIDER ───────────────────────────────────────
function HeroSlider({ navigation, userName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef(null);
  const timerRef = useRef(null);
  const contentOpacity = useRef(new Animated.Value(1)).current;

  const goTo = (idx) => {
    Animated.sequence([
      Animated.timing(contentOpacity, { toValue: 0.2, duration: 150, useNativeDriver: true }),
      Animated.timing(contentOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
    setActiveIndex(idx);
    flatRef.current?.scrollToIndex({ index: idx, animated: true });
  };

  const startAutoSlide = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % HERO_SLIDES.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        Animated.sequence([
          Animated.timing(contentOpacity, { toValue: 0.2, duration: 150, useNativeDriver: true }),
          Animated.timing(contentOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
        return next;
      });
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDotPress = (i) => {
    clearInterval(timerRef.current);
    goTo(i);
    startAutoSlide();
  };

  const slide = HERO_SLIDES[activeIndex];

  return (
    <View style={[styles.heroFixed, { backgroundColor: slide.bgColor }]}>
      <View style={[styles.heroCircle1, { borderColor: slide.accentColor + "20" }]} />
      <View style={[styles.heroCircle2, { backgroundColor: slide.accentColor + "15" }]} />

      <FlatList
        ref={flatRef}
        data={HERO_SLIDES}
        renderItem={() => <View style={{ width, height: HERO_HEIGHT }} />}
        keyExtractor={(_, i) => `s${i}`}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          goTo(idx);
        }}
        style={StyleSheet.absoluteFillObject}
        nestedScrollEnabled={false}
      />

      <Animated.View style={[styles.heroOverlay, { opacity: contentOpacity }]} pointerEvents="box-none">
        <View style={styles.heroTopRow}>
          <View style={[styles.heroBrandBadge, { borderColor: slide.accentColor + "50" }]}>
            <CustomIcon name={slide.icon} size={9} color={slide.accentColor} />
            <Text style={[styles.heroBrandText, { color: slide.accentColor }]}>{slide.tag}</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>{slide.headline}</Text>
        <Text style={styles.heroSub}>{slide.sub}</Text>

        <View style={styles.heroBottom}>
          <TouchableOpacity
            style={[styles.heroCTA, { backgroundColor: slide.accentColor }]}
            onPress={() => navigation.navigate(slide.ctaNav)}
            activeOpacity={0.85}
          >
            <Text style={styles.heroCTAText}>{slide.cta}</Text>
            <CustomIcon name="arrow-right" size={11} color="#000" />
          </TouchableOpacity>

          <View style={styles.dotsRow}>
            {HERO_SLIDES.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => handleDotPress(i)} activeOpacity={0.7}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: i === activeIndex ? slide.accentColor : "rgba(255,255,255,0.25)",
                      width: i === activeIndex ? 20 : 6,
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

// ─── SKELETON CARD ──────────────────────────────────────────
function SkeletonCard() {
  const shimmer = useState(new Animated.Value(0))[0];
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.75] });
  return (
    <Animated.View style={[styles.skeletonCard, { opacity }]}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonBody}>
        <View style={styles.skeletonBadge} />
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonTitleShort} />
      </View>
    </Animated.View>
  );
}

function SkeletonQuickItem() {
  const shimmer = useState(new Animated.Value(0))[0];
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });
  return (
    <Animated.View style={[styles.skeletonQuickItem, { opacity }]}>
      <View style={styles.skeletonQuickCircle} />
      <View style={styles.skeletonQuickLabel} />
    </Animated.View>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────
export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [userName, setUserName] = useState("Guest");

  const { allData, loading, fetchHomeData, blogs } = useStore();
  useNetworkCheck();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUserName(auth.currentUser?.displayName || "Guest");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => { fetchHomeData(); }, []);

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
          item.displayTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (activeTab !== "All") data = data.filter((item) => item.type === activeTab);
    return data;
  }, [searchQuery, activeTab, allData]);

  const handleEmergencyCall = () => {
    Linking.openURL("https://wa.me/447935390848").catch(() =>
      Alert.alert("Error", "Unable to open WhatsApp")
    );
  };

  const getHeroIcon = (title, type) => {
    const t = title.toLowerCase();
    if (t.includes("erp") || t.includes("management")) return "layer-group";
    if (t.includes("pos") || t.includes("shop")) return "layer-group";
    if (t.includes("app") || t.includes("mobile")) return "concierge-bell";
    return type === "Products" ? "layer-group" : "concierge-bell";
  };

  const renderSkeleton = () => (
    <View>
      <View style={styles.quickAccessWrapper}>
        <View style={styles.skeletonSectionTitle} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAccessContainer}>
          {[1, 2, 3, 4, 5].map((i) => <SkeletonQuickItem key={i} />)}
        </ScrollView>
      </View>
      <View style={styles.sectionHeaderRow}>
        <View style={styles.skeletonSectionTitle} />
      </View>
      <View style={styles.filterContainer}>
        {[1, 2, 3].map((i) => <View key={i} style={styles.skeletonFilterBtn} />)}
      </View>
      <View style={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
      </View>
    </View>
  );

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => navigation.navigate("BlogDetails", { blog: item })}
    >
      <Image source={{ uri: `${BASE_URL}${item.displayImage}` }} style={styles.blogImage} resizeMode="cover" />
      <View style={styles.blogInfo}>
        <Text style={styles.blogTitle} numberOfLines={2}>{item.displayTitle}</Text>
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
      <Image source={{ uri: `${BASE_URL}${item.displayImage}` }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <View style={[styles.typeBadge, { backgroundColor: item.type === "Products" ? "#6200EE" : "#03DAC6" }]}>
          <Text style={styles.typeText}>{item.type === "Products" ? "PRODUCT" : "SERVICE"}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.displayTitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      {!searchQuery && (
        <>
          <View style={{ height: CONTENT_TOP_OFFSET }} />

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
                      item.type === "Products" ? "ProductDetails" : "ServiceDetails",
                      { [item.type === "Products" ? "product" : "service"]: item },
                    )
                  }
                >
                  <View style={[styles.miniIconCircle, { backgroundColor: item.type === "Products" ? "#F0F3FF" : "#F8F0FF" }]}>
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
                style={[styles.filterBtn, activeTab === tab && styles.filterBtnActive]}
              >
                <Text style={[styles.filterText, activeTab === tab && styles.filterTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {searchQuery ? (
        <View>
          <View style={{ height: CONTENT_TOP_OFFSET }} />
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Search Results</Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  const renderFooter = () => {
    if (searchQuery || blogs.length === 0) return <View style={{ height: 100 }} />;
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

      {/* ── LAYER 1: Fixed hero ── */}
      <View style={styles.heroAnchor}>
        <HeroSlider navigation={navigation} userName={userName} />
      </View>

      {/* ── LAYER 2: Fixed search bar + refresh button ── */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBarContainer}>
          <CustomIcon name="search" size={16} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for ERP, POS, or Web Dev..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {/* Clear button when typing */}
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.searchAction}>
              <CustomIcon name="times-circle" size={16} color="#ccc" />
            </TouchableOpacity>
          )}

          {/* Divider */}
          <View style={styles.searchDivider} />

          {/* Refresh button */}
          <TouchableOpacity
            onPress={onRefresh}
            disabled={refreshing}
            style={styles.searchAction}
            activeOpacity={0.6}
          >
            <SpinIcon spinning={refreshing} color="#1A3067" />
          </TouchableOpacity>
        </View>

        {/* Refreshing toast strip */}
        {refreshing && (
          <View style={styles.refreshStrip}>
            <SpinIcon spinning color="#1A3067" />
           
          </View>
        )}
      </View>

      {/* ── LAYER 3: Scrollable content ── */}
      {loading && allData.length === 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: CONTENT_TOP_OFFSET }}
        >
          {renderSkeleton()}
        </ScrollView>
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#1A3067"]}
              tintColor="#1A3067"
            />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <CustomIcon name="search" size={32} color="#ccc" />
              <Text style={styles.emptyText}>No matches found.</Text>
            </View>
          }
        />
      )}

      {/* ── LAYER 4: Floating buttons ── */}
      <View style={styles.floatingGroup}>
        <TouchableOpacity style={[styles.stickyBtn, styles.supportSticky]} onPress={handleEmergencyCall}>
          <CustomIcon name="whatsapp" size={20} color="white" type="Brands" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.stickyBtn} onPress={() => navigation.navigate("Form")}>
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
  container: { flex: 1, backgroundColor: "#ffffff" },

  // ── HERO ─────────────────────────────────────────────────────
  heroAnchor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  heroFixed: {
    width: "100%",
    height: HERO_HEIGHT,
    overflow: "hidden",
    borderRadius: 10,
  },
  heroCircle1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    top: -60,
    right: -50,
  },
  heroCircle2: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    top: -15,
    right: -10,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroBrandBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4,
    gap: 5,
    borderWidth: 1,
  },
  heroBrandText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.9 },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 24,
    letterSpacing: -0.3,
    flex: 1,
    marginTop: 5,
  },
  heroSub: { color: "rgba(255,255,255,0.5)", fontSize: 11, lineHeight: 20 },
  heroBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heroCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroCTAText: { color: "#000", fontSize: 11, fontWeight: "800" },
  dotsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dot: { height: 6, borderRadius: 3 },

  // ── SEARCH BAR ───────────────────────────────────────────────
  searchWrapper: {
    position: "absolute",
    top: HERO_HEIGHT - SEARCH_OVERLAP,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: SEARCH_BAR_HEIGHT,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#eef0f5",
  },
  searchInput: { flex: 1, fontSize: 13, color: "#1A3067" },
  searchAction: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#e5e7eb",
  },

  // ── REFRESH STRIP (appears below search bar while refreshing) ─
 refreshStrip: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  backgroundColor: "#ffffff",
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginTop: 6,
  alignSelf: "center",
  shadowColor: "#1A3067",
  shadowOpacity: 0.12,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 4,
  borderWidth: 1,
  borderColor: "#e8edf5",
},
refreshStripText: {
  color: "#1A3067",
  fontSize: 11,
  fontWeight: "700",
  letterSpacing: 0.3,
},
  // ── FLATLIST ─────────────────────────────────────────────────
  flatList: { zIndex: 2 },

  // ── QUICK ACCESS ─────────────────────────────────────────────
  quickAccessWrapper: { marginTop: 16 },
  miniSectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1A3067",
    marginLeft: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  quickAccessContainer: { paddingLeft: 20, paddingRight: 10 },
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

  // ── SECTION HEADER + TABS ────────────────────────────────────
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
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filterBtnActive: { backgroundColor: "#1A3067", borderColor: "#1A3067" },
  filterText: { color: "#1A3067", fontWeight: "bold", fontSize: 12 },
  filterTextActive: { color: "#fff" },

  // ── PRODUCT CARDS ────────────────────────────────────────────
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

  // ── BLOG ─────────────────────────────────────────────────────
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
  blogReadMore: { fontSize: 10, color: "#1A3067", marginTop: 4, fontWeight: "bold" },

  // ── SKELETON ─────────────────────────────────────────────────
  skeletonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 4,
  },
  skeletonCard: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 14,
    backgroundColor: "#e2e6f0",
    overflow: "hidden",
  },
  skeletonImage: { width: "100%", height: 100, backgroundColor: "#cdd3e0" },
  skeletonBody: { padding: 10, gap: 7 },
  skeletonBadge: { width: 55, height: 16, borderRadius: 6, backgroundColor: "#cdd3e0" },
  skeletonTitle: { width: "90%", height: 12, borderRadius: 6, backgroundColor: "#cdd3e0" },
  skeletonTitleShort: { width: "60%", height: 12, borderRadius: 6, backgroundColor: "#cdd3e0" },
  skeletonQuickItem: { alignItems: "center", marginRight: 15, width: 70, gap: 6 },
  skeletonQuickCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#dde2ed" },
  skeletonQuickLabel: { width: 44, height: 10, borderRadius: 5, backgroundColor: "#dde2ed" },
  skeletonSectionTitle: {
    width: 120, height: 14, borderRadius: 7,
    backgroundColor: "#dde2ed", marginLeft: 20, marginBottom: 10,
  },
  skeletonFilterBtn: { width: 70, height: 34, borderRadius: 20, backgroundColor: "#dde2ed" },

  // ── EMPTY ────────────────────────────────────────────────────
  emptyBox: { alignItems: "center", paddingTop: 40, gap: 8 },
  emptyText: { textAlign: "center", color: "#999", fontSize: 14 },

  // ── FLOATING BUTTONS ─────────────────────────────────────────
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
    backgroundColor: "#25D366",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  stickyBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 8, fontSize: 13 },
});