"use client";
import { dataUser } from "@/store";
import { useAtomValue } from "jotai";

function User() {
  const user = useAtomValue(dataUser);
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-800">Email</label>
        <p className="mt-1 text-gray-600">{user?.email}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Address
        </label>
        <p className="mt-1 text-gray-600">{user?.address}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800">Phone</label>
        <p className="mt-1 text-gray-600">{user?.phone}</p>
      </div>
    </div>
  );
}

export default User;
