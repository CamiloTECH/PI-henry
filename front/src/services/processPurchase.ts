import { OrdersPost, OrdersResponse } from "@/models";
import baseURL from "./url";

async function processPurchase(products: OrdersPost, token: string) {
  try {
    const response = await fetch(`${baseURL}/orders`, {
      method: "post",
      body: JSON.stringify({ products }),
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const result: OrdersResponse = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      id: 0,
      date: "",
      user: {
        id: 0,
        name: "",
        phone: "",
        email: "",
        address: "",
        role: "user",
      },
      products: [],
      status: "approved",
      message: "An error occurred check the data",
    };
  }
}

export default processPurchase;
