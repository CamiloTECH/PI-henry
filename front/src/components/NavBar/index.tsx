"use client";

import { dataUser, ordersUser, userLogin } from "@/store";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { getOrders } from "@/services";
import Loading from "../Loading";

export default function NavBar() {
  const router = useRouter();
  const setOrdersData = useSetAtom(ordersUser);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setUserData = useSetAtom(dataUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useAtom(userLogin);

  const onLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    Cookies.remove("auth-token");
    setIsAuthenticated({ login: false, token: "" });
    router.push("/home");
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target && event.target instanceof Node) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userData = window.localStorage.getItem("user");
    if (token && userData) {
      setLoading(true);
      getOrders(token)
        .then((orders) => {
          setIsAuthenticated({ login: true, token });
          setOrdersData(orders);
          const parseData = JSON.parse(userData);
          setUserData(parseData);
        })
        .catch(() => {
          onLogout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []); // eslint-disable-line

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-gray-800"
                >
                  <path d="M6 2L3 6v15a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="text-2xl font-bold text-gray-800">
                  Shop-PI
                </span>
              </span>
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link href="/home">
              <span className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="h-7 w-7 text-gray-800"
                >
                  <path d="M32 12l18 16h-6v20h-8V34H28v14h-8V28h-6L32 12zM28 26h8v10h-8V26z" />
                  <path d="M32 4L4 28h8v32h16V36h8v24h16V28h8L32 4z" />
                </svg>

                <span className="sr-only">Cart</span>
              </span>
            </Link>
            {loading ? (
              <Loading />
            ) : isAuthenticated.login ? (
              <>
                <Link href="/cart">
                  <span className="relative flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-gray-800"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19a2 2 0 001.99-1.79l1.5-9H6" />
                    </svg>
                    <span className="sr-only">Cart</span>
                  </span>
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={handleDropdownToggle}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7 text-gray-800"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 14c-2.2 0-4 1.8-4 4v1h8v-1c0-2.2-1.8-4-4-4zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <Link href={`/profile`} onClick={handleDropdownToggle}>
                        <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          Profile
                        </span>
                      </Link>
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className="px-4 py-2 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors">
                    Login
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="px-4 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors">
                    Signup
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
