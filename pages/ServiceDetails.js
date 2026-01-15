import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ServiceDetails({ route, navigation }) {
    const { service } = route.params;
    const BASE_URL = 'https://theorbit.one/';


    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Image
                source={{ uri: `${BASE_URL}${service.service_image}` }}
                style={styles.fullImage}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{service.banner_title}</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Service Description</Text>
                <Text style={styles.description}>{service.banner_description}</Text>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },
    fullImage: { width: '100%', height: 400, resizeMode: 'cover' },
    infoContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: 'white' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    price: { fontSize: 22, color: 'purple', fontWeight: 'bold', marginVertical: 10 },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 5 },
    description: { fontSize: 15, color: '#666', lineHeight: 22 },
    buyNow: { backgroundColor: 'purple', padding: 18, borderRadius: 15, marginTop: 30, alignItems: 'center' },
    buyNowText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});