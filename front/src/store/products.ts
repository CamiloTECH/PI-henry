import { Products } from "@/models";
import { atom } from "jotai";

export const products = atom<Products[]>([]);

