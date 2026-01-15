import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
    Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
export default function Form() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            bio: ''
        }
    });

    const onSubmit = (data) => {
        const subject = `New Inquiry from ${data.firstName} ${data.lastName}`;
        const body = `Name: ${data.firstName} ${data.lastName}\nPhone: ${data.phoneNumber}\n\nBio/Message: ${data.bio}`;
        const url = `mailto:info@theorbit.one?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    Alert.alert('Error', 'Email apps are not available on this device');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
       
              
            <ScrollView style={styles.container}>
            <View style={styles.formGroup}>

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
                                    placeholderTextColor="#666"
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
                                    placeholderTextColor="#666"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                </View>


                {/* Phone Number */}
                <Text style={styles.label}>Phone Number</Text>
                <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="+1-202-555-0174"
                            placeholderTextColor="#666"
                            keyboardType="phone-pad"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                {/* Bio / Message */}
                <Text style={styles.label}>Bio</Text>
                <Controller
                    control={control}
                    name="bio"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Tell us something..."
                            placeholderTextColor="#666"
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
       
        
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#12141d', padding: 20, marginTop: 10 },
    row: { flexDirection: 'row', marginBottom: 15 },
    flex1: { flex: 1 },
    label: { color: '#8e9aaf', fontSize: 14, marginBottom: 8, fontWeight: '500' },
    input: {
        backgroundColor: '#1c1f2e',
        borderWidth: 1,
        borderColor: '#3a3f54',
        borderRadius: 10,
        padding: 12,
        color: '#fff',
        fontSize: 16,
        marginBottom: 20
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top'
    },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },
    submitBtn: {
        backgroundColor: 'purple',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10
    },
    submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});