import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomIcon from '../components/CustomIcon';

export default function Form({ navigation }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            bio: ''
        }
    });
 const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };
    const onSubmit = async (data) => {
        const subject = `New Inquiry from ${data.firstName} ${data.lastName}`;
        const body = `Name: ${data.firstName} ${data.lastName}\nPhone: ${data.phoneNumber}\n\nBio/Message: ${data.bio}`;
        const url = `mailto:info@theorbit.one?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        try {
            await Linking.openURL(url);
        } catch (err) {
            Alert.alert(
                'Support',
                'Could not open your email app. Please email us directly at info@theorbit.one',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
                    <CustomIcon name="arrow-left" size={30} color="purple" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Get in Touch</Text>
                <Text style={styles.headerSubText}>
                    Fill out the form below and we'll get back to you shortly.
                </Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.infoCard}>
                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>First Name</Text>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Smith"
                                            placeholderTextColor="#aaa"
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                            <View style={[styles.flex1, { marginLeft: 15 }]}>
                                <Text style={styles.label}>Last Name</Text>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Jonson"
                                            placeholderTextColor="#aaa"
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                        </View>

                        <Text style={styles.label}>Phone Number</Text>
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="+1-202-555-0174"
                                    placeholderTextColor="#aaa"
                                    keyboardType="phone-pad"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <Text style={styles.label}> Message</Text>
                        <Controller
                            control={control}
                            name="bio"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Tell us something..."
                                    placeholderTextColor="#aaa"
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.submitBtnText}>Send Message</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
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
    scrollContent: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 100
    },
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
    row: { flexDirection: 'row', marginBottom: 5 },
    flex1: { flex: 1 },
    label: { color: 'purple', fontSize: 14, marginBottom: 8, fontWeight: '600' },
    input: {
        backgroundColor: '#fcfcfc',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 12,
        color: '#333',
        fontSize: 16,
        marginBottom: 15
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top'
    },
    submitBtn: {
        backgroundColor: 'purple',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: 'purple',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5
    },
    submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    backBtn: { position: 'absolute', top: 30, left: 20, zIndex: 10, borderRadius: 20 },
});