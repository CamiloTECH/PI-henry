"use client";
import { useState } from "react";
import User from "./User";
import Orders from "./Orders";
import { useAtomValue } from "jotai";
import { dataUser } from "@/store";

function ProfileUser() {
  const [tabType, setTabType] = useState("profile");
  const userData = useAtomValue(dataUser);
  return (
    <>
      <h2 className="mt-2 mb-6 text-center text-2xl font-bold text-gray-800 capitalize">
        {userData?.name}
      </h2>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setTabType("profile")}
          className={`px-4 py-2 font-semibold text-sm rounded-l-md ${
            tabType === "profile"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setTabType("orders")}
          className={`px-4 py-2 font-semibold text-sm rounded-r-md ${
            tabType === "orders"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Orders
        </button>
      </div>
      {tabType === "profile" ? <User /> : <Orders />}
    </>
  );
}

export default ProfileUser;
