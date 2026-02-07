import { create } from "zustand";

const BASE_URL = "https://orbitmediasolutions.com/";

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
      //  console.log(blogJson)
      // Mapping Products
      const prods = (prodJson.products || []).map((item) => ({
        ...item,
        type: "Products",
        uniqueKey: `prod-${item.id}`,
        displayTitle: item.banner_title,
        displayImage: item.product_image,
      }));

      // Mapping Services
      const servs = (servJson.services?.data || []).map((item) => ({
        ...item,
        type: "Services",
        uniqueKey: `serv-${item.id}`,
        displayTitle: item.banner_title,
        displayImage: item.service_image,
      }));

      // FOR BLOG:
      const mappedBlogs = (blogJson.data?.blogs || []).map((item) => ({
        ...item,
        type: "Blogs",
        uniqueKey: `blog-${item.id}`,
        displayTitle: item.blog_title,
        displayImage: item.banner_image,
        description: item.banner_description,
        htmlContent: item.blog_features,
      })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));;

      set({
        products: prods,
        services: servs,
        blogs: mappedBlogs,
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
