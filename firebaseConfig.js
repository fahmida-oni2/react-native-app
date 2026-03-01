
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "orbit-app-36f85.firebaseapp.com",
  projectId: "orbit-app-36f85",
  storageBucket: "orbit-app-36f85.firebasestorage.app",
  messagingSenderId: "109654948233",
  appId: "1:109654948233:web:f44540639fe035bce64958"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});