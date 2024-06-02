"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ProductsCart } from "@/models";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ordersUser, productsCart, userLogin } from "@/store";
import { processPurchase } from "@/services";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function CartComponent() {
  const router = useRouter();
  const setOrders = useSetAtom(ordersUser);
  const { token } = useAtomValue(userLogin);
  const [loading, setLoading] = useState(false);
  const setIsAuthenticated = useSetAtom(userLogin);
  const [products, setProducts] = useAtom(productsCart);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleTotalPrice = () => {
    setTotalPrice(
      products.reduce((total, { price, quantity }) => {
        return total + price * quantity;
      }, 0)
    );
  };

  const handleQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    product: ProductsCart
  ) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items in stock for ${product.name}`);
    } else {
      setProducts((prevProducts) => {
        const findProduct = prevProducts.find(({ id }) => id === product.id);
        if (findProduct) {
          findProduct.quantity = newQuantity || 1;
        }
        return [...prevProducts];
      });
    }
  };

  const handleRemoveProduct = (id: number) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== id);
    });
  };

  const handlePurchase = async () => {
    setLoading(true);
    const dataSend = products.map(({ id }) => id);
    const resultPurchase = await processPurchase(dataSend, token);
    setLoading(false);

    if (resultPurchase.message) {
      toast.error(resultPurchase.message);
      if (resultPurchase.message === "Invalid token") {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        Cookies.remove("auth-token");
        setIsAuthenticated({ login: false, token: "" });
        router.push("/login");
      }
    } else {
      toast.success("Successfully purchased product");
      const { date, id, products } = resultPurchase;
      setOrders((order) => [
        ...order,
        { date, id, products, status: "approved" },
      ]);
      setProducts([]);
    }
  };

  useEffect(() => {
    handleTotalPrice();
  }, [products]); // eslint-disable-line

  return (
    <div>
      {products.length > 0 ? (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={product.quantity}
                    min="1"
                    max={product.stock}
                    onChange={(e) => handleQuantity(e, product)}
                    className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="px-1 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M3 6h18v2H3zm3 4h12v12H6zm2 2v8h8v-8zm5-8V4h4v2H8V4h4z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <p className="text-sm font-medium text-gray-800">
                  Total: ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-800">Total:</h3>
              <p className="text-xl font-semibold text-gray-800">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handlePurchase}
              disabled={
                products.some((product) => product.quantity > product.stock) ||
                loading
              }
              className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md focus:outline-none disabled:bg-gray-400"
            >
              {loading ? <Loading /> : "Purchase"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartComponent;
