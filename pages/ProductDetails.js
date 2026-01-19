import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import Toast from 'react-native-toast-message';
import CustomIcon from '../components/CustomIcon';
export default function ProductDetails({ route, navigation }) {
    const { product } = route.params;
    const BASE_URL = 'https://theorbit.one/';
    const BACKEND_URI = 'https://react-native-server-three.vercel.app';


    const handleAddToCart = async () => {
        const userEmail = auth.currentUser?.email;

        if (!userEmail) {
            Alert.alert("Login Required", "Please log in to add items to your cart.", [
                { text: "Cancel" },
                { text: "Login", onPress: () => navigation.navigate('Login') }
            ]);
            return;
        }

        try {

            const response = await fetch(`${BACKEND_URI}/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    productId: product.id,
                    banner_title: product.banner_title,
                    product_image: product.product_image,
                    banner_description: product.banner_description,
                    quantity: 1
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Added to Order List',
                });
            } else {
                throw new Error(result.message || "Failed to add to cart");
            }

        } catch (error) {
            console.error("Cart Sync Error:", error);
            Alert.alert("Error", "Could not save to server. Check your connection.");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <CustomIcon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <ScrollView style={styles.container}>
                <Image
                    source={{ uri: `${BASE_URL}${product.product_image}` }}
                    style={styles.fullImage}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{product.banner_title}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.label}>Product Description</Text>
                    <Text style={styles.description}>{product.banner_description}</Text>

                    <TouchableOpacity style={styles.buyNow} onPress={handleAddToCart}>
                        <Text style={styles.buyNowText}>Order Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },
    fullImage: { width: '100%', height: 400, resizeMode: 'cover' },
    infoContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: 'white',textAlign:'left' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 5 },
    description: { fontSize: 15, color: '#666', lineHeight: 22 ,textAlign:'justify'},
    buyNow: { backgroundColor: 'purple', padding: 18, borderRadius: 15, marginTop: 30, alignItems: 'center' },
    buyNowText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});