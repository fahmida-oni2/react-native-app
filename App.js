import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import HomeScreen from "./pages/Home";
import ProductScreen from "./pages/Product";
import LoginScreen from "./pages/Login";
import SignUpScreen from "./pages/SignUp";
import UpdateScreen from "./pages/UpdateProfile";
import DetailsScreen from "./pages/ProductDetails";
import CartScreen from "./pages/Cart";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
   <>
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (

              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Product" component={ProductScreen} />
                <Stack.Screen name="UpdateProfile" component={UpdateScreen} />
                 <Stack.Screen name="ProductDetails" component={DetailsScreen} />
                  <Stack.Screen name="Cart" component={CartScreen} />
              </>
            ) : (

              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
            )}
          </Stack.Navigator>
        </View>
      </SafeAreaView>
      
    </NavigationContainer>
      <Toast />
   </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mainContainer: { flex: 1 }
});