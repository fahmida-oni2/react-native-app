import React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Advertisements from "../components/Advertisements";
import Navbar from '../components/Navbar';
import CustomIcon from '../components/CustomIcon';
export default function Product({navigation}) {
     const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };
    return (
        <View style={styles.screenWrapper}>
            <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
                <CustomIcon name="arrow-left" size={30} color="purple" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Advertisements />
            </View>

            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    backBtn: { position: 'absolute', top: 30, left: 20, zIndex: 10,  borderRadius: 20 },
});