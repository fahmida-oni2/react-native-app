import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import CustomIcon from "../components/CustomIcon";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 40) / 2;

export default function Service({ navigation }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "https://orbitmediasolutions.com/";

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("https://orbitmediasolutions.com/api/all-services");
      const json = await response.json();
      const data = json.services?.data || json.data || [];
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => navigation.navigate("ServiceDetails", { service: item })}
    >
      <Image
        source={{ uri: `${BASE_URL}${item.service_image}` }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.categoryTag}>SERVICE</Text>
        <Text style={styles.serviceTitle} numberOfLines={2}>
          {item.banner_title}
        </Text>
        <View style={styles.readMoreRow}>
          <Text style={styles.readMoreText}>View Details</Text>
          <CustomIcon name="chevron-right" size={10} color="#1A3067" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
        >
          <CustomIcon name="arrow-left" size={22} color="#1A3067" />
        </TouchableOpacity>
        
        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>Services Portfolio</Text>
        </View>
        
        <View style={{ width: 32 }} />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1A3067" />
        </View>
      ) : (
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={(item, index) => `service-${item.id || index}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No services available.</Text>
            </View>
          }
        />
      )}
      <Navbar />
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
  titleWrapper: { alignItems: 'center' },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
  headerSubText: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  backBtn: { padding: 5 },
  listContent: { 
    paddingTop: 10, 
    paddingBottom: 100,
    paddingHorizontal: 15, 
  },
  row: { 
    justifyContent: "space-between", 
    marginBottom: 15, 
  },
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...Platform.select({
      ios: { 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.08, 
        shadowRadius: 8 
      },
      android: { elevation: 3 },
    }),
    overflow: 'hidden',
  },
  image: { 
    width: "100%", 
    height: 120, 
    backgroundColor: '#f9fafb' 
  },
  infoContainer: { 
    padding: 12,
    backgroundColor: '#fff' 
  },
  categoryTag: { 
    fontSize: 8, 
    fontWeight: "800", 
    color: "#1A3067", 
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  serviceTitle: { 
    fontSize: 14, 
    fontWeight: "700", 
    color: "#1f2937", 
    height: 40, 
    lineHeight: 18 
  },
  readMoreRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f9fafb',
    paddingTop: 8
  },
  readMoreText: { 
    fontSize: 11, 
    color: "#1A3067", 
    fontWeight: "700", 
    marginRight: 4
  },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 50 },
  emptyText: { color: "#9ca3af", fontSize: 14 },
});