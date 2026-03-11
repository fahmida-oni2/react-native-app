// import React, { useEffect } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// export default function Welcome({ navigation }) {
  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate("Home");
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   const handleManualNavigate = () => {
//     navigation.navigate("Home");
//   };

//   return (

//     <TouchableOpacity 
//       activeOpacity={1} 
//       style={styles.fullScreenTap} 
//       onPress={handleManualNavigate}
//     >
//       <View style={styles.container}>
//         <Image source={require("../assets/orbitLogo.png")} style={styles.logo} />
//         <Text style={styles.title}>Welcome to Orbit</Text>
//         <Text style={styles.subtitle}>Smart solutions for your business.</Text>
        

//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   fullScreenTap: {
//     flex: 1,
//   },
//   container: { 
//     flex: 1, 
//     backgroundColor: '#fff', 
//     alignItems: 'center', 
//     justifyContent: 'center', 
//     padding: 20 
//   },
//   logo: { width: 100, height: 100, marginBottom: 30, borderRadius: 23 },
//   title: { fontSize: 28, fontWeight: 'bold', color: '#1A3067' },
//   subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 20 },
//   button: { 
//     backgroundColor: '#1A3067', 
//     paddingVertical: 15, 
//     paddingHorizontal: 60, 
//     borderRadius: 30 
//   },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
// });


import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  StatusBar,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SERVICES = [
  { icon: "🌐", label: "Web Design" },
  { icon: "📱", label: "Mobile Apps" },
  { icon: "🏢", label: "ERP & CRM" },
  { icon: "📈", label: "SEO & Marketing" },
  { icon: "🎨", label: "Creative Media" },
];

const STATS = [
  { v: "200+", l: "Clients" },
  { v: "6+",   l: "Years" },
  { v: "24/7", l: "Support" },
];

export default function Welcome({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Decorative background shapes */}
      <View style={styles.shapeTL} />
      <View style={styles.shapeBR} />
      <View style={styles.glowBlob} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >

        {/* ══ TOP SECTION ══════════════════════════════ */}
        <View style={styles.topSection}>

          {/* Brand label */}
          <View style={styles.brandRow}>
            <View style={styles.brandAccentLine} />
            <Text style={styles.brandLabel}>ORBIT MEDIA SOLUTIONS LIMITED</Text>
          </View>

          {/* Logo + headline */}
          <View style={styles.heroRow}>
            <View style={styles.logoWrap}>
              <View style={styles.logoShadowRing} />
              <Image
                source={require("../assets/orbitLogo.png")}
                style={styles.logo}
                resizeMode="cover"
              />
              <View style={styles.estBadge}>
                <Text style={styles.estTxt}>2018</Text>
              </View>
            </View>

            <View style={styles.heroTextCol}>
              <Text style={styles.headline}>
                Smart{"\n"}
                <Text style={styles.headlineAccent}>Digital</Text>
                {"\n"}Solutions
              </Text>
            </View>
          </View>

          {/* Body copy */}
          <View style={styles.bodyWrap}>
            <Text style={styles.body}>
              From web design & mobile apps to ERP, CRM, SEO and creative media —
              helping brands{" "}
              <Text style={styles.bodyBold}>innovate, grow & succeed.</Text>
            </Text>
          </View>

          {/* Service pills */}
          <View style={styles.pillsWrap}>
            <View style={styles.pillsRow}>
              {SERVICES.map((s) => (
                <View key={s.label} style={styles.pill}>
                  <Text style={styles.pillIcon}>{s.icon}</Text>
                  <Text style={styles.pillLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>

        </View>

        {/* ══ DIVIDER ══════════════════════════════════ */}
        <View style={styles.divider} />

        {/* ══ TRUST ROW ════════════════════════════════ */}
        <View style={styles.trustRow}>
          {[
            { icon: "🔒", text: "Secure & Private" },
            { icon: "⚡", text: "Fast Delivery" },
            { icon: "🤝", text: "Dedicated Support" },
          ].map((t) => (
            <View key={t.text} style={styles.trustItem}>
              <Text style={styles.trustIcon}>{t.icon}</Text>
              <Text style={styles.trustTxt}>{t.text}</Text>
            </View>
          ))}
        </View>

        {/* ══ CTA SECTION ══════════════════════════════ */}
        <View style={styles.ctaSection}>

          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.87}
          >
            <View style={styles.ctaBtnInner}>
              <Text style={styles.ctaTxt}>Get Started</Text>
            </View>
            <View style={styles.ctaShine} />
          </TouchableOpacity>

      
        

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Background shapes
  shapeTL: {
    position: "absolute",
    width: 320, height: 320, borderRadius: 160,
    backgroundColor: "#EEF2FF",
    top: -140, left: -100,
  },
  shapeBR: {
    position: "absolute",
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: "#F0F6FF",
    bottom: -80, right: -80,
  },
  glowBlob: {
    position: "absolute",
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: "#DBEAFE",
    opacity: 0.14,
    top: height * 0.38, left: -50,
  },

  scroll: {
    paddingTop: 56,
    paddingBottom: 50,
  },

  // Top section
  topSection: {
    paddingHorizontal: 26,
  },

  // Brand row
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  brandAccentLine: {
    width: 3, height: 14, borderRadius: 2,
    backgroundColor: "#1A3067",
    marginRight: 8,
  },
  brandLabel: {
    fontSize: 10.5, fontWeight: "900",
    color: "#1A3067", letterSpacing: 1.6,
  },

  // Hero row
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoWrap: {
    position: "relative",
    width: 94, height: 94,
    marginRight: 20,
  },
  logoShadowRing: {
    position: "absolute",
    width: 90, height: 90, borderRadius: 22,
    backgroundColor: "#E0EAFF",
    top: 6, left: 6,
  },
  logo: {
    width: 84, height: 84, borderRadius: 20,
    borderWidth: 2.5, borderColor: "#FFFFFF",
    shadowColor: "#1A3067", shadowOpacity: 0.15,
    shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 7,
  },
  estBadge: {
    position: "absolute",
    bottom: -4, right: -4,
    backgroundColor: "#1A3067",
    borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 2,
    borderWidth: 2, borderColor: "#fff",
  },
  estTxt: {
    fontSize: 9, fontWeight: "900",
    color: "#fff", letterSpacing: 0.4,
  },

  heroTextCol: { flex: 1 },
  headline: {
    fontSize: 36, fontWeight: "900",
    color: "#08112B", lineHeight: 42,
    letterSpacing: -1,
  },
  headlineAccent: { color: "#1A3067" },

  // Body
  bodyWrap: { marginBottom: 0 },
  body: {
    fontSize: 14, color: "#6B7FA8",
    lineHeight: 22, fontWeight: "400",
  },
  bodyBold: { color: "#08112B", fontWeight: "700" },

  // Pills
  pillsWrap: { marginTop: 20 },
  pillsRow:  { flexDirection: "row", flexWrap: "wrap" },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    borderRadius: 24,
    paddingHorizontal: 12, paddingVertical: 7,
    borderWidth: 1.5, borderColor: "#E0E8FF",
    marginRight: 8,
    marginBottom: 8,
  },
  pillIcon:  { fontSize: 13, marginRight: 6 },
  pillLabel: {
    fontSize: 11.5, fontWeight: "700",
    color: "#1A3067", letterSpacing: 0.1,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#F1F4FB",
    marginHorizontal: 26,
    marginVertical: 24,
  },

  // Stats strip
  statsStrip: {
    flexDirection: "row",
    marginHorizontal: 26,
    backgroundColor: "#F7F9FF",
    borderRadius: 18, paddingVertical: 16,
    borderWidth: 1.5, borderColor: "#E8EFFF",
    marginBottom: 18,
  },
  statItem:   { flex: 1, alignItems: "center" },
  statBorder: { borderRightWidth: 1.5, borderRightColor: "#E8EFFF" },
  statVal: {
    fontSize: 22, fontWeight: "900",
    color: "#1A3067", letterSpacing: -0.5, marginBottom: 3,
  },
  statLbl: {
    fontSize: 10.5, fontWeight: "600",
    color: "#A8B8D8", letterSpacing: 0.3,
  },

  // Trust row
  trustRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 18,
    marginBottom: 30,
  },
  trustItem: { alignItems: "center" },
  trustIcon: { fontSize: 20, marginBottom: 5 },
  trustTxt: {
    fontSize: 10.5, fontWeight: "700",
    color: "#6B7FA8", letterSpacing: 0.2,
  },

  // CTA
  ctaSection: {
    paddingHorizontal: 26,
    alignItems: "center",
  },
  ctaBtn: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "#1A3067",
    overflow: "hidden",
    shadowColor: "#1A3067",
    shadowOpacity: 0.30,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
    marginBottom: 14,
  },
  ctaBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  ctaShine: {
    position: "absolute",
    top: 0, left: 0,
    width: "50%", height: "100%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
  },
  ctaTxt: {
    fontSize: 17, fontWeight: "900",
    color: "#FFFFFF", letterSpacing: 0.3,
    marginRight: 12,
  },
  ctaCircle: {
    width: 32, height: 32, borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center", alignItems: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.22)",
  },
  ctaArrow: { fontSize: 16, color: "#fff", fontWeight: "900" },

  ctaTagline: {
    fontSize: 12, color: "#A8B8D8",
    fontWeight: "600", letterSpacing: 0.2,
    marginBottom: 10,
  },
  legalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  legalTxt:  { fontSize: 11.5, color: "#C0CADF", fontWeight: "500" },
  legalLink: {
    fontSize: 11.5, color: "#1A3067",
    fontWeight: "800", textDecorationLine: "underline",
  },
});