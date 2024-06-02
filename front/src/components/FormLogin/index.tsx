"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginPost } from "@/models";
import { getOrders, processLogin } from "@/services";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useSetAtom } from "jotai";
import { dataUser, ordersUser, userLogin } from "@/store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function FormLogin() {
  const router = useRouter();
  const setUserData = useSetAtom(dataUser);
  const setLoginUser = useSetAtom(userLogin);
  const setOrdersData = useSetAtom(ordersUser);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginPost>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginPost) => {
    setLoading(true);
    const loginResult = await processLogin(data);

    if (loginResult.message) {
      toast.error(loginResult.message);
    } else {
      const getOrdersUser = await getOrders(loginResult.token);
      setOrdersData(getOrdersUser);
      const { address, email, id, name, phone, role } = loginResult.user;
      const dataUser = { address, email, id, name, phone, role };
      setUserData(dataUser);
      setLoginUser({ login: loginResult.login, token: loginResult.token });
      window.localStorage.setItem("token", loginResult.token);
      window.localStorage.setItem("user", JSON.stringify(dataUser));
      Cookies.set("auth-token", loginResult.token, { expires: 2 });
      toast.success("Successful login!");
      router.push("/home");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-800"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          disabled={loading}
          {...register("email")}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-800"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          disabled={loading}
          {...register("password")}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 focus:outline-none ${
          (!isValid || loading) && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? <Loading /> : "Login"}
      </button>
    </form>
  );
}

export default FormLogin;
