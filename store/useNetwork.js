import { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export const useNetworkCheck = () => {
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        showOfflineToast();
      }
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        showOfflineToast();
      }
    });

    return () => unsubscribe();
  }, []);

  const showOfflineToast = () => {
    Toast.show({
      type: 'error', 
      text1: 'Offline Mode',
      text2: 'Please check your internet connection.',
      position: 'bottom',
      visibilityTime: 4000,
    });
  };
};