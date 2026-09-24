import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product, ProductSize } from "../types/ecommerce";

export const FREE_SHIPPING_THRESHOLD = 2000;
export const STANDARD_SHIPPING_FEE = 99;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: string | null;
  discountPercentage: number;

  // Drawer controls
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart operations
  addItem: (product: Product, size: ProductSize, color: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Computations
  getSubtotal: () => number;
  getTotalItemCount: () => number;
  isFreeShipping: () => boolean;
  getFreeShippingRemaining: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getFinalTotal: () => number;
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
      // noop
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
      return;
    }
    try {
      window.localStorage.removeItem(key);
    } catch {
      // noop
    }
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupon: null,
      discountPercentage: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, size, color, quantity = 1) => {
        const compositeId = `${product.id}-${size}-${color}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.id === compositeId);

        let updatedItems: CartItem[];
        if (existingIndex > -1) {
          updatedItems = currentItems.map((item, idx) =>
            idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          updatedItems = [
            ...currentItems,
            {
              id: compositeId,
              product,
              size,
              color,
              quantity,
            },
          ];
        }

        set({ items: updatedItems, isOpen: true });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, discountPercentage: 0 });
      },

      applyCoupon: (code: string) => {
        const normalized = code.trim().toUpperCase();
        if (normalized === "BAGGY10") {
          set({ appliedCoupon: "BAGGY10", discountPercentage: 10 });
          return { success: true, message: "%10 indirim uygulandı!" };
        } else if (normalized === "DRILL20") {
          set({ appliedCoupon: "DRILL20", discountPercentage: 20 });
          return { success: true, message: "%20 özel drop indirimi uygulandı!" };
        }
        return { success: false, message: "Geçersiz kupon kodu." };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null, discountPercentage: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
      },

      getTotalItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      isFreeShipping: () => {
        return get().getSubtotal() >= FREE_SHIPPING_THRESHOLD;
      },

      getFreeShippingRemaining: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const percentage = get().discountPercentage;
        return (subtotal * percentage) / 100;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
      },

      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: "baggy_street_cart_v1",
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        discountPercentage: state.discountPercentage,
      }),
    }
  )
);
