// import { useEffect } from 'react';
// import NetInfo from "@react-native-community/netinfo";
// import Toast from "react-native-toast-message";

// export const useNetworkCheck = () => {
//   useEffect(() => {
//     NetInfo.fetch().then(state => {
//       if (!state.isConnected) {
//         showOfflineToast();
//       }
//     });

//     const unsubscribe = NetInfo.addEventListener(state => {
//       if (state.isConnected === false) {
//         showOfflineToast();
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const showOfflineToast = () => {
//     Toast.show({
//       type: 'error', 
//       text1: 'Offline Mode',
//       text2: 'Please check your internet connection.',
//       position: 'bottom',
//       visibilityTime: 4000,
//     });
//   };
// };

import { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export const useNetworkCheck = () => {
  useEffect(() => {
    // Don't check on mount — isInternetReachable is null initially on mobile data
    // Only listen for actual disconnections
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        Toast.show({
          type: 'error',
          text1: 'No Internet',
          text2: 'Please check your connection.',
          position: 'bottom',
          visibilityTime: 4000,
        });
      }
    });

    return () => unsubscribe();
  }, []);
};