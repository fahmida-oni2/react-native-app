import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';

const getStorageWrapper = () => {
  try {
    if (Platform.OS === 'web') {
      return window.localStorage;
    }
    const { MMKV } = require('react-native-mmkv');
    const storage = new MMKV();
    return {
      setItem: (name, value) => storage.set(name, value),
      getItem: (name) => storage.getString(name) ?? null,
      removeItem: (name) => storage.delete(name),
    };
  } catch (e) {
    console.warn("Storage fallback triggered", e);
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }
};

const BASE_URL = "https://theorbit.one/";

const useStore = create(
  persist(
    (set, get) => ({ 
      products: [],
      services: [],
      blogs: [],
      allData: [],
      loading: false,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      fetchHomeData: async () => {
        if (get().allData.length === 0) set({ loading: true });

        try {
          const [prodRes, servRes, blogRes] = await Promise.all([
            fetch(`${BASE_URL}api/all-products`),
            fetch(`${BASE_URL}api/all-services`),
            fetch(`${BASE_URL}api/blog/page`),
          ]);

          const prodJson = await prodRes.json();
          const servJson = await servRes.json();
          const blogJson = await blogRes.json();

          const prods = (prodJson.products?.data || []).map((item) => ({
            ...item,
            type: "Products",
            uniqueKey: `prod-${item.id}`,
            displayTitle: item.banner_title,
            displayImage: item.product_image,
          }));

          const servs = (servJson.services?.data || []).map((item) => ({
            ...item,
            type: "Services",
            uniqueKey: `serv-${item.id}`,
            displayTitle: item.banner_title,
            displayImage: item.service_image,
          }));

          set({ 
            products: prodJson.products?.data || [],
            services: servJson.services?.data || [],
            blogs: blogJson.data?.blogs?.data || [],
            allData: [...prods, ...servs],
            loading: false 
          });
        } catch (error) {
          console.error("Fetch Error (Likely Offline):", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: 'orbit-media-cache',
      storage: createJSONStorage(() => getStorageWrapper()),
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);

export default useStore;