"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { SignupFormInputs } from "@/models";
import { processSignUp } from "@/services";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be 10 digits long")
    .required("Phone is required"),
});

function FormSignup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormInputs) => {
    setLoading(true);
    const signUpResult = await processSignUp(data);
    setLoading(false);
    if (signUpResult.message) {
      toast.error(signUpResult.message);
    } else {
      toast.success("Successful Sign-up!. Now you can login");
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-800"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          disabled={loading}
          {...register("name")}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
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

      <div className="space-y-1">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-800"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          disabled={loading}
          {...register("confirmPassword")}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-800"
        >
          Address
        </label>
        <input
          id="address"
          type="text"
          disabled={loading}
          {...register("address")}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-800"
        >
          Phone
        </label>
        <input
          id="phone"
          type="number"
          disabled={loading}
          {...register("phone")}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 focus:outline-none ${
          (!isValid || loading) && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? <Loading /> : "Sign Up"}
      </button>
    </form>
  );
}

export default FormSignup;
