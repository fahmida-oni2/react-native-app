import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Navbar from '../components/Navbar';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40) / 2;

export default function Service({ navigation }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://theorbit.one/';

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('https://theorbit.one/api/all-services');
            const json = await response.json();
            setServices(json.services.data || json.data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ServiceDetails', { service: item })}
        >
            <View style={styles.cardInner}>
                <Image
                    source={{ uri: `${BASE_URL}${item.service_image}` }}
                    style={styles.image}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.serviceTitle} numberOfLines={2}>
                        {item.banner_title}
                    </Text>
                    <Text style={styles.viewButton}>View Details</Text>
                </View>
            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Services Portfolio</Text>
                <Text style={styles.headerSubText}>Comprehensive services designed to optimize your operations</Text>
            </View>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="purple" />
                </View>
            ) : (
                <FlatList
                    data={services}
                    renderItem={renderServiceItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No services available at the moment.</Text>
                    }
                />
            )}
            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 80,
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
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 10,
        alignItems: 'center',
    },
    serviceTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        height: 40,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewButton: {
        marginTop: 5,
        fontSize: 12,
        color: 'purple',
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    }
});