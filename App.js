import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./pages/Home";
import ProductScreen from "./pages/Product";
import ServiceScreen from "./pages/Service";
import LoginScreen from "./pages/Login";
import SignUpScreen from "./pages/SignUp";
import UpdateScreen from "./pages/UpdateProfile";
import DetailsScreen from "./pages/ProductDetails";
import DetailsServScreen from "./pages/ServiceDetails";
import ContactScreen from "./pages/Contact";
import CartScreen from "./pages/Order";
import BlogScreen from "./pages/Blogs";
import WelcomeScreen from "./pages/Welcome"
import BlogDetailsScreen from "./pages/BlogDetails";
import Form from "./pages/Form";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import ProfileScreen from "./pages/Profile";
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs([
  "Warning: TRenderEngineProvider: Support for defaultProps",
  "Warning: MemoizedTNodeRenderer: Support for defaultProps",
  "Warning: TNodeChildrenRenderer: Support for defaultProps",
  "Warning: bound renderChildren: Support for defaultProps",
  "props.pointerEvents is deprecated",
]);
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    "FA7-Brands": require("./assets/fonts/Font Awesome 7 Brands-Regular-400.otf"),
    "FA7-Regular": require("./assets/fonts/Font Awesome 7 Free-Regular-400.otf"),
    "FA7-Solid": require("./assets/fonts/Font Awesome 7 Free-Solid-900.otf"),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (loading || (!fontsLoaded && !fontError)) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <View style={styles.mainContainer}>
            <Stack.Navigator 
              initialRouteName="Welcome" 
              screenOptions={{ headerShown: false }}
            >
              {/* Common Screens available to everyone */}
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="Service" component={ServiceScreen} />
              <Stack.Screen name="ProductDetails" component={DetailsScreen} />
              <Stack.Screen name="ServiceDetails" component={DetailsServScreen} />
              <Stack.Screen name="Blogs" component={BlogScreen} />
              <Stack.Screen name="BlogDetails" component={BlogDetailsScreen} />
              <Stack.Screen name="Contact" component={ContactScreen} />
              
              {/* Auth Screens */}
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />

              {/* Private Screens */}
              <Stack.Screen name="UpdateProfile" component={UpdateScreen} />
              <Stack.Screen name="Order" component={CartScreen} />
              <Stack.Screen name="Form" component={Form} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </SafeAreaView>

      <Toast topOffset={60} visibilityTime={1000} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mainContainer: { flex: 1 },
});
