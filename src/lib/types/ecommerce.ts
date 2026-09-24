export type CategorySlug = "hoodies" | "sweatpants" | "jackets" | "jeans" | "accessories";

export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface ProductDetails {
  material: string;
  fit: string;
  care: string;
  origin: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: CategorySlug;
  categoryName: string;
  colors: string[];
  sizes: ProductSize[];
  images: string[];
  description: string;
  shortDescription: string;
  details: ProductDetails;
  badge?: "NEW" | "HOT" | "LIMITED";
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface CartItem {
  id: string; // composite key: `${product.id}-${size}-${color}`
  product: Product;
  size: ProductSize;
  color: string;
  quantity: number;
}
