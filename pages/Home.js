
import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Image, FlatList,
  Dimensions, RefreshControl, TextInput, ScrollView,
  Linking, Alert, Animated, BackHandler,
} from "react-native";
import Navbar from "../components/Navbar";
import CustomIcon from "../components/CustomIcon";
import useStore from "../store/useStore";
import { useNetworkCheck } from "../store/useNetwork";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const BASE_URL = "https://orbitmediasolutions.com/";
const SLIDE_W = width;

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  navy: "#060E28",
  navyM: "#0C1A42",
  blue: "#1A3067",
  bg: "#F1F4FB",
  white: "#FFFFFF",
  ink: "#08112B",
  ink3: "#3D4F72",
  ink4: "#6B7FA8",
  ink5: "#A8B8D8",
  border: "rgba(8,17,43,0.07)",
};

// ─── KEYWORD MAPS ────────────────────────────────────────────────────────────
const BG_MAP = [
  { kw: "erp", c: ["#0F2167", "#1847E5"] },
  { kw: "hr", c: ["#064E3B", "#059669"] },
  { kw: "pos", c: ["#4C1D95", "#7C3AED"] },
  { kw: "invent", c: ["#78350F", "#D97706"] },
  { kw: "hotel", c: ["#1A2E05", "#65A30D"] },
  { kw: "web", c: ["#0C4A6E", "#0284C7"] },
  { kw: "market", c: ["#7C2D12", "#EA580C"] },
  { kw: "mobile", c: ["#1E1B4B", "#4338CA"] },
  { kw: "app", c: ["#1E1B4B", "#4338CA"] },
  { kw: "news", c: ["#1C1917", "#78716C"] },
  { kw: "pharma", c: ["#064E3B", "#10B981"] },
  { kw: "account", c: ["#0C4A6E", "#0284C7"] },
  { kw: "payroll", c: ["#78350F", "#B45309"] },
  { kw: "restaur", c: ["#7C2D12", "#EA580C"] },
  { kw: "ecomm", c: ["#312E81", "#6D28D9"] },
  { kw: "school", c: ["#164E63", "#0891B2"] },
  { kw: "clinic", c: ["#831843", "#BE185D"] },
  { kw: "salon", c: ["#4A1942", "#A21CAF"] },
  { kw: "gym", c: ["#1A1200", "#CA8A04"] },
];

const EM_MAP = [
  { kw: "erp", e: "🏢" }, { kw: "hr", e: "👥" }, { kw: "pos", e: "🖥️" },
  { kw: "invent", e: "📦" }, { kw: "hotel", e: "🏨" }, { kw: "web", e: "💻" },
  { kw: "market", e: "📈" }, { kw: "mobile", e: "📱" }, { kw: "app", e: "📱" },
  { kw: "news", e: "📰" }, { kw: "pharma", e: "💊" }, { kw: "account", e: "📊" },
  { kw: "payroll", e: "💰" }, { kw: "restaur", e: "🍽️" }, { kw: "ecomm", e: "🛒" },
  { kw: "school", e: "🎓" }, { kw: "clinic", e: "🏥" }, { kw: "salon", e: "💇" },
  { kw: "gym", e: "🏋️" }, { kw: "law", e: "⚖️" },
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
  if (t.includes("erp")) return "Enterprise Resource Planning";
  if (t.includes("hr") || t.includes("human")) return "HR Management";
  if (t.includes("payroll")) return "Payroll & Finance";
  if (t.includes("pos")) return "Point of Sale";
  if (t.includes("invent")) return "Inventory Control";
  if (t.includes("hotel")) return "Hospitality";
  if (t.includes("restaur")) return "Restaurant & F&B";
  if (t.includes("school") || t.includes("edu")) return "Education";
  if (t.includes("clinic") || t.includes("health")) return "Healthcare";
  if (t.includes("pharma")) return "Pharmacy";
  if (t.includes("account")) return "Accounting";
  if (t.includes("ecomm")) return "E-Commerce";
  if (t.includes("salon")) return "Salon & Beauty";
  if (t.includes("gym") || t.includes("fitness")) return "Fitness";
  if (t.includes("law")) return "Legal";
  if (t.includes("web")) return "Web Development";
  if (t.includes("mobile") || t.includes("app")) return "Mobile App";
  if (t.includes("market")) return "Digital Marketing";
  if (t.includes("crm")) return "Customer Relations";
  return "Business Solution";
};

/** 3 feature bullet-points for a product, derived from title keywords */
const getFeatures = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("erp")) return ["Multi-module", "Real-time Reports", "Cloud Ready"];
  if (t.includes("hr")) return ["Attendance", "Leave Management", "Staff Portal"];
  if (t.includes("payroll")) return ["Auto Payslip", "Tax Ready", "Bank Transfer"];
  if (t.includes("pos")) return ["Fast Checkout", "Offline Mode", "Receipt Print"];
  if (t.includes("invent")) return ["Stock Alerts", "Barcode Scan", "Multi-location"];
  if (t.includes("hotel")) return ["Booking Engine", "Room Map", "Housekeeping"];
  if (t.includes("restaur")) return ["Table Orders", "KDS Support", "Menu Builder"];
  if (t.includes("school")) return ["Attendance", "Grade Book", "Parent Portal"];
  if (t.includes("clinic")) return ["Patient Records", "Appointments", "Billing"];
  if (t.includes("pharma")) return ["Drug Inventory", "Prescriptions", "Expiry Alert"];
  if (t.includes("account")) return ["Ledger", "Invoicing", "Tax Reports"];
  if (t.includes("ecomm")) return ["Product Catalog", "Cart", "Order Tracking"];
  if (t.includes("salon")) return ["Appointments", "Staff Tips", "Client History"];
  if (t.includes("web")) return ["Responsive", "SEO Optimised", "CMS Included"];
  if (t.includes("mobile")) return ["iOS & Android", "Push Alerts", "Offline Sync"];
  if (t.includes("market")) return ["SEO & SEM", "Social Ads", "Analytics"];
  if (t.includes("crm")) return ["Lead Pipeline", "Email Sync", "Task Follow-up"];
  return ["Custom Built", "Scalable", "24/7 Support"];
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

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

function PopularSlider({ allData, navigation }) {
  const products = useMemo(() => {
    const FEATURED_KW = ["erp", "hr", "payroll", "restaur"];
    const featured = allData.filter(i =>
      i.type === "Products" &&
      FEATURED_KW.some(kw => i.displayTitle?.toLowerCase().includes(kw))
    );
    return featured.length ? featured : allData.filter(i => i.type === "Products");
  }, [allData]);

  const CARD_W = SLIDE_W - 36;
  const ITEM_W = CARD_W + 36;

  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef(null);
  const timerRef = useRef(null);
  const activeRef = useRef(0);
  const isAutoRef = useRef(false);
  const totalRef = useRef(0);

  useEffect(() => {
    totalRef.current = products.length;
  }, [products.length]);


  const goTo = useCallback((idx) => {
    const total = totalRef.current;
    if (!total) return;
    const target = ((idx % total) + total) % total;
    isAutoRef.current = true;
    scrollRef.current?.scrollTo({ x: target * ITEM_W, animated: true });
    activeRef.current = target;
    setActiveIdx(target);
    setTimeout(() => { isAutoRef.current = false; }, 500);
  }, []);


  const startAuto = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (totalRef.current <= 1) return;
      goTo(activeRef.current + 1);
    }, 3500);
  }, []);

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      activeRef.current = 0;
      setActiveIdx(0);
      scrollRef.current?.scrollTo({ x: 0, animated: false });
    }
  }, [products.length]);

  if (!products.length) return null;

  return (
    <View style={S.sliderSection}>
      <Text style={S.sliderTitle}>Popular Products</Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        snapToInterval={ITEM_W}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingRight: 18 }}
        onScrollBeginDrag={() => {

          clearInterval(timerRef.current);
          isAutoRef.current = false;
        }}
        onMomentumScrollEnd={(e) => {

          const idx = Math.round(e.nativeEvent.contentOffset.x / ITEM_W);
          const clamped = Math.max(0, Math.min(idx, totalRef.current - 1));
          activeRef.current = clamped;
          setActiveIdx(clamped);
          startAuto();
        }}
      >
        {products.map((item) => {
          const [c1, c2] = getBg(item.displayTitle, true);
          const emoji = getEmoji(item.displayTitle);
          const category = getCategory(item.displayTitle);
          const features = getFeatures(item.displayTitle);

          return (
            <TouchableOpacity
              key={item.uniqueKey}
              activeOpacity={0.92}
              onPress={() => navigation.navigate("ProductDetails", { product: item })}
              style={{ width: CARD_W, marginLeft: 18 }}
            >
              <GradBox c1={c1} c2={c2} style={S.slideCard}>
                <View style={S.sRing1} />
                <View style={S.sRing2} />
                <View style={S.slideLeft}>
                  <View style={S.slideTopRow}>
                    <View style={S.slideBadge}>
                      <Text style={S.slideBadgeTxt}>PRODUCT</Text>
                    </View>
                    <Text style={S.slideCategoryTxt} numberOfLines={1}>{category}</Text>
                  </View>
                  <Text style={S.slideName} numberOfLines={2}>{item.displayTitle}</Text>
                  <View style={S.slideFeatureRow}>
                    {features.slice(0, 3).map((feat, fi) => (
                      <View key={fi} style={S.slideFeaturePill}>
                        <Text style={S.slideFeatureTxt}>{feat}</Text>
                      </View>
                    ))}
                  </View>
                </View>
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
        })}
      </ScrollView>

      {/* Dot indicators */}
      <View style={S.dotsRow}>
        {products.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              clearInterval(timerRef.current);
              goTo(i);
              startAuto();
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          >
            <View style={[S.dot, {
              width: i === activeIdx ? 20 : 6,
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
  const [activeTab, setActiveTab] = useState("All");
  const [exitVisible, setExitVisible] = useState(false);
  const fadeIn = useRef(new Animated.Value(0)).current;

  const { allData, loading, fetchHomeData, blogs } = useStore();
  useNetworkCheck();

useEffect(() => {
  fetchHomeData(true);
}, []); 

  useEffect(() => {
    setExitVisible(false);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setExitVisible(true);
        return true; 
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );
  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHomeData(true);
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

  // ── SEARCH BAR  ───────────────────────────────────
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
          <Text style={S.bbTitle}>Connect With Us</Text>
          <Text style={S.bbSub}>Reach out · Get the services you need</Text>
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

  // ── FEATURED GRID CARD  ──────────
  const renderCard = ({ item }) => {
    const isProd = item.type === "Products";
    const [c1, c2] = getBg(item.displayTitle, isProd);
    const features = getFeatures(item.displayTitle);
    const category = getCategory(item.displayTitle);

    return (
      <TouchableOpacity style={S.featCard} onPress={() => goItem(item)} activeOpacity={0.85}>

        <GradBox c1={c1} c2={c2} style={S.fcBanner}>
          {item.displayImage ? (
            <Image
              source={{ uri: `${BASE_URL}${item.displayImage}` }}
              style={[StyleSheet.absoluteFill, { opacity: 0.50 }]}
              resizeMode="cover"
            />
          ) : null}
          <View style={S.fcPill}>
            <Text style={S.fcPillTxt}>{isProd ? "PRODUCT" : "SERVICE"}</Text>
          </View>
          <Text style={S.fcEmoji}>{getEmoji(item.displayTitle)}</Text>
        </GradBox>

        {/* Text body */}
        <View style={S.fcBody}>
          <Text style={S.fcCategory} numberOfLines={1}>{category}</Text>
          <Text style={S.fcName} numberOfLines={2}>{item.displayTitle}</Text>
          <View style={S.fcFooter}>
            <Text style={S.fcType}>View Details</Text>
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
      {renderFixedSearch()}
      {allData.length === 0 ? (
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

      {/* CUSTOM EXIT ALERT MODAL */}
      {exitVisible && (
        <View style={S.modalOverlay}>
          <View style={S.modalContainer}>
            {/* Icon Header */}
            <View style={S.modalIconCircle}>
              <CustomIcon name="exclamation-triangle" size={24} color={C.white} />
            </View>

            <Text style={S.modalTitle}>Exit Orbit One?</Text>
            <Text style={S.modalSub}>Are you sure you want to close the application?</Text>

            <View style={S.modalBtnRow}>
              <TouchableOpacity
                style={S.modalBtnCancel}
                onPress={() => setExitVisible(false)}
              >
                <Text style={S.modalBtnCancelTxt}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={S.modalBtnExit}
                onPress={() => {
                  setExitVisible(false); 
                  setTimeout(() => {
                    BackHandler.exitApp();
                  }, 100);
                }}
              >
                <Text style={S.modalBtnExitTxt}>Exit Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  searchBtn: { padding: 4, justifyContent: "center", alignItems: "center" },
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
  bbSub: { fontSize: 11, color: "rgba(255,255,255,0.60)" },
  bbArrow: {
    width: 32, height: 32, borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.16)",
    justifyContent: "center", alignItems: "center",
  },

  // ── QUICK ACCESS ────────────────────────────────────────────
  qaSec: { marginTop: 20 },
  qaTitle: {
    fontSize: 15, fontWeight: "800", color: C.ink,
    letterSpacing: -0.3, paddingHorizontal: 18, marginBottom: 12,
  },
  qaRow: { paddingHorizontal: 18, gap: 12, paddingBottom: 6 },
  qaItem: { alignItems: "center", width: 64 },
  qaImgWrap: {
    width: 54, height: 54, borderRadius: 14, overflow: "hidden",
    borderWidth: 2, borderColor: "#fff",
    shadowColor: "#000", shadowOpacity: 0.10, shadowRadius: 8, elevation: 3,
    marginBottom: 6,
  },
  qaImg: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  qaEmoji: { fontSize: 20, zIndex: 1 },
  qaAbbr: {
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
  statItem: { flex: 1, alignItems: "center" },
  statDivider: { borderRightWidth: 1, borderRightColor: "#E4E9F7" },
  statVal: { fontSize: 18, fontWeight: "900", color: C.blue, letterSpacing: -0.5, marginBottom: 2 },
  statLbl: { fontSize: 10.5, fontWeight: "600", color: C.ink5, letterSpacing: 0.2 },

  // ── POPULAR SLIDER ──────────────────────────────────────────
  sliderSection: { marginTop: 20 },
  sliderTitle: {
    fontSize: 15, fontWeight: "800", color: C.ink,
    letterSpacing: -0.3, paddingHorizontal: 18, marginBottom: 12,
  },
  slidePad: { width: SLIDE_W, paddingHorizontal: 18 },

  // Card shell
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
  tabTxt: { fontSize: 12.5, fontWeight: "700", color: C.ink3 },
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
  fcBody: { padding: 11 },
  fcCategory: { fontSize: 9, fontWeight: "700", letterSpacing: 0.5, color: C.ink5, marginBottom: 3, textTransform: "uppercase" },
  fcName: { fontSize: 12.5, fontWeight: "800", color: C.ink, lineHeight: 17, letterSpacing: -0.1, marginBottom: 8 },

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
  fcType: { fontSize: 9.5, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", color: C.blue },
  fcArrow: {
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
  insThumb: { height: 94, backgroundColor: "#E0EAFF" },
  insOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(8,17,43,0.1)" },
  insBody: { padding: 10 },
  insCat: { fontSize: 9, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", color: C.blue, marginBottom: 4 },
  insName: { fontSize: 11.5, fontWeight: "700", color: C.ink, lineHeight: 16, marginBottom: 8 },
  insMore: { fontSize: 11, fontWeight: "700", color: C.blue },
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
  skCard: { width: "48%", marginBottom: 14, borderRadius: 16, backgroundColor: "#E2E8F4", overflow: "hidden" },
  skImg: { width: "100%", height: 100, backgroundColor: "#CDD5E4" },
  skBody: { padding: 11, gap: 7 },
  skBadge: { width: 52, height: 14, borderRadius: 5, backgroundColor: "#CDD5E4" },
  skLine: { width: "88%", height: 11, borderRadius: 5, backgroundColor: "#CDD5E4" },
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
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(6, 14, 40, 0.8)", 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: C.white,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    elevation: 10,
  },
  modalIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: C.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: C.navy,
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: C.ink4,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  modalBtnRow: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtnCancel: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: C.border,
  },
  modalBtnCancelTxt: {
    color: C.ink3,
    fontWeight: "600",
  },
  modalBtnExit: {
    flex: 1,
    height: 50,
    backgroundColor: "#E53E3E",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnExitTxt: {
    color: C.white,
    fontWeight: "700",
  },
});