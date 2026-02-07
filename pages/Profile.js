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

  // --- GUEST VIEW ---
  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
            <CustomIcon name="arrow-left" size={22} color="#1A3067" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.headerText}>My Profile</Text>
          </View>
          <View style={{ width: 32 }} />
        </View>

        <View style={styles.guestContent}>
          <View style={styles.guestIconCircle}>
            <CustomIcon name="user-circle" size={80} color="#1A3067" />
          </View>
          <Text style={styles.guestTitle}>Welcome to Orbit</Text>
          <Text style={styles.guestSub}>
            Sign in to manage your services and access premium features.
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryBtnText}>Login</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity 
            style={styles.secondaryBtn} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.secondaryBtnText}>Create an Account</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    );
  }

  // --- USER VIEW ---
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
          <CustomIcon name="arrow-left" size={22} color="#1A3067" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>My Profile</Text>
          <Text style={styles.headerSubText}>Account Details</Text>
        </View>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#1A3067"
          />
        }
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <CustomIcon name="user-circle" size={70} color="#1A3067" />
              </View>
            )}
          </View>
          <Text style={styles.profileName}>
            {user?.displayName || "Member"}
          </Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>General</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("UpdateProfile")}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <CustomIcon name="user-edit" size={18} color="#1A3067" />
              </View>
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <CustomIcon name="chevron-right" size={14} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Contact")}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <CustomIcon name="headset" size={18} color="#1A3067" />
              </View>
              <Text style={styles.menuText}>Emergency Support</Text>
            </View>
            <CustomIcon name="chevron-right" size={14} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#fff1f2" }]}>
                <CustomIcon name="sign-out-alt" size={18} color="#ef4444" />
              </View>
              <Text style={styles.logoutLabel}>Sign Out</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleDeleteAccount} // We will define this function below
          >
            <View style={styles.menuLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#fef2f2" }]}>
                <CustomIcon name="user-times" size={18} color="#ef4444" />
              </View>
              <Text style={[styles.menuText, { color: "#ef4444" }]}>
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  titleWrapper: { alignItems: "center" },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
  headerSubText: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  backBtn: { padding: 5 },

  scrollContent: { paddingBottom: 40 },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 8,
    borderBottomColor: "#f9fafb",
  },
  avatarContainer: {
    padding: 4,
    borderRadius: 60,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 15,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  profileName: { fontSize: 22, fontWeight: "bold", color: "#1f2937" },
  profileEmail: { fontSize: 14, color: "#6b7280", marginTop: 4 },

  content: { padding: 20 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9ca3af",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 10,
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: { fontSize: 16, color: "#374151", fontWeight: "500" },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
  logoutLabel: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
  separator: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 15 },

  // Guest View
  guestContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  guestIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  guestTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A3067",
    marginBottom: 10,
  },
  guestSub: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  primaryBtn: {
    backgroundColor: "#1A3067",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryBtnText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  secondaryBtn: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1A3067",
  },
  secondaryBtnText: { color: "#1A3067", fontSize: 17, fontWeight: "bold" },
});
