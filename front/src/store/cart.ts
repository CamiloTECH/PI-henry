import { ProductsCart } from "@/models";
import { atom } from "jotai";

export const productsCart = atom<ProductsCart[]>([]);

export const addProductsCart = atom(null, (get, set, params: ProductsCart) => {
  const products = get(productsCart);
  const existProduct = products.find((product) => product.id === params.id);
  if (existProduct) {
    const totalQuantity = existProduct.quantity + params.quantity;

    existProduct.quantity =
      totalQuantity <= params.stock ? totalQuantity : params.stock;
  } else {
    products.push(params);
  }
  set(productsCart, [...products]);
});
