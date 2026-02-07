import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Alert,
  Platform,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../components/CustomIcon";

const BASE_URL = "https://orbitmediasolutions.com/";

export default function Contact({ navigation }) {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/contact`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.success && json.data?.setting) {
        setContactInfo(json.data.setting);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchInfo();
  }, []);

 
  const openLink = async (url) => {
  if (!url || url === "0") return;

  const isEmail = url.startsWith("mailto:");
  const isPhone = url.startsWith("tel:");
  const isSpecialScheme = isEmail || isPhone || url.startsWith("whatsapp:");

  let fullUrl = url;
  if (!isSpecialScheme && !url.startsWith("http")) {
    fullUrl = `https://${url}`;
  }

  try {
    const supported = await Linking.canOpenURL(fullUrl);

    if (supported) {
      await Linking.openURL(fullUrl);
    } else {
      if (isEmail) {
        const emailAddress = url.replace("mailto:", "");
        const webMailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
        await Linking.openURL(webMailUrl);
      } else {
        Alert.alert("Notice", "This action is not supported on this device.");
      }
    }
  } catch (error) {
    console.error("Linking Error:", error);
    Alert.alert("Error", "An unexpected error occurred while trying to open the link.");
  }
};
  const handleOpenMap = () => {
    const address = contactInfo?.uk_address;
    if (!address) return;

    const label = "Orbit Media Solutions";
    const encodedAddress = encodeURIComponent(address);

    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    });

    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      );
    });
  };

  const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
          <CustomIcon name="arrow-left" size={22} color="#1A3067" />
        </TouchableOpacity>

        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>Contact Us</Text>
          <Text style={styles.headerSubText}>We're here to help</Text>
        </View>

        <View style={{ width: 32 }} />
      </View>

      {loading ? (
        <View style={styles.loaderCenter}>
          <ActivityIndicator size="large" color="#1A3067" />
        </View>
      ) : (
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
          {contactInfo ? (
            <View style={styles.infoCard}>
              <View style={styles.directorSection}>
                <Text style={styles.label}>Director</Text>
                <Text style={styles.director}>{contactInfo.director_name}</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.itemBlock}>
                <Text style={styles.label}>UK Office</Text>
                <Text style={styles.contactText}>{contactInfo.uk_address}</Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  activeOpacity={0.8}
                  onPress={handleOpenMap}
                >
                  <CustomIcon name="map-marker-alt" size={14} color="#fff" />
                  <Text style={styles.mapButtonText}>View on Maps</Text>
                </TouchableOpacity>
              </View>

              {/* Website Link Section */}
              <TouchableOpacity
                style={styles.itemBlock}
                activeOpacity={0.7}
                onPress={() => openLink(BASE_URL)}
              >
                <Text style={styles.label}>Official Website</Text>
                <View style={styles.linkRow}>
                  <Text style={styles.linkText}>orbitmediasolutions.com</Text>
                  <CustomIcon name="globe" size={12} color="#2B5CE7" />
                </View>
              </TouchableOpacity>

              {/* Phone Section */}
              <TouchableOpacity
                style={styles.itemBlock}
                activeOpacity={0.7}
                onPress={() => openLink(`tel:${contactInfo.contact_phone}`)}
              >
                <Text style={styles.label}>Phone</Text>
                <View style={styles.linkRow}>
                  <Text style={styles.linkText}>
                    {contactInfo.contact_phone}
                  </Text>
                  <CustomIcon name="phone-alt" size={12} color="#2B5CE7" />
                </View>
              </TouchableOpacity>

              {/* Email Section */}
              <TouchableOpacity
                style={styles.itemBlock}
                activeOpacity={0.7}
                onPress={() => openLink(`mailto:${contactInfo.contact_email}`)}
              >
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.linkRow}>
                  <Text style={styles.linkText}>
                    {contactInfo.contact_email}
                  </Text>
                  <CustomIcon name="envelope" size={12} color="#2B5CE7" />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Could not load contact details.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  loaderCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  titleWrapper: { alignItems: "center" },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
  headerSubText: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  backBtn: { padding: 5 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  infoCard: {
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      },
      android: { elevation: 3 },
      web: { boxShadow: "0px 4px 10px rgba(0,0,0,0.05)" },
    }),
  },
  directorSection: { marginBottom: 5 },
  director: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  separator: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 20 },
  itemBlock: { marginBottom: 22 },
  label: {
    fontSize: 10,
    color: "#1A3067",
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 1,
  },
  contactText: { fontSize: 15, color: "#4b5563", lineHeight: 22 },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkText: {
    fontSize: 16,
    color: "#2B5CE7",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A3067",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 8,
  },
  emptyContainer: { flex: 1, alignItems: "center", marginTop: 50 },
  emptyText: { color: "#9ca3af", fontSize: 14 },
});
