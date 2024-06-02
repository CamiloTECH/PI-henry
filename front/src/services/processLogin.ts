import { LoginPost, LoginResponse } from "@/models";
import baseURL from "./url";

async function processLogin(dataLogin: LoginPost): Promise<LoginResponse> {
  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: "post",
      body: JSON.stringify(dataLogin),
      headers: { "Content-Type": "application/json" },
    });
    const result: LoginResponse = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred check the data",
      login: false,
      token: "",
      user: {
        name: "",
        email: "",
        address: "",
        phone: "",
        id: 0,
        role: "user",
        credential: {
          password: "",
          id: 0,
        },
      },
    };
  }
}

export default processLogin;
