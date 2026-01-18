import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import Navbar from '../components/Navbar';
import Toast from 'react-native-toast-message';
import CustomIcon from '../components/CustomIcon';
export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://theorbit.one/';
    const NGROK_URL = 'https://react-native-server-three.vercel.app';

    useFocusEffect(
        React.useCallback(() => {
            loadCartFromServer();
        }, [])
    );

    const loadCartFromServer = async () => {
        const userEmail = auth.currentUser?.email;
        if (!userEmail) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${NGROK_URL}/my-cart?email=${userEmail}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error("Error loading cart:", error);
        } finally {
            setLoading(false);
        }
    };
    const removeItem = async (productId) => {
        const userEmail = auth.currentUser?.email;

        try {
            const response = await fetch(
                `${NGROK_URL}/product?email=${userEmail}&productId=${productId}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const data = await response.json();

            if (response.ok) {
                if (data.action === "decreased") {

                    setCartItems(prev => prev.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ));
                    Toast.show({ type: 'info', text1: 'Quantity Updated', text2: '-1 item' });
                } else {

                    setCartItems(prev => prev.filter(item => item.productId !== productId));
                    Toast.show({ type: 'info', text1: 'Item Removed', text2: 'Cart updated successfully.' });
                }
            } else {
                Alert.alert("Error", "Could not update cart.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            Alert.alert("Error", "Check your connection.");
        }
    };



    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: `${BASE_URL}${item.product_image}` }} style={styles.img} />
            <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.title} numberOfLines={1}>{item.banner_title}</Text>
                <Text style={styles.qty}>Quantity: {item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.productId)} style={styles.deleteBtn}>
                <CustomIcon name="trash-alt" size={20} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Cart</Text>
                <Text style={styles.headerSubText}>Manage your item</Text>
            </View>



            {loading ? (
                <ActivityIndicator size="large" color="purple" style={{ marginTop: 50 }} />
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
                        contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
                    />

                </>
            )}

            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    headerText: { fontSize: 24, fontWeight: 'bold', color: 'purple' },
    headerSubText: { fontSize: 13, color: '#666', marginTop: 4 },
    card: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
    },
    img: { width: 70, height: 70, borderRadius: 12 },
    title: { fontWeight: 'bold', fontSize: 16, color: '#333' },
    price: { color: 'purple', fontWeight: 'bold', fontSize: 15, marginTop: 2 },
    qty: { color: '#777', fontSize: 13, marginTop: 2 },
    deleteBtn: { padding: 10 },
    empty: { textAlign: 'center', marginTop: 100, color: 'gray', fontSize: 16 },


    footer: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 20,
    },
    totalLabel: { color: '#999', fontSize: 14 },
    totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    checkoutBtn: {
        backgroundColor: 'purple',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
        alignItems: 'center'
    },
    checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});