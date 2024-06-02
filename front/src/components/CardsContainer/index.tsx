"use client";
import { products } from "@/store";
import { useAtom } from "jotai";
import Card from "../Card";
import { useEffect, useState } from "react";
import { getProducts } from "@/services";
import Loading from "../Loading";

function CardsContainer() {
  const [productsValues, setProductsValues] = useAtom(products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productsValues.length === 0) {
      setLoading(true);
      getProducts()
        .then((products) => {
          setProductsValues(products);
        })
        .catch(() => {
          setProductsValues([]);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-start gap-6 flex-wrap items-center pt-10">
      {loading ? (
        <Loading />
      ) : productsValues.length > 0 ? (
        productsValues.map((product) => <Card key={product.id} {...product} />)
      ) : (
        <p className="text-center text-gray-600 w-full text-3xl font-bold">
          There are no products to show.
        </p>
      )}
    </div>
  );
}

export default CardsContainer;
