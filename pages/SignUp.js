import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"; // Added signOut
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "../components/CustomIcon";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

 
      const response = await fetch(
        "https://react-native-server-three.vercel.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: firebaseUser.email,
            uid: firebaseUser.uid,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Account created but failed to sync with server.");
      }

      navigation.replace("Login");
      
    } catch (error) {
      Alert.alert("Error", error.message || "SignUp failed");
    } finally {
      setLoading(false);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
        <CustomIcon name="arrow-left" size={30} color="#1A3067" />
      </TouchableOpacity>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Text style={styles.title}>Create Account</Text>

              <TextInput
                placeholder="Email"
                placeholderTextColor="#999999"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#999999"
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <CustomIcon name={showPassword ? "eye-slash" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#999999"
                style={styles.input}
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity 
                style={[styles.button, loading && { opacity: 0.7 }]} 
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text style={styles.buttonText}>{loading ? "Creating Account..." : "Register"}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>
                  Already have an account? <Text style={styles.linkButton}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { padding: 20, backgroundColor: "#fff", justifyContent: "center", minHeight: "100%" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 40, textAlign: "center", color: "#1A3067" },
  input: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginBottom: 20, padding: 10, fontSize: 16, color: "#333" },
  passwordWrapper: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc", marginBottom: 20, alignItems: "center" },
  passwordInput: { flex: 1, padding: 10, fontSize: 16, color: "#000" },
  eyeIcon: { padding: 10 },
  button: { backgroundColor: "#1A3067", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  linkText: { color: "#1A3067", textAlign: "center", marginTop: 20 },
  linkButton: { fontWeight: "bold" },
  backBtn: { position: "absolute", top: 1, left: 20, zIndex: 10, borderRadius: 20 },
});