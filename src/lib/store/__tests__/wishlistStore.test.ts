import { describe, it, expect, beforeEach } from "vitest";
import { useWishlistStore } from "../useWishlistStore";
import { PRODUCTS } from "../../data/products";

describe("useWishlistStore", () => {
  beforeEach(() => {
    useWishlistStore.getState().clearWishlist();
  });

  it("toggles product in and out of wishlist", () => {
    const product = PRODUCTS[0];
    const added = useWishlistStore.getState().toggleWishlist(product);
    expect(added).toBe(true);
    expect(useWishlistStore.getState().isInWishlist(product.id)).toBe(true);
    expect(useWishlistStore.getState().getItemCount()).toBe(1);

    const removed = useWishlistStore.getState().toggleWishlist(product);
    expect(removed).toBe(false);
    expect(useWishlistStore.getState().isInWishlist(product.id)).toBe(false);
    expect(useWishlistStore.getState().getItemCount()).toBe(0);
  });

  it("removes product by id directly", () => {
    const product1 = PRODUCTS[0];
    const product2 = PRODUCTS[1];
    useWishlistStore.getState().toggleWishlist(product1);
    useWishlistStore.getState().toggleWishlist(product2);

    expect(useWishlistStore.getState().getItemCount()).toBe(2);

    useWishlistStore.getState().removeItem(product1.id);
    expect(useWishlistStore.getState().isInWishlist(product1.id)).toBe(false);
    expect(useWishlistStore.getState().isInWishlist(product2.id)).toBe(true);
    expect(useWishlistStore.getState().getItemCount()).toBe(1);
  });
});
