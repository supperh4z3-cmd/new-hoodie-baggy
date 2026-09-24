import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../types/ecommerce";

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  getItemCount: () => number;
}

const safeStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
      return null;
    }
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore localStorage errors
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
      return;
    }
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore localStorage errors
    }
  },
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.some((p) => p.id === product.id);

        if (exists) {
          set({ items: items.filter((p) => p.id !== product.id) });
          return false;
        } else {
          set({ items: [...items, product] });
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "baggy-street-wishlist",
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
