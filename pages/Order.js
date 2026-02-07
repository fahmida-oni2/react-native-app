import React, { useState, useCallback } from "react";
import {
  View, Text, FlatList, Image, StyleSheet,
  TouchableOpacity, ActivityIndicator, Modal, Dimensions
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import Navbar from "../components/Navbar";
import CustomIcon from "../components/CustomIcon";

export default function Cart({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [alertConfig, setAlertConfig] = useState({ visible: false, title: '', message: '', type: 'success' });

  const BASE_URL = "https://theorbit.one/";
  const BACKEND_URL = "https://react-native-server-three.vercel.app";

  const handleSafeBack = () => {
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");
  };

  useFocusEffect(
    useCallback(() => {
      loadCartFromServer();
    }, [])
  );

  const loadCartFromServer = async () => {
    const userEmail = auth.currentUser?.email;
    if (!userEmail) { setLoading(false); return; }
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/my-cart?email=${userEmail}`);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const confirmDelete = (productId) => {
    setPendingDeleteId(productId);
    setAlertConfig({
      visible: true,
      title: "Are you sure?",
      message: "Do you really want to remove this item from your order?",
      type: "question",
    });
  };

  const executeDelete = async () => {
    if (!pendingDeleteId) return;
    const userEmail = auth.currentUser?.email;
  
    setAlertConfig(prev => ({ ...prev, visible: false }));

    try {
      const response = await fetch(
        `${BACKEND_URL}/product?email=${userEmail}&productId=${pendingDeleteId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (response.ok) {
        if (data.action === "decreased") {
          setCartItems(prev => prev.map(item => 
            item.productId === pendingDeleteId ? { ...item, quantity: item.quantity - 1 } : item
          ));
        } else {
          setCartItems(prev => prev.filter(item => item.productId !== pendingDeleteId));
        }
      }
    } catch (error) {
      setAlertConfig({ visible: true, title: "Error", message: "Connection failed", type: "error" });
    } finally {
      setPendingDeleteId(null);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: `${BASE_URL}${item.product_image}` }} style={styles.img} />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.title} numberOfLines={1}>{item.banner_title}</Text>
        <Text style={styles.qty}>Quantity: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => confirmDelete(item.productId)} style={styles.deleteBtn}>
        <CustomIcon name="trash-alt" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack}>
        <CustomIcon name="arrow-left" size={30} color="#1A3067" />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Order</Text>
        <Text style={styles.headerSubText}>Manage your item</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1A3067" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={<Text style={styles.empty}>There is no order till now.</Text>}
          contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
        />
      )}

      <SweetAlert 
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
        onConfirm={executeDelete}
      />
      
      <Navbar />
    </View>
  );
}


const SweetAlert = ({ visible, type, title, message, onClose, onConfirm }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.sweetAlertBox}>
        <View style={[
          styles.iconCircle, 
          { backgroundColor: type === 'question' ? '#FF9800' : type === 'success' ? '#4CAF50' : '#F44336' }
        ]}>
          <CustomIcon 
            name={type === 'question' ? 'exclamation-triangle' : type === 'success' ? 'check' : 'times'} 
            size={30} color="#fff" 
          />
        </View>
        <Text style={styles.sweetTitle}>{title}</Text>
        <Text style={styles.sweetMessage}>{message}</Text>
        
        <View style={styles.buttonRow}>
          {type === 'question' ? (
            <>
              <TouchableOpacity style={[styles.sweetBtn, styles.cancelBtn]} onPress={onClose}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.sweetBtn, styles.deleteConfirmBtn]} onPress={onConfirm}>
                <Text style={styles.sweetBtnText}>Delete</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.sweetBtn} onPress={onClose}>
              <Text style={styles.sweetBtnText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { paddingTop: 25, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: "#f9f9f9", borderBottomWidth: 1, borderBottomColor: "#eee" },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#1A3067" },
  headerSubText: { fontSize: 13, color: "#666", marginTop: 4 },
  card: { flexDirection: "row", padding: 15, backgroundColor: "#fff", borderRadius: 15, marginBottom: 12, alignItems: "center", elevation: 2 },
  img: { width: 70, height: 70, borderRadius: 12 },
  title: { fontWeight: "bold", fontSize: 16, color: "#333" },
  qty: { color: "#777", fontSize: 13, marginTop: 2 },
  deleteBtn: { padding: 10 },
  empty: { textAlign: "center", marginTop: 100, color: "gray", fontSize: 16 },
  backBtn: { position: 'absolute', top: 1, left: 20, zIndex: 10 },
  
  // MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  sweetAlertBox: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center' },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  sweetTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  sweetMessage: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', width: '100%' },
  sweetBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center', backgroundColor: '#1A3067' },
  sweetBtnText: { color: '#fff', fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#eee', marginRight: 10 },
  cancelBtnText: { color: '#333', fontWeight: 'bold' },
  deleteConfirmBtn: { backgroundColor: '#F44336' },
});