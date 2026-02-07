
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth ,getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "react-native-app-8f071.firebaseapp.com",
  projectId: "react-native-app-8f071",
  storageBucket: "react-native-app-8f071.firebasestorage.app",
  messagingSenderId: "73564790980",
  appId: "1:73564790980:web:b45a86165b46b307232991"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});