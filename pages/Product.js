import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Better for mobile notches
import Advertisements from "../components/Advertisements";
import Navbar from '../components/Navbar';
import CustomIcon from '../components/CustomIcon';

export default function Product({ navigation }) {
  const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.screenWrapper} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={handleSafeBack}
          activeOpacity={0.7}
        >
          <CustomIcon name="arrow-left" size={22} color="#1A3067" />
        </TouchableOpacity>
        
        <Text style={styles.headerText}>Product Gallery</Text>
        <View style={{ width: 22 }} /> 
      </View>

      <View style={styles.content}>
        <Advertisements />
      </View>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#1A3067" },
  backBtn: {
    padding: 5,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
});