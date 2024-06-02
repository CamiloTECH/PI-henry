"use client";

import { ordersUser } from "@/store";
import { useAtomValue } from "jotai";
import Image from "next/image";

function Orders() {
  const orders = useAtomValue(ordersUser);
  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map(({ id, products, date, status }) => (
          <div key={id} className="p-4 bg-gray-100 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Order #{id}
              </h3>
              <span
                className={`text-sm font-medium capitalize ${
                  status === "approved" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Date: {date}</p>
            <div className="mt-4 space-y-2">
              {products.map(({ id, image, name, description, price }) => (
                <div key={id} className="flex items-center space-x-4">
                  <Image
                    width={200}
                    height={200}
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {name}
                    </h4>
                    <p className="text-sm text-gray-600">{description}</p>
                    <p className="text-sm font-medium text-gray-800">
                      ${price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">
          You don&apos;t have any orders yet.
        </p>
      )}
    </div>
  );
}

export default Orders;
