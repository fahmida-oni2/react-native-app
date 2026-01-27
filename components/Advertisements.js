import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40) / 2;

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

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <View style={styles.cardInner}>
                <Image
                    source={{ uri: `${BASE_URL}${item.product_image}` }}
                    style={styles.image}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item.banner_title || "No Title Found"}
                    </Text>
                    <Text style={styles.viewButton}>View Details</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Flagship Systems</Text>
                <Text style={styles.headerSubText}>Next-generation software tailored for modern business</Text>
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#1A3067" />
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderProductItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No products available.</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        paddingTop: 25,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    headerText: { fontSize: 24, fontWeight: 'bold', color: '#1A3067' },
    headerSubText: { fontSize: 13, color: '#666', marginTop: 4 },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 80,
        paddingTop:10
    },
    card: {
        width: COLUMN_WIDTH,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardInner: {
        overflow: 'hidden',
        borderRadius: 15,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: "cover",
    },
    infoContainer: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: "center",
        height: 40, 
    },
    viewButton: {
        marginTop: 5,
        fontSize: 12,
        color: '#1A3067',
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    }
});