import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

export default function Advertisements() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const BASE_URL = 'https://theorbit.one/';

    const getPosts = async () => {
        try {
            const response = await fetch('https://theorbit.one/api/all-products');
            const json = await response.json();
            setData(json.products.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>Explore our all products</Text>

            {isLoading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (

                data.map((item, index) => (
                    <View key={item.id || index} style={styles.card}>
                        <Image
                            source={{ uri: `${BASE_URL}${item.product_image}` }}
                            style={{ height: 100, width: 100, resizeMode: "cover", marginLeft:100 }}

                        />
                        <Text style={styles.title}>
                            {item.banner_title || "No Title Found"}
                        </Text>
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigation.navigate('ProductDetails', { product: item })}
                        >
                            <Text style={styles.detailsButtonText}>View Details</Text>
                        </TouchableOpacity>


                    </View>
                ))

            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        marginBottom: 50
    },

    contentContainer: {
        // paddingTop: 50,
        paddingBottom: 50,
        alignItems: "center",
        alignSelf: 'stretch',

    },
     header: { fontSize: 24, fontWeight: 'bold', marginTop: 50, textAlign: 'center', color: 'purple' },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: "center",
        marginTop: 10
    },
    body: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,

    },
    detailsButton: { backgroundColor: 'purple', padding: 15, borderRadius: 8, alignItems: 'center' },
    detailsButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});