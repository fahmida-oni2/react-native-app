import { create } from "zustand";

const BASE_URL = "https://orbitmediasolutions.com/";

const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      if (!res.ok) {
        const errorBody = await res.text(); 
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res;
    } catch (err) {
      console.warn(`Attempt ${i + 1} failed for ${url}: ${err.message}`);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const fetchAllBlogs = async () => {
  let page = 1;
  let allBlogs = [];

  while (true) {
    const res = await fetchWithRetry(`${BASE_URL}api/blog/page?page=${page}`);
    const json = await res.json();

    const pageBlogs = json.data?.blogs?.data || [];
    allBlogs = [...allBlogs, ...pageBlogs];

    const currentPage = json.data?.blogs?.current_page;
    const lastPage = json.data?.blogs?.last_page;

    if (!lastPage || currentPage >= lastPage) break;
    page++;
  }

  return allBlogs;
};

const useStore = create((set, get) => ({
  products: [],
  services: [],
  blogs: [],
  allData: [],
  loading: false,
  lastFetched: null, 

  fetchHomeData: async (forceRefresh = false) => {
    const { allData } = get();
  
    if (!forceRefresh && allData.length > 0) {
      return;
    }
    set({ loading: true });

    try {
      const [prodRes, servRes, blogRes] = await Promise.all([
        fetchWithRetry(`${BASE_URL}api/all-products`),
        fetchWithRetry(`${BASE_URL}api/all-services`),
        fetchWithRetry(`${BASE_URL}api/blog/page?page=1`),
      ]);

      const [prodJson, servJson, blogJson] = await Promise.all([
        prodRes.json(),
        servRes.json(),
        blogRes.json(),
      ]);

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

      const rawBlogs = blogJson.data?.blogs?.data || [];
      const mappedBlogs = rawBlogs.map(item => ({
        ...item,
        type: "Blogs",
        uniqueKey: `blog-${item.id}`,
        displayTitle: item.blog_title,
        displayImage: item.banner_image,
      }));
      set({
        products: prods,
        services: servs,
        blogs: mappedBlogs,
        allData: [...prods, ...servs],
        loading: false,
        lastFetched: Date.now(),
      });
    } catch (error) {
      console.error("Fetch Error:", error);
      set({ loading: false });
    }
  },
}));

export default useStore;
