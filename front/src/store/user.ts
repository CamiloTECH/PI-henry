import { Orders, User } from "@/models";
import { atom } from "jotai";

export const dataUser = atom<User | undefined>(undefined);

export const ordersUser = atom<Orders[]>([]);

export const userLogin = atom({
  login: false,
  token: "",
});
