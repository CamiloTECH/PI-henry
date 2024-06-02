export interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}
export interface Orders {
  id: number;
  date: string;
  status: "approved";
  products: Products[];
}

interface Credential {
  password: string;
  id: number;
}

export interface User {
  name: string;
  email: string;
  address: string;
  phone: string;
  id: number;
  role: "user";
}

export interface RegisterPost {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export interface LoginPost {
  email: string;
  password: string;
}

export type OrdersPost = number[];

export interface RegisterResponse extends User {
  credential: Credential;
  message?: string;
}

export interface OrdersResponse extends Orders {
  user: User;
  message?: string;
}

export interface LoginResponse {
  login: boolean;
  token: string;
  user: RegisterResponse;
  message?: string;
}

export interface SignupFormInputs extends RegisterPost {
  confirmPassword: string;
}

export interface ProductsCart extends Products {
  quantity: number;
}