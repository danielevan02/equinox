import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchProducts } from "@/services/api";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: number, product: Product) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const products = await fetchProducts();
          set({ products, loading: false });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : "Failed to fetch products", loading: false });
        }
      },
      setProducts: (products) => set({ products }),
      addProduct: (prod) =>
        set((state) => ({
          products: [{ ...prod, id: Date.now() }, ...state.products],
        })),
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...product, id } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProductById: (id) => get().products.find((p) => p.id === id),
    }),
    {
      name: "product-storage",
    }
  )
);
