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
import CustomIcon from '../components/CustomIcon';

const { width } = Dimensions.get('window');

const COLUMN_WIDTH = (width - 40) / 2;

export default function Blogs({ navigation }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://theorbit.one/';

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('https://theorbit.one/api/blog/page');
            const json = await response.json();
            setBlogs(json.data?.blogs?.data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderBlogItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BlogDetails', { blog: item })}
        >
            <View style={styles.cardInner}>
                <Image
                    source={{ uri: `${BASE_URL}${item.banner_image}` }}
                    style={styles.image}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.categoryTag}>Insights</Text>
                    <Text style={styles.blogTitle} numberOfLines={3}>
                        {item.blog_title}
                    </Text>
                    <View style={styles.readMoreRow}>
                        <Text style={styles.viewButton}>Read More</Text>
                        <CustomIcon name="chevron-right" size={10} color="#1A3067" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <CustomIcon name="arrow-left" size={30} color="#1A3067" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>Industry Insights</Text>
                <Text style={styles.headerSubText}>Expert perspectives on digital transformation</Text>
            </View>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#1A3067" />
                </View>
            ) : (
                <FlatList
                    data={blogs}
                    renderItem={renderBlogItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <CustomIcon
                                name="file-alt"
                                size={45}
                                color="#ccc"
                            />
                            <Text style={styles.emptyText}>No articles published yet.</Text>
                        </View>
                    }
                />
            )}
            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        paddingTop: 20,
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
        paddingTop: 10,
        paddingBottom: 100,
    },
    card: {
        width: COLUMN_WIDTH,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 4,
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
        height: 110,
        backgroundColor: '#eee',
    },
    infoContainer: {
        padding: 12,
    },
    categoryTag: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1A3067',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    blogTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#222',
        lineHeight: 18,
        height: 55,
    },
    readMoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    viewButton: {
        fontSize: 11,
        color: '#1A3067',
        fontWeight: '700',
        marginRight: 2
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: 10,
        color: '#999',
        fontSize: 14,
    },
    backBtn: { position: 'absolute', top: 1, left: 20, zIndex: 10, borderRadius: 20 },
});