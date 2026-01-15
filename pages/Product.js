import React from 'react';
import { View, StyleSheet } from "react-native";
import Advertisements from "../components/Advertisements";
import Navbar from '../components/Navbar';

export default function Product() {
    return (
        <View style={styles.screenWrapper}>
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
});