import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, ActivityIndicator } from "react-native";
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import ProductMarquee from '../components/ProductMarquee';

export default function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);
const [products, setProducts] = useState([]);

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://theorbit.one/api/all-products');
            const json = await response.json();
            setProducts(json.products.data || []);
        } catch (error) {
            console.error("Marquee Fetch Error:", error);
        }
    };
    fetchProducts();
}, []);
    useFocusEffect(
        useCallback(() => {
            setDisplayName(auth.currentUser?.displayName);
        }, [])
    );

    const handleLogout = () => {
        setModalVisible(false);
        Alert.alert("Logout", "Are you sure you want to sign out?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: () => signOut(auth).catch(err => console.log(err)) }
        ]);
    };

    return (
        <View style={styles.container}>
           
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/pic.png')} style={styles.logo} />
                    <Text style={styles.headerTitle}>My Store</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="person-circle" size={45} color="purple" />
                </TouchableOpacity>
            </View>

           
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.profileHeader}>
                            <Ionicons name="person-circle" size={60} color="purple" />
                            <Text style={styles.profileName}>{displayName || "No Name Set"}</Text>
                            <Text style={styles.profileEmail}>{auth.currentUser?.email}</Text>
                        </View>
                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('UpdateProfile');
                            }}
                        >
                            <Ionicons name="person-outline" size={20} color="#333" />
                            <Text style={styles.modalText}>Update Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalItem, styles.logoutItem]} onPress={handleLogout}>
                            <Ionicons name="log-out-outline" size={20} color="#ff4444" />
                            <Text style={styles.logoutLabel}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.banner}>
                    <Text style={styles.bannerText}>Welcome to My Store</Text>
                </View>

           <ProductMarquee data={products} />
                
            
                <View style={{ height: 100 }} />
            </ScrollView>

            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    logoContainer: { flexDirection: 'row', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'purple', marginLeft: 10 },
    logo: { width: 40, height: 40, borderRadius: 20 },
    scrollContent: { alignItems: 'center' },
    banner: { width: '90%', height: 100, backgroundColor: 'purple', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
    bannerText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 110, paddingRight: 20 },
    modalContent: { backgroundColor: 'white', borderRadius: 15, padding: 20, width: 250, elevation: 5 },
    profileHeader: { alignItems: 'center', marginBottom: 15 },
    profileName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    profileEmail: { fontSize: 14, color: '#666' },
    separator: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
    modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    modalText: { marginLeft: 10, fontSize: 16, color: '#333' },
    logoutLabel: { marginLeft: 10, fontSize: 16, color: '#ff4444', fontWeight: 'bold' }
});