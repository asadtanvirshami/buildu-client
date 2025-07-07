// app/auth/signup/page.tsx
"use client";

import React from "react";
import SignUpForm from "./form/signup-form";
import Image from "next/image";
import { useTheme } from "next-themes";

import dark_logo from "../../../../../public/assets/dark.png";
import light_logo from "../../../../../public/assets/light.png";

const SignUpPage = () => {
  const theme = useTheme()
  return (
    <div className="grid items-center justify-center h-screen w-full">
      <div className="lg:grid bg-gradient-to-r lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen">
        <div
          className={`hidden sm:flex h-screen align-middle bg-gradient-to-r justify-center items-center xl:col-span-2`}
        >
          <div className="justify-center flex-col flex align-middle items-center">
            <Image src={theme.theme === "dark" ? dark_logo : light_logo} alt="Logo" className="w-[20rem]" />
          </div>
        </div>
        <div
          className={`flex w-full h-screen align-middle justify-center items-center border-silver-500 shadow-2xl `}
        >
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
