import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
const COLUMN_WIDTH = screenWidth / 2; 

export default function ServiceMarquee({ data }) {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();
    const BASE_URL = 'https://theorbit.one/';

    useEffect(() => {
        if (data.length > 0) {
            const interval = setInterval(() => {
                let nextIndex = currentIndex + 1;
                
                if (nextIndex >= data.length) {
                    nextIndex = 0;
                }

                flatListRef.current?.scrollToOffset({
                    offset: nextIndex * COLUMN_WIDTH,
                    animated: true,
                });
                
                setCurrentIndex(nextIndex);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [currentIndex, data]);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => navigation.navigate('ServiceDetails', { service: item })}
        >
            <View style={styles.cardInner}>
                <Image 
                    source={{ uri: `${BASE_URL}${item.service_image}` }} 
                    style={styles.image} 
                />
                <View style={styles.textOverlay}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.banner_title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                horizontal
             
                pagingEnabled={false} 
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                snapToInterval={COLUMN_WIDTH}
                decelerationRate="fast"
                getItemLayout={(data, index) => (
                    { length: COLUMN_WIDTH, offset: COLUMN_WIDTH * index, index }
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { height: 180, marginVertical: 10 ,marginHorizontal:10},
    card: { 
        width: COLUMN_WIDTH, 
        paddingHorizontal: 8, 
        alignItems: 'center' 
    },
    cardInner: {
        width: '100%',
        height: 160,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#eee'
    },
    image: { width: '100%', height: '100%', resizeMode: 'cover' },
    textOverlay: { 
        position: 'absolute', 
        bottom: 0, 
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
    },
    title: { color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }
});