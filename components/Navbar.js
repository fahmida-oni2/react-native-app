import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert } from 'react-native';
import CustomIcon from './CustomIcon';
import { useCallback, useState } from 'react';
import { auth } from '../firebaseConfig';

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL);

  const isActive = (screenName) => route.name === screenName;

  useFocusEffect(
    useCallback(() => {
      setDisplayName(auth.currentUser?.displayName);
      setPhotoURL(auth.currentUser?.photoURL);
    }, [])
  );

  return (
    <View style={styles.navContainer}>
      <View style={styles.linksContainer}>
        {/* Home Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navButton}>
          <CustomIcon
            name="home"
            size={22}
            color={isActive('Home') ? "white" : "#d1d1d1"}
          />
          <Text style={[styles.navText, { fontWeight: isActive('Home') ? 'bold' : 'normal' }]}>
            Home
          </Text>
          {isActive('Home') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        {/* Product Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Product')} style={styles.navButton}>
          <CustomIcon
            name="boxes"
            size={22}
            color={isActive('Product') ? "white" : "#d1d1d1"}
          />
          <Text style={[styles.navText, { fontWeight: isActive('Product') ? 'bold' : 'normal' }]}>
            Products
          </Text>
          {isActive('Product') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        {/* Service Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Service')} style={styles.navButton}>
          <CustomIcon
            name="concierge-bell"
            size={22}
            color={isActive('Service') ? "white" : "#d1d1d1"}
          />
          <Text style={[styles.navText, { fontWeight: isActive('Service') ? 'bold' : 'normal' }]}>
            Services
          </Text>
          {isActive('Service') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        {/* Profile Button - Now Navigates to Profile Screen */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')} 
          style={styles.navButton}
        >
          {photoURL ? (
            <Image
              key={photoURL}
              source={{ uri: photoURL }}
              style={[
                styles.profileImage, 
                { borderColor: isActive('Profile') ? "white" : "#1A3067" }
              ]}
            />
          ) : (
            <View style={[styles.profilePlaceholder, { backgroundColor: isActive('Profile') ? "#2A4077" : "#1A3067" }]}>
              <CustomIcon name="user-circle" size={20} color="white" />
            </View>
          )}
          <Text style={[styles.navText, { fontWeight: isActive('Profile') ? 'bold' : 'normal' }]}>
            Profile
          </Text>
          {isActive('Profile') && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65, // Increased slightly for better spacing
    backgroundColor: '#1A3067',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  linksContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    color: '#fff',
    fontSize: 10, // Slightly smaller for better fit
    marginTop: 2,
  },
  activeIndicator: {
    marginTop: 2,
    height: 3,
    width: 20,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  profileImage: {
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    borderWidth: 2
  },
  profilePlaceholder: {
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: "center", 
    alignItems: "center"
  }
});