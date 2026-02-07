import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from './CustomIcon';

const { width } = Dimensions.get('window');
// Adjusted margin and padding for better calculation
const COLUMN_WIDTH = (width - 40) / 2;
const BASE_URL = 'https://orbitmediasolutions.com/';

export default function Advertisements() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const getPosts = async () => {
        try {
            const response = await fetch(`${BASE_URL}api/all-products`);
            const json = await response.json();
            setData(json.products || []);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getPosts();
    }, []);

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <View style={styles.cardInner}>
                
                <Image
                    source={{ uri: `${BASE_URL}${item.product_image}` }}
                    style={styles.image}
                />

                <View style={styles.infoContainer}>
                        <Text style={styles.categoryTag}>PRODUCT</Text>
                    <Text style={styles.title} numberOfLines={2}>
                        {item.banner_title || "No Title Found"}
                    </Text>
                      <View style={styles.readMoreRow}>
          <Text style={styles.readMoreText}>View Details</Text>
          <CustomIcon name="chevron-right" size={10} color="#1A3067" />
        </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1A3067" />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No products available.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginBottom:70
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10
    },
    card: {
        width: COLUMN_WIDTH,
        margin: 5,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        // Improved Shadow for Mobile
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardInner: {
        overflow: 'hidden',
        borderRadius: 15,
    },
    image: {
        width: '100%',
        height: 130,
        backgroundColor: '#f3f4f6',
        resizeMode: "cover",
    },
    infoContainer: {
        padding: 12,
        alignItems: 'start',
    },
    title: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: "start",
        height: 38,
        lineHeight: 18,
    },
    viewButton: {
        marginTop: 8,
        fontSize: 11,
        color: '#1A3067',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    emptyText: {
        fontSize: 14,
        color: '#9ca3af',
    },
      categoryTag: { fontSize: 9, fontWeight: "800", color: "#6366F1", marginBottom: 6 },
      readMoreRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  readMoreText: { fontSize: 11, color: "#1A3067", fontWeight: "700", marginRight: 4 },
});