import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'; 
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../firebaseConfig';
import CustomIcon from '../components/CustomIcon';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  const [user, setUser] = useState(auth.currentUser);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
    });
    return unsubscribe;
  }, [isFocused]); 

  const handleLogout = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to sign out?");
      if (confirmed) signOut(auth).catch((err) => console.log(err));
    } else {
      Alert.alert("Logout", "Are you sure you want to sign out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => signOut(auth).catch((err) => console.log(err)) },
      ]);
    }
  };

  // --- GUEST VIEW ---
  if (!user) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <CustomIcon name="arrow-left" size={30} color="#1A3067" />
        </TouchableOpacity>

        <View style={styles.guestContent}>
          <View style={styles.guestIconCircle}>
            <CustomIcon name="user-circle" size={100} color="#1A3067" />
          </View>
          <Text style={styles.guestTitle}>Welcome to Orbit</Text>
          <Text style={styles.guestSub}>Join us to manage your services, and stay connected.</Text>

          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryBtnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryBtn} 
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.secondaryBtnText}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- USER VIEW ---
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <CustomIcon name="arrow-left" size={30} color="#1A3067" />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <CustomIcon name="user-circle" size={80} color="#1A3067" />
          </View>
        )}
        <Text style={styles.profileName}>{user?.displayName || "Member"}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate("UpdateProfile")}
        >
          <View style={styles.menuLeft}>
            <CustomIcon name="user-alt" size={20} color="#1A3067" />
            <Text style={styles.menuText}>Update Profile</Text>
          </View>
          <CustomIcon name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate("Contact")}
        >
          <View style={styles.menuLeft}>
            <CustomIcon name="question-circle" size={20} color="#1A3067" />
            <Text style={styles.menuText}>Emergency Support</Text>
          </View>
          <CustomIcon name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
          <View style={styles.menuLeft}>
            <CustomIcon name="sign-out-alt" size={20} color="#ff4444" />
            <Text style={styles.logoutLabel}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  backBtn: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 20, left: 20, zIndex: 10 },
  
  // Header & Content
  profileHeader: { backgroundColor: '#fff', alignItems: 'center', paddingVertical: 40, borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  avatarPlaceholder: { marginBottom: 15 },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#1A3067' },
  profileEmail: { fontSize: 14, color: '#666', marginTop: 4 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#999', marginBottom: 15, textTransform: 'uppercase' },
  menuItem: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuText: { fontSize: 16, color: '#333', marginLeft: 15 },
  logoutItem: { marginTop: 20, borderWidth: 1, borderColor: '#ffe5e5' },
  logoutLabel: { fontSize: 16, color: '#ff4444', fontWeight: 'bold', marginLeft: 15 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 10 },

  // Guest View Styles
  guestContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, marginTop: 100 },
  guestIconCircle: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 5 },
  guestTitle: { fontSize: 26, fontWeight: 'bold', color: '#1A3067', marginBottom: 10 },
  guestSub: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  primaryBtn: { backgroundColor: '#1A3067', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  primaryBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  secondaryBtn: { backgroundColor: '#fff', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#1A3067' },
  secondaryBtnText: { color: '#1A3067', fontSize: 18, fontWeight: 'bold' },
});