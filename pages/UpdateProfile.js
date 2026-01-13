import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { updateProfile } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function UpdateProfile() {
    const [name, setName] = useState(auth.currentUser?.displayName || '');
    const navigation = useNavigation();

    const handleUpdate = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name
            });
            Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Profile updated successfully! '
        });
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="purple" />
            </TouchableOpacity>

            <Text style={styles.title}>Update Profile</Text>

            <Text style={styles.label}>Display Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    backButton: { marginTop: 40, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: 'purple' },
    label: { fontSize: 16, color: '#666', marginBottom: 8 },
    input: { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10, fontSize: 18, marginBottom: 30 },
    saveButton: { backgroundColor: 'purple', padding: 15, borderRadius: 10, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});