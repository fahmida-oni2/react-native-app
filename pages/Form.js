import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../components/CustomIcon";

export default function Form({ navigation }) {
  const [refreshing, setRefreshing] = useState(false); 

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      bio: "",
    },
  });


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reset(); 
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [reset]);

  const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  const onSubmit = async (data) => {
    const subject = `New Inquiry from ${data.firstName} ${data.lastName}`;
    const body = `Name: ${data.firstName} ${data.lastName}\nPhone: ${data.phoneNumber}\n\nMessage: ${data.bio}`;
    const url = `mailto:info@orbitmediasolutions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert(
        "Support",
        "Could not open your email app. Please email us directly at info@orbitmediasolutions.com"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
          <CustomIcon name="arrow-left" size={22} color="#1A3067" />
        </TouchableOpacity>
        
        <View style={styles.titleWrapper}>
          <Text style={styles.headerText}>Get in Touch</Text>
          <Text style={styles.headerSubText}>We typically reply within 24 hours</Text>
        </View>
        
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex1}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={["#1A3067"]} 
              tintColor="#1A3067" 
            />
          }
        >
          <View style={styles.infoCard}>
            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>First Name</Text>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. John"
                      placeholderTextColor="#9ca3af"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              <View style={[styles.flex1, { marginLeft: 15 }]}>
                <Text style={styles.label}>Last Name</Text>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Smith"
                      placeholderTextColor="#9ca3af"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            </View>

            <Text style={styles.label}>Phone Number</Text>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="+1-202-555-0174"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Text style={styles.label}>Your Message</Text>
            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Tell us how we can help..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={4}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitBtnText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  flex1: { flex: 1 },
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
  scrollContent: { padding: 20, paddingBottom: 40 },
  infoCard: {
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
      android: { elevation: 3 },
      web: { boxShadow: "0px 4px 10px rgba(0,0,0,0.05)" },
    }),
  },
  row: { flexDirection: "row" },
  label: {
    fontSize: 11,
    color: "#1A3067",
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
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
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitBtn: {
    flexDirection: "row",
    backgroundColor: "#1A3067",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
});