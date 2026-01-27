import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "../components/CustomIcon";

export default function UpdateProfile() {
  const [name, setName] = useState(auth.currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL || null);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  const removeImage = () => setPhotoURL("");
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

      Alert.alert("Success", "Profile Updated Successfully");

      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate("Home");
        }
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
          <CustomIcon name="arrow-left" size={30} color="#1A3067" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Update Profile</Text>
        <Text style={styles.headerSubText}>
          Update your personal information and photo.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoCard}>
          <View style={styles.imageSection}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.imagePlaceholder}
            >
              {photoURL ? (
                <Image source={{ uri: photoURL }} style={styles.profileImage} />
              ) : (
                <View style={styles.iconCircle}>
                  <CustomIcon name="user" size={40} color="#1A3067" />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.imageActionRow}>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.imageHint}>Change Photo</Text>
              </TouchableOpacity>
              {photoURL && (
                <TouchableOpacity onPress={removeImage}>
                  <Text
                    style={[styles.imageHint, { color: "red", marginLeft: 15 }]}
                  >
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
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#1A3067" },
  headerSubText: { fontSize: 13, color: "#666", marginTop: 4 },
  backBtn: {
    position: "absolute",
    top: 1,
    left: 20,
    zIndex: 10,
    borderRadius: 20,
  },
  scrollContent: { alignItems: "center", paddingTop: 15, paddingBottom: 80 },
  infoCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: { color: "#1A3067", fontSize: 14, marginBottom: 8, fontWeight: "600" },
  input: {
    backgroundColor: "#fcfcfc",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    color: "#333",
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#1A3067",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#1A3067",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  imageSection: { alignItems: "center", marginBottom: 25 },
  imagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1A3067",
  },
  profileImage: { width: "100%", height: "100%" },
  iconCircle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageActionRow: { flexDirection: "row", marginTop: 10 },
  imageHint: { fontSize: 14, color: "#1A3067", fontWeight: "600" },
});
