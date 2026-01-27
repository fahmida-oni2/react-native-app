import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/orbitLogo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to Orbit</Text>
      <Text style={styles.subtitle}>Smart solutions for your business.</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 30 ,borderRadius:23},
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A3067' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 20 },
  button: { backgroundColor: '#1A3067', paddingVertical: 15, paddingHorizontal: 60, borderRadius: 30 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});