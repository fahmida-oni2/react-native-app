// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Platform,
//   ScrollView,
//   RefreshControl,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation, useIsFocused } from "@react-navigation/native";
// import { signOut, onAuthStateChanged, reload } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import CustomIcon from "../components/CustomIcon";

// export default function ProfileScreen() {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const [user, setUser] = useState(auth.currentUser);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
//       setUser(authenticatedUser);
//     });
//     return unsubscribe;
//   }, [isFocused]);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     if (auth.currentUser) {
//       try {
//         await reload(auth.currentUser);
//         setUser({ ...auth.currentUser });
//       } catch (error) {
//         console.error("Failed to reload user", error);
//       }
//     }
//     setTimeout(() => setRefreshing(false), 1000);
//   }, []);

//   const handleLogout = () => {
//     const logoutAction = () => signOut(auth).catch((err) => console.log(err));

//     if (Platform.OS === "web") {
//       if (window.confirm("Are you sure you want to sign out?")) logoutAction();
//     } else {
//       Alert.alert("Logout", "Are you sure you want to sign out?", [
//         { text: "Cancel", style: "cancel" },
//         { text: "Logout", style: "destructive", onPress: logoutAction },
//       ]);
//     }
//   };

//   const handleDeleteAccount = () => {
//     Alert.alert(
//       "Delete Account",
//       "This will permanently delete your account and all associated data. This cannot be undone.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             auth.currentUser
//               .delete()
//               .then(() => Alert.alert("Success", "Account deleted."))
//               .catch((error) => {
//                 if (error.code === "auth/requires-recent-login") {
//                   Alert.alert(
//                     "Security Check",
//                     "Please log out and log back in before deleting your account.",
//                   );
//                 }
//               });
//           },
//         },
//       ],
//     );
//   };
//   const handleSafeBack = () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     } else {
//       navigation.navigate("Home");
//     }
//   };

//   // --- GUEST VIEW ---
//   if (!user) {
//     return (
//       <SafeAreaView style={styles.container} edges={["top"]}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
//             <CustomIcon name="arrow-left" size={22} color="#1A3067" />
//           </TouchableOpacity>
//           <View style={styles.titleWrapper}>
//             <Text style={styles.headerText}>My Profile</Text>
//           </View>
//           <View style={{ width: 32 }} />
//         </View>

//         <View style={styles.guestContent}>
//           <View style={styles.guestIconCircle}>
//             <CustomIcon name="user-circle" size={80} color="#1A3067" />
//           </View>
//           <Text style={styles.guestTitle}>Welcome to Orbit</Text>
//           <Text style={styles.guestSub}>
//             Sign in to manage your services and access premium features.
//           </Text>
//           <Text style={styles.guestTitle}>
//             This is only for admin panel.
//           </Text>


//           <TouchableOpacity
//             style={styles.primaryBtn}
//             activeOpacity={0.8}
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Text style={styles.primaryBtnText}>Login</Text>
//           </TouchableOpacity>

//           {/* <TouchableOpacity 
//             style={styles.secondaryBtn} 
//             activeOpacity={0.7}
//             onPress={() => navigation.navigate("SignUp")}
//           >
//             <Text style={styles.secondaryBtnText}>Create an Account</Text>
//           </TouchableOpacity> */}
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // --- USER VIEW ---
//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
//           <CustomIcon name="arrow-left" size={22} color="#1A3067" />
//         </TouchableOpacity>
//         <View style={styles.titleWrapper}>
//           <Text style={styles.headerText}>My Profile</Text>
//           <Text style={styles.headerSubText}>Account Details</Text>
//         </View>
//         <View style={{ width: 32 }} />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#1A3067"
//           />
//         }
//       >
//         <View style={styles.profileHeader}>
//           <View style={styles.avatarContainer}>
//             {user?.photoURL ? (
//               <Image source={{ uri: user.photoURL }} style={styles.avatar} />
//             ) : (
//               <View style={styles.avatarPlaceholder}>
//                 <CustomIcon name="user-circle" size={70} color="#1A3067" />
//               </View>
//             )}
//           </View>
//           <Text style={styles.profileName}>
//             {user?.displayName || "Member"}
//           </Text>
//           <Text style={styles.profileEmail}>{user?.email}</Text>
//         </View>

//         <View style={styles.content}>
//           <Text style={styles.sectionTitle}>General</Text>

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => navigation.navigate("UpdateProfile")}
//           >
//             <View style={styles.menuLeft}>
//               <View style={styles.iconBox}>
//                 <CustomIcon name="user-edit" size={18} color="#1A3067" />
//               </View>
//               <Text style={styles.menuText}>Edit Profile</Text>
//             </View>
//             <CustomIcon name="chevron-right" size={14} color="#ccc" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => navigation.navigate("Contact")}
//           >
//             <View style={styles.menuLeft}>
//               <View style={styles.iconBox}>
//                 <CustomIcon name="headset" size={18} color="#1A3067" />
//               </View>
//               <Text style={styles.menuText}>Emergency Support</Text>
//             </View>
//             <CustomIcon name="chevron-right" size={14} color="#ccc" />
//           </TouchableOpacity>

//           <View style={styles.separator} />

//           <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
//             <View style={styles.menuLeft}>
//               <View style={[styles.iconBox, { backgroundColor: "#fff1f2" }]}>
//                 <CustomIcon name="sign-out-alt" size={18} color="#ef4444" />
//               </View>
//               <Text style={styles.logoutLabel}>Sign Out</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={handleDeleteAccount} // We will define this function below
//           >
//             <View style={styles.menuLeft}>
//               <View style={[styles.iconBox, { backgroundColor: "#fef2f2" }]}>
//                 <CustomIcon name="user-times" size={18} color="#ef4444" />
//               </View>
//               <Text style={[styles.menuText, { color: "#ef4444" }]}>
//                 Delete Account
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#ffffff" },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f3f4f6",
//   },
//   titleWrapper: { alignItems: "center" },
//   headerText: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
//   headerSubText: { fontSize: 11, color: "#6b7280", marginTop: 2 },
//   backBtn: { padding: 5 },

//   scrollContent: { paddingBottom: 40 },
//   profileHeader: {
//     alignItems: "center",
//     paddingVertical: 30,
//     borderBottomWidth: 8,
//     borderBottomColor: "#f9fafb",
//   },
//   avatarContainer: {
//     padding: 4,
//     borderRadius: 60,
//     backgroundColor: "#fff",
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     marginBottom: 15,
//   },
//   avatar: { width: 100, height: 100, borderRadius: 50 },
//   avatarPlaceholder: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f3f4f6",
//   },
//   profileName: { fontSize: 22, fontWeight: "bold", color: "#1f2937" },
//   profileEmail: { fontSize: 14, color: "#6b7280", marginTop: 4 },

//   content: { padding: 20 },
//   sectionTitle: {
//     fontSize: 11,
//     fontWeight: "800",
//     color: "#9ca3af",
//     marginBottom: 15,
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 12,
//     marginBottom: 10,
//   },
//   menuLeft: { flexDirection: "row", alignItems: "center" },
//   iconBox: {
//     width: 38,
//     height: 38,
//     borderRadius: 10,
//     backgroundColor: "#f3f4f6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   menuText: { fontSize: 16, color: "#374151", fontWeight: "500" },
//   logoutItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     marginTop: 10,
//   },
//   logoutLabel: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
//   separator: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 15 },

//   // Guest View
//   guestContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 30,
//   },
//   guestIconCircle: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     backgroundColor: "#f9fafb",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 30,
//     borderWidth: 1,
//     borderColor: "#f3f4f6",
//   },
//   guestTitle: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#1A3067",
//     marginBottom: 10,
//   },
//   guestSub: {
//     fontSize: 15,
//     color: "#6b7280",
//     textAlign: "center",
//     marginBottom: 40,
//     lineHeight: 22,
//   },
//   primaryBtn: {
//     backgroundColor: "#1A3067",
//     width: "100%",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   primaryBtnText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
//   secondaryBtn: {
//     backgroundColor: "#fff",
//     width: "100%",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#1A3067",
//   },
//   secondaryBtnText: { color: "#1A3067", fontSize: 17, fontWeight: "bold" },
// });

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { signOut, onAuthStateChanged, reload } from "firebase/auth";
import { auth } from "../firebaseConfig";
import CustomIcon from "../components/CustomIcon";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(auth.currentUser);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
    });
    return unsubscribe;
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (auth.currentUser) {
      try {
        await reload(auth.currentUser);
        setUser({ ...auth.currentUser });
      } catch (error) {
        console.error("Failed to reload user", error);
      }
    }
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleLogout = () => {
    const logoutAction = () => signOut(auth).catch((err) => console.log(err));
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to sign out?")) logoutAction();
    } else {
      Alert.alert("Logout", "Are you sure you want to sign out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logoutAction },
      ]);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all associated data. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            auth.currentUser
              .delete()
              .then(() => Alert.alert("Success", "Account deleted."))
              .catch((error) => {
                if (error.code === "auth/requires-recent-login") {
                  Alert.alert(
                    "Security Check",
                    "Please log out and log back in before deleting your account.",
                  );
                }
              });
          },
        },
      ],
    );
  };

  const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  // --- GUEST VIEW (Not logged in) ---
  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
            <CustomIcon name="arrow-left" size={20} color="#1A3067" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Profile</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView contentContainerStyle={styles.guestScroll}>
          {/* Admin Shield Banner */}
          <View style={styles.adminBanner}>
            <View style={styles.shieldWrapper}>
              <CustomIcon name="shield-alt" size={48} color="#fff" />
            </View>
            <View style={styles.adminBadgeRow}>
              <CustomIcon name="lock" size={11} color="#fff" />
              <Text style={styles.adminBadgeText}>RESTRICTED ACCESS</Text>
            </View>
            <Text style={styles.adminBannerTitle}>Admin Panel</Text>
            <Text style={styles.adminBannerSub}>
              This section is exclusively for authorized administrators of Orbit Media Solutions.
            </Text>
          </View>

          {/* Warning Card */}
          <View style={styles.warningCard}>
            <View style={styles.warningIconBox}>
              <CustomIcon name="exclamation-triangle" size={20} color="#d97706" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.warningTitle}>Not for regular users</Text>
              <Text style={styles.warningText}>
                If you are a customer or visitor, you do not need to log in here. Browse our products and services freely.
              </Text>
            </View>
          </View>

          {/* Emergency Support — available to ALL users */}
          <TouchableOpacity
            style={styles.supportBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Contact")}
          >
            <View style={styles.supportBtnIcon}>
              <CustomIcon name="headset" size={20} color="#1A3067" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportBtnTitle}>Emergency Support</Text>
              <Text style={styles.supportBtnSub}>Available to everyone · 24/7</Text>
            </View>
            <CustomIcon name="chevron-right" size={13} color="#1A3067" />
          </TouchableOpacity>

          {/* Login Button */}
          <View style={styles.loginSection}>
            <Text style={styles.loginHint}>Are you an administrator?</Text>
            <TouchableOpacity
              style={styles.adminLoginBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Login")}
            >
              <CustomIcon name="user-shield" size={18} color="#fff" />
              <Text style={styles.adminLoginBtnText}>Admin Login</Text>
            </TouchableOpacity>
            <Text style={styles.loginDisclaimer}>
              Unauthorized access attempts are monitored and logged.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- ADMIN LOGGED IN VIEW ---
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
          <CustomIcon name="arrow-left" size={20} color="#1A3067" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Admin Profile</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1A3067" />
        }
      >
        {/* Admin Profile Header */}
        <View style={styles.adminProfileHeader}>
          <View style={styles.adminAvatarWrapper}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <CustomIcon name="user-shield" size={40} color="#fff" />
              </View>
            )}
            {/* Admin badge on avatar */}
            <View style={styles.avatarBadge}>
              <CustomIcon name="shield-alt" size={10} color="#fff" />
            </View>
          </View>

          <Text style={styles.adminName}>{user?.displayName || "Administrator"}</Text>
          <Text style={styles.adminEmail}>{user?.email}</Text>

          {/* Admin role pill */}
          <View style={styles.adminRolePill}>
            <CustomIcon name="lock" size={10} color="#1A3067" />
            <Text style={styles.adminRoleText}>ADMINISTRATOR</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionLabel}>Account</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("UpdateProfile")}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBox}>
                <CustomIcon name="user-edit" size={17} color="#1A3067" />
              </View>
              <View>
                <Text style={styles.menuTitle}>Edit Profile</Text>
                <Text style={styles.menuSubtitle}>Update name, photo & info</Text>
              </View>
            </View>
            <CustomIcon name="chevron-right" size={13} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Contact")}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBox}>
                <CustomIcon name="headset" size={17} color="#1A3067" />
              </View>
              <View>
                <Text style={styles.menuTitle}>Emergency Support</Text>
                <Text style={styles.menuSubtitle}>Contact & escalation options</Text>
              </View>
            </View>
            <CustomIcon name="chevron-right" size={13} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.menuSection}>
          <Text style={[styles.menuSectionLabel, { color: "#ef4444" }]}>Danger Zone</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconBox, { backgroundColor: "#fff1f2" }]}>
                <CustomIcon name="sign-out-alt" size={17} color="#ef4444" />
              </View>
              <View>
                <Text style={[styles.menuTitle, { color: "#ef4444" }]}>Sign Out</Text>
                <Text style={styles.menuSubtitle}>End your admin session</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconBox, { backgroundColor: "#fef2f2" }]}>
                <CustomIcon name="user-times" size={17} color="#ef4444" />
              </View>
              <View>
                <Text style={[styles.menuTitle, { color: "#ef4444" }]}>Delete Account</Text>
                <Text style={styles.menuSubtitle}>Permanently remove admin account</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          Orbit Media Solutions · Admin Portal · All actions are logged
        </Text>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
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
  headerText: { fontSize: 17, fontWeight: "700", color: "#1A3067" },
  backBtn: { padding: 4 },

  // ── GUEST VIEW ──────────────────────────────────────────
  guestScroll: { paddingBottom: 40 },

  adminBanner: {
    backgroundColor: "#1A3067",
    paddingTop: 40,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  shieldWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  adminBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
  },
  adminBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  adminBannerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },
  adminBannerSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },

  warningCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fffbeb",
    margin: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fde68a",
    gap: 12,
  },
  warningIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400e",
    marginBottom: 4,
  },
  warningText: {
    fontSize: 13,
    color: "#78350f",
    lineHeight: 19,
  },

  featureCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eef0f5",
  },
  featureCardTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#9ca3af",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    gap: 12,
  },
  featureIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#f0f3ff",
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: { fontSize: 14, color: "#374151", fontWeight: "500" },

  loginSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  loginHint: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 14,
    fontWeight: "500",
  },
  adminLoginBtn: {
    backgroundColor: "#1A3067",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    marginBottom: 14,
  },
  adminLoginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  loginDisclaimer: {
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 17,
  },

  supportBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f3ff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    gap: 12,
  },
  supportBtnIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  supportBtnTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A3067",
    marginBottom: 2,
  },
  supportBtnSub: {
    fontSize: 12,
    color: "#6b7280",
  },

  // ── LOGGED IN ADMIN VIEW ──────────────────────────────────
  scrollContent: { paddingBottom: 40 },

  adminProfileHeader: {
    backgroundColor: "#1A3067",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 36,
  },
  adminAvatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
  },
  avatarBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1A3067",
  },
  adminName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  adminEmail: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    marginBottom: 14,
  },
  adminRolePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  adminRoleText: {
    color: "#1A3067",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  menuSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: "#eef0f5",
  },
  menuSectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9ca3af",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#f0f3ff",
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: { fontSize: 15, color: "#1f2937", fontWeight: "600" },
  menuSubtitle: { fontSize: 12, color: "#9ca3af", marginTop: 2 },

  footerNote: {
    textAlign: "center",
    fontSize: 11,
    color: "#c0c4ce",
    marginTop: 24,
    marginHorizontal: 20,
    lineHeight: 17,
  },
   // Legal
  legalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  legalTxt:  { fontSize: 11.5, color: "#C0CADF", fontWeight: "500" },
  legalLink: {
    fontSize: 11.5, color: "#1A3067",
    fontWeight: "800", textDecorationLine: "underline",
  },
});