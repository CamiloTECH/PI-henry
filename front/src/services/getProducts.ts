import { Products } from "@/models";
import baseURL from "./url";

const getProducts = async (): Promise<Products[]> => {
  try {
    const response = await fetch(`${baseURL}/products`);
    const result = await response.json();
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getProducts;
