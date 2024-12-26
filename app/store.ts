import { Product } from "@prisma/client";
import { create } from "zustand";

export interface CartProduct extends Product {
  quantity: number;
}

interface ProductsStore {
  invoiceNumber: string;
  setInvoiceNumber: (orderNumber: string) => void;
  shoppingCartProducts: CartProduct[];
  deleteShoppingCartProducts: () => void;
  addShoppingCartProduct: (product: CartProduct) => void;
  removeShoppingCartProduct: (id: number) => void;
  updateShoppingCartProduct: (product: CartProduct) => void;
}

const useProductsStore = create<ProductsStore>((set) => ({
  invoiceNumber: "",
  setInvoiceNumber: (orderNumber) =>
    set(() => ({
      invoiceNumber: orderNumber,
    })),
  shoppingCartProducts: [],
  deleteShoppingCartProducts: () => set(() => ({ shoppingCartProducts: [] })),
  addShoppingCartProduct: (product) =>
    set((store) => ({
      shoppingCartProducts: [...store.shoppingCartProducts, product],
    })),
  removeShoppingCartProduct: (id) =>
    set((store) => ({
      shoppingCartProducts: store.shoppingCartProducts.filter(
        (p) => p.id !== id
      ),
    })),
  updateShoppingCartProduct: (product) =>
    set((store) => ({
      shoppingCartProducts: store.shoppingCartProducts.map((p) =>
        p.id === product.id ? product : p
      ),
    })),
}));

export default useProductsStore;
