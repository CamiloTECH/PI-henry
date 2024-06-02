import { RegisterResponse, RegisterPost } from "@/models";
import baseURL from "./url";

async function processSignUp(dataRegister: RegisterPost) {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: "post",
      body: JSON.stringify(dataRegister),
      headers: { "Content-Type": "application/json" },
    });
    const result: RegisterResponse = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
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
      message: "An error occurred check the data",
    };
  }
}

export default processSignUp;
