import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import CustomIcon from '../components/CustomIcon';
export default function BlogDetails({ route, navigation }) {
    const { width } = useWindowDimensions();
    const blog = route.params?.blog;
    const BASE_URL = 'https://theorbit.one/';
 const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
                <CustomIcon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: `${BASE_URL}${blog?.banner_image}` }}
                    style={styles.fullImage}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{blog?.banner_title}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.label}>Blog Details</Text>
                    <Text style={styles.description}>{blog?.banner_description}</Text>

                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Form')}>
                        <Text style={styles.actionButtonText}>Enquire Now</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },
    fullImage: { width: '100%', height: 300, resizeMode: 'cover' },
    infoContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: 'white',textAlign:'left' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 5 },
    description: { fontSize: 15, color: '#666', lineHeight: 22 ,textAlign:'justify'},
    actionButton: { backgroundColor: '#1A3067', padding: 18, borderRadius: 15, marginTop: 20, alignItems: 'center' },
    actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});