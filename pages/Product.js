import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Advertisements from "../components/Advertisements";
import Navbar from '../components/Navbar';

export default function Product({ navigation }) {
    return (
        <View style={styles.screenWrapper}>
            <ScrollView style={styles.container}>
                <View style={styles.content}>

                    <View style={styles.adWrapper}>
                        <Advertisements />
                    </View>


                </View>
            </ScrollView>
            <Navbar></Navbar>
        </View>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: '#fff',
      
    },
    container: {
        flex: 1,
    },
    content: {
        paddingVertical: 20
    },
    adWrapper: {
        width: '100%',
    },
 
});