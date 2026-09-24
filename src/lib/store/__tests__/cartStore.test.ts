import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "../useCartStore";
import { Product } from "../../types/ecommerce";

const mockHoodie: Product = {
  id: "test-hoodie-1",
  slug: "test-hoodie",
  name: "Test Drill Hoodie",
  price: 2499,
  category: "hoodies",
  categoryName: "Hoodies",
  colors: ["Black"],
  sizes: ["M", "L", "XL"],
  images: ["/test.jpg"],
  shortDescription: "Short test",
  description: "Detailed test",
  details: { material: "Cotton", fit: "Oversized", care: "Wash cold", origin: "Turkey" },
};

const mockBeanie: Product = {
  id: "test-beanie-1",
  slug: "test-beanie",
  name: "Test Beanie",
  price: 799,
  category: "accessories",
  categoryName: "Accessories",
  colors: ["Black"],
  sizes: ["M"],
  images: ["/beanie.jpg"],
  shortDescription: "Beanie test",
  description: "Detailed test",
  details: { material: "Acrylic", fit: "Regular", care: "Hand wash", origin: "Turkey" },
};

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useCartStore.getState().closeCart();
  });

  it("adds product to cart and updates subtotal and quantity", () => {
    const store = useCartStore.getState();
    store.addItem(mockHoodie, "L", "Black", 1);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.name).toBe("Test Drill Hoodie");
    expect(state.items[0].size).toBe("L");
    expect(state.items[0].quantity).toBe(1);
    expect(state.getSubtotal()).toBe(2499);
    expect(state.isOpen).toBe(true);
  });

  it("stacks quantity when adding identical product, size and color", () => {
    const store = useCartStore.getState();
    store.addItem(mockHoodie, "L", "Black", 1);
    store.addItem(mockHoodie, "L", "Black", 2);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.getSubtotal()).toBe(2499 * 3);
  });

  it("creates separate item entries for different sizes", () => {
    const store = useCartStore.getState();
    store.addItem(mockHoodie, "M", "Black", 1);
    store.addItem(mockHoodie, "XL", "Black", 1);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(2);
    expect(state.getTotalItemCount()).toBe(2);
  });

  it("handles free shipping threshold calculation correctly", () => {
    const store = useCartStore.getState();
    
    // Add item below 2000 TL threshold
    store.addItem(mockBeanie, "M", "Black", 1); // 799 TL
    expect(useCartStore.getState().getSubtotal()).toBe(799);
    expect(useCartStore.getState().isFreeShipping()).toBe(false);
    expect(useCartStore.getState().getFreeShippingRemaining()).toBe(FREE_SHIPPING_THRESHOLD - 799);
    expect(useCartStore.getState().getShippingFee()).toBe(STANDARD_SHIPPING_FEE);

    // Add item that pushes over threshold
    store.addItem(mockHoodie, "L", "Black", 1); // 799 + 2499 = 3298 TL
    expect(useCartStore.getState().isFreeShipping()).toBe(true);
    expect(useCartStore.getState().getFreeShippingRemaining()).toBe(0);
    expect(useCartStore.getState().getShippingFee()).toBe(0);
  });

  it("applies coupon code and calculates discount", () => {
    const store = useCartStore.getState();
    store.addItem(mockHoodie, "L", "Black", 1); // 2499 TL

    const result = store.applyCoupon("BAGGY10");
    expect(result.success).toBe(true);

    const state = useCartStore.getState();
    expect(state.appliedCoupon).toBe("BAGGY10");
    expect(state.discountPercentage).toBe(10);
    expect(state.getDiscountAmount()).toBe(249.9);
    expect(state.getFinalTotal()).toBe(2499 - 249.9);
  });
});
