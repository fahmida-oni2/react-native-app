import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons'
export default function BlogDetails({ route, navigation }) {
    const { width } = useWindowDimensions();
    const blog = route.params?.blog;
    const BASE_URL = 'https://theorbit.one/';

    const systemFonts = [
        ...Platform.select({
            ios: ['Arial', 'Times New Roman', 'Georgia'],
            android: ['sans-serif', 'serif', 'monospace', 'normal'],
            default: []
        })
    ];

  
    const processedHtml = (blog?.blog_features || '')
        .replace(/font-family: Arial/g, "font-family: sans-serif") 
        .replace(/font-family: 'Times New Roman'/g, "font-family: serif")
        .replace(/font-size: 32pt/g, "font-size: 24px") 
        .replace(/font-size: 11pt/g, "font-size: 24px"); 

    const tagsStyles = {
        body: {
            color: '#333',
            lineHeight: 24,
        },
        h2: {
            marginTop: 15,
            marginBottom: 10,
            fontWeight: '700',
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <Image
                source={{ uri: `${BASE_URL}${blog?.banner_image}` }}
                style={styles.fullImage}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{blog?.blog_title}</Text>
                
                <RenderHTML
                    contentWidth={width - 40}
                    source={{ html: processedHtml }}
                    tagsStyles={tagsStyles}
                    systemFonts={systemFonts}
                    baseStyle={{
                        fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Arial',
                        fontSize: 16,
                    }}
                    defaultTextProps={{ allowFontScaling: false }}
                />

                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Form')}>
                    <Text style={styles.actionButtonText}>Enquire Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },
    fullImage: { width: '100%', height: 300, resizeMode: 'cover' },
    infoContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: 'white' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    label: { fontSize: 14, fontWeight: '600', color: 'purple', textTransform: 'uppercase', marginBottom: 10 },
    actionButton: { backgroundColor: 'purple', padding: 18, borderRadius: 15, marginTop: 20, alignItems: 'center' },
    actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});