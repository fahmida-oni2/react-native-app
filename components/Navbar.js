import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import CustomIcon from './CustomIcon';
import { useCallback, useState } from 'react';
import { auth } from '../firebaseConfig';

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL);

  const isActive = (screenName) => route.name === screenName;

  // This ensures the profile picture refreshes immediately after an update
  useFocusEffect(
    useCallback(() => {
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

        {/* Profile Button */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')} 
          style={styles.navButton}
        >
          {photoURL ? (
            <Image
              key={photoURL} // Key forces re-render when URL changes
              source={{ uri: photoURL }}
              style={[
                styles.profileImage, 
                { borderColor: isActive('Profile') ? "white" : "transparent" }
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
    height: 65,
    backgroundColor: '#1A3067',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
    // FIX: Cross-platform Shadow handling
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.25)",
      }
    })
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
    fontSize: 10,
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
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    borderWidth: 2
  },
  profilePlaceholder: {
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    justifyContent: "center", 
    alignItems: "center"
  }
});