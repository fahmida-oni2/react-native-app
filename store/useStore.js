import { create } from 'zustand';

const BASE_URL = "https://theorbit.one/";

const useStore = create((set, get) => ({
  products: [],
  services: [],
  blogs: [],
  allData: [],
  loading: false,
  _hasHydrated: true, 

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
        products: prods,
        services: servs,
        blogs: blogJson.data?.blogs?.data || [],
        allData: [...prods, ...servs], 
        loading: false,
      });
    } catch (error) {
      console.error("Fetch Error:", error);
      set({ loading: false });
    }
  },
}));

export default useStore;