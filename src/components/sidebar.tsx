"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import CardSideBar from "./cardSideBar";

interface SidebarProps {
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username }) => {
  const pathname = usePathname();

  return (
    <div className="flex">
      <div className="bg-[#FFB800] fixed h-screen p-5 pt-8 lg:w-60 w-40 top-0 left-0 z-[100]">
        <div className="avatar object-center relative lg:left-8 left-3">
          <div className="lg:w-28 w-[90px] lg:h-28 h-[90px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
          </div>
        </div>
        <h2 className="object-center relative mt-2 text-lg font-semibold lg:left-16 left-8">
          {username}
        </h2>
        <div className="grid gap-[15px] object-center top-20 lg:left-5 left-1 relative">
          <div
            className={`flex justify-normal gap-1 rounded  hover:bg-white hover:p-2 transition-all  transition-color group/text duration-200 ${
              pathname === "/"
                ? "bg-white group-hover/text:text-black"
                : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover/text:stroke-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <a href="/" className="group-hover/text:text-black">
              Home
            </a>
          </div>

          <div
            className={`flex justify-normal gap-1 rounded  hover:bg-white hover:p-2 transition-all transition-color group/text duration-200
                          ${
                            pathname === "/dashboard"
                              ? "bg-white text-black mr-2"
                              : "text-white"
                          }`}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <span className="material-symbols-outlined group-hover/text:text-black">
              dashboard
            </span>
            <a href="/dashboard" className="group-hover/text:text-black">
              Dashboard
            </a>
          </div>

          <div
            className={`group flex justify-normal gap-1 rounded hover:bg-white hover:p-2 transition-all transition-color duration-200 ${
              pathname === "/reports"
                ? "bg-white text-black mr-2"
                : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover:stroke-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            <a href="/reports" className="group-hover:text-black">
              Reports
            </a>
          </div>
          <div
            className={`group flex justify-normal gap-1 rounded hover:bg-white hover:p-2 transition-all transition-color duration-200 ${
              pathname === "/controlling"
                ? "bg-white text-black mr-2"
                : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover:stroke-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            <a href="/controlling" className="group-hover:text-black">
              Controlling
            </a>
          </div>

          <div
            className={`group flex justify-normal gap-1 rounded hover:bg-white hover:p-2 transition-all transition-color duration-200 ${
              pathname === "/settings"
                ? "bg-white text-black mr-2"
                : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover:stroke-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            <a href="/settings" className="group-hover:text-black">
              Settings
            </a>
          </div>

          <div
            className={`group flex justify-normal gap-1 rounded hover:bg-white hover:p-2 transition-all transition-color duration-200 ${
              pathname === "/logout" ? "bg-white text-black mr-2" : "text-white"
            }`}
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("productId");
              localStorage.removeItem("humidData");
              localStorage.removeItem("tempData");
              signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/login`,
              });
            }}
          >
            <span className="material-symbols-outlined group-hover:text-black">
              logout
            </span>
            <a className="cursor-pointer group-hover:text-black">Logout</a>
          </div>
        </div>
        <div className="hidden lg:block">
          <CardSideBar />
        </div>
        <img
          src="assets/logo2 2.png"
          alt=""
          className="absolute w-auto h-16 lg:mt-[80px] mt-[260px] lg:left-4 left-2"
        />
      </div>
    </div>
  );
};

export default Sidebar;
