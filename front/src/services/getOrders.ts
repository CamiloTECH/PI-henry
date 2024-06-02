import { Orders } from "@/models";
import baseURL from "./url";

const getOrders = async (token: string): Promise<Orders[]> => {
  try {
    const response = await fetch(`${baseURL}/users/orders`, {
      headers: { Authorization: token },
    });
    const result = await response.json();
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getOrders;
