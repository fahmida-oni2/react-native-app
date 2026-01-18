import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Linking, ActivityIndicator } from "react-native";
import Navbar from '../components/Navbar';
import CustomIcon from '../components/CustomIcon';
export default function Contact({ navigation }) {
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await fetch('https://theorbit.one/api/contact');
                const json = await response.json();
                setContactInfo(json.data.setting);
            } catch (error) {
                console.error("Error fetching contact data:", error);
            }
        };
        fetchInfo();
    }, []);

    const openLink = (url) => {
        if (url) {
            Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Contact Us</Text>
            </View>


            <ScrollView contentContainerStyle={styles.scrollContent}>

                {contactInfo ? (
                    <View style={styles.infoCard}>
                        <Text style={styles.director}>Director: {contactInfo.director_name}</Text>

                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={styles.contactRow}
                            onPress={() => openLink(contactInfo.google_map)}
                        >
                            <CustomIcon name="map-marker-alt" size={22} color="purple" />
                            <Text style={styles.contactText}>{contactInfo.uk_address}</Text>
                        </TouchableOpacity>

                        {/* Phone */}
                        <TouchableOpacity
                            style={styles.contactRow}
                            onPress={() => openLink(`tel:${contactInfo.contact_phone}`)}
                        >
                            <CustomIcon name="phone-alt" size={20} color="purple" />
                            <Text style={styles.contactText}>{contactInfo.contact_phone}</Text>
                        </TouchableOpacity>

                        {/* Email */}
                        <TouchableOpacity
                            style={styles.contactRow}
                            onPress={() => openLink(`mailto:${contactInfo.contact_email}`)}
                        >
                            <CustomIcon name="envelope" size={20} color="purple" />
                            <Text style={styles.contactText}>{contactInfo.contact_email}</Text>
                        </TouchableOpacity>

                        <View style={styles.footerBox}>
                            <Text style={styles.footerText}>{contactInfo.footer_short}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="purple" />
                    </View>
                )}
            </ScrollView>

            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {

        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    headerText: { fontSize: 24, fontWeight: 'bold', color: 'purple' },
    logoContainer: { flexDirection: 'row', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'purple', marginLeft: 10 },
    logo: { width: 40, height: 40, borderRadius: 20 },
    scrollContent: { alignItems: 'center', paddingBottom: 100 },

    infoCard: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    director: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    separator: { height: 1, backgroundColor: '#eee', marginBottom: 20 },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingRight: 20
    },
    contactText: {
        fontSize: 15,
        color: '#555',
        marginLeft: 15,
        lineHeight: 22
    },
    footerBox: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#f9f2ff',
        borderRadius: 10
    },
    footerText: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});