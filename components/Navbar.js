import { useNavigation, useRoute } from '@react-navigation/native'; //
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from './CustomIcon';

export default function Navbar() {
    const navigation = useNavigation();
    const route = useRoute();
    const isActive = (screenName) => route.name === screenName;

    return (
        <View style={styles.navContainer}>
            <View style={styles.linksContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.navButton}
                >
                    <CustomIcon
                        name="home"
                        size={22}
                        color={isActive('Home') ? "white" : "#d1d1d1"}
                    />
                    <Text style={[
                        styles.navText,
                        { fontWeight: isActive('Home') ? 'bold' : 'normal' }
                    ]}>
                        Home
                    </Text>

                    {isActive('Home') && <View style={styles.activeIndicator} />}
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('Product')}
                    style={styles.navButton}
                >
                    <CustomIcon
                        name="boxes"
                        size={22}
                        color={isActive('Product') ? "white" : "#d1d1d1"}
                    />
                    <Text style={[
                        styles.navText,
                        { fontWeight: isActive('Product') ? 'bold' : 'normal' }
                    ]}>
                        Products
                    </Text>
                    {isActive('Product') && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Service')}
                    style={styles.navButton}
                >
                    <CustomIcon
                        name="concierge-bell"
                        size={22}
                        color={isActive('Service') ? "white" : "#d1d1d1"}
                    />
                    <Text style={[
                        styles.navText,
                        { fontWeight: isActive('Service') ? 'bold' : 'normal' }
                    ]}>
                        Services
                    </Text>
                    {isActive('Service') && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Order')}
                    style={styles.navButton}
                >
                    <CustomIcon
                        name="shopping-cart"
                        size={22}
                        color={isActive('Order') ? "white" : "#d1d1d1"}
                    />
                    <Text style={[
                        styles.navText,
                        { fontWeight: isActive('Order') ? 'bold' : 'normal' }
                    ]}>
                       Order
                    </Text>
                    {isActive('Order') && <View style={styles.activeIndicator} />}
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
        height: 60,
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
        fontSize: 12,
        marginTop: 4,
    },
    activeIndicator: {
        marginTop: 4,
        height: 3,
        width: 20,
        backgroundColor: 'white',
        borderRadius: 2,
    }
});