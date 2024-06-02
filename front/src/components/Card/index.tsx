import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Products } from "@/models";

const Card: React.FC<Products> = ({ name, price, image, id }) => {
  return (
    <Link href={`/detail/${id}`}>
      <div className="w-max cursor-pointer p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          priority
          className="w-48 h-40 object-cover rounded-t-lg"
        />
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
