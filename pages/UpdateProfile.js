import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Platform,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../firebaseConfig";
import { updateProfile, reload } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "../components/CustomIcon";

export default function UpdateProfile() {
  const [name, setName] = useState(auth.currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL || null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await reload(auth.currentUser);
    setName(auth.currentUser?.displayName || "");
    setPhotoURL(auth.currentUser?.photoURL || null);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        "Permission Denied", 
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  const removeImage = () => setPhotoURL(null);

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || "",
      });

      await reload(auth.currentUser);
      Alert.alert("Success", "Profile Updated Successfully");

      setTimeout(() => {
        handleSafeBack();
      }, 1000);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
          <CustomIcon name="arrow-left" size={22} color="#1A3067" />
        </TouchableOpacity>
        
        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>Update Profile</Text>
          <Text style={styles.headerSubText}>Manage your identity</Text>
        </View>
        
        <View style={{ width: 32 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1A3067" />
        }
      >
        <View style={styles.infoCard}>
          <View style={styles.imageSection}>
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.8}
              style={styles.imagePlaceholder}
            >
              {photoURL ? (
                <Image source={{ uri: photoURL }} style={styles.profileImage} />
              ) : (
                <View style={styles.iconCircle}>
                  <CustomIcon name="user-circle" size={40} color="#1A3067" />
                </View>
              )}
              
         
              <View style={styles.editBadge}>
                <CustomIcon name="camera" size={14} color="#fff" />
              </View>
            </TouchableOpacity>

            <View style={styles.imageActionRow}>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.imageHint}>Change Photo</Text>
              </TouchableOpacity>
              {photoURL && (
                <TouchableOpacity onPress={removeImage}>
                  <Text style={[styles.imageHint, { color: "#ef4444", marginLeft: 20 }]}>
                    Remove
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={styles.label}>Display Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#9ca3af"
          />

          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleUpdate}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  titleWrapper: { alignItems: 'center' },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
  headerSubText: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  backBtn: { padding: 5 },
  
  scrollContent: { padding: 20, alignItems: "center" },
  infoCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
      android: { elevation: 3 },
      web: { boxShadow: "0px 4px 10px rgba(0,0,0,0.05)" },
    }),
  },
  imageSection: { alignItems: "center", marginBottom: 30 },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    position: 'relative',
  },
  profileImage: { width: "100%", height: "100%", borderRadius: 60 },
  iconCircle: { justifyContent: 'center', alignItems: 'center' },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1A3067',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  imageActionRow: { flexDirection: "row", marginTop: 15 },
  imageHint: { fontSize: 13, color: "#1A3067", fontWeight: "700" },
  label: { fontSize: 11, color: "#1A3067", fontWeight: "800", textTransform: "uppercase", marginBottom: 8, letterSpacing: 0.5 },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    color: "#1f2937",
    fontSize: 15,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#1A3067",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});