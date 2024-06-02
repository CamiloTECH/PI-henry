"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Products } from "@/models";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { addProductsCart, products, userLogin } from "@/store";
import Loading from "@/components/Loading";
import { getProducts } from "@/services";
import toast from "react-hot-toast";

function Detail({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const { login, token } = useAtomValue(userLogin);
  const handleProductsCart = useSetAtom(addProductsCart);
  const [productsValues, setProductsValues] = useAtom(products);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [product, setProduct] = useState<Products | undefined>();

  const handleAddToCart = () => {
    if (login && token) {
      if (typeof quantity === "number" && product) {
        handleProductsCart({ ...product, quantity });
        setQuantity(1);
        toast.success("Product added to cart!");
      }
    } else {
      toast.error("You need to login to add the product!");
    }
  };

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (product) {
      const { value } = e.target;
      const numberProduct = Number(value);
      if (numberProduct < 1) {
        setQuantity("");
      } else if (numberProduct <= product.stock) {
        setQuantity(numberProduct);
      }
    }
  };
  const findProduct = (products?: Products[]) => {
    const paramId = Number(id);
    const finalProducts = products || productsValues;
    const productFound = finalProducts.find(
      (productValue) => productValue.id === paramId
    );
    return productFound;
  };

  useEffect(() => {
    setLoading(true);
    if (productsValues.length > 0) {
      const resultProduct = findProduct();
      setLoading(false);
      setProduct(resultProduct);
    } else {
      getProducts()
        .then((products) => {
          const resultProduct = findProduct(products);
          setProduct(resultProduct);
          setProductsValues(products);
        })
        .catch(() => {
          setProduct(undefined);
          setProductsValues([]);
        })
        .finally(() => setLoading(false));
    }
  }, []); // eslint-disable-line

  return (
    <div>
      {loading ? (
        <Loading />
      ) : product ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
          <div className="flex flex-col lg:flex-row">
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.name}
              className="w-full lg:w-1/2 h-auto object-cover rounded-lg mb-8 lg:mb-0 lg:mr-8"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <p className="mt-4 text-xl font-semibold text-gray-800">
                ${product.price.toFixed(2)}
              </p>
              <p className="mt-2 text-gray-600">Stock: {product.stock}</p>

              <div className="mt-6 flex items-center">
                <label htmlFor="quantity" className="mr-4 text-gray-800">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantity}
                  className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-6 w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  typeof quantity === "string" ||
                  quantity < 1 ||
                  quantity > product.stock
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 w-full text-3xl font-bold">
          A product with id {id} was not found
        </p>
      )}
    </div>
  );
}

export default Detail;
