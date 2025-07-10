// app/auth/signin/page.tsx
"use client";

import React from "react";
import SignInForm from "@/app/(user)/auth/signin/form/signin-form";
import { useTheme } from "next-themes";

const SignInPage = () => {
  const theme = useTheme();
  return (
    <div className="grid items-center justify-center h-screen w-full">
      <div className="lg:grid bg-gradient-to-r lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen dark:bg-pink">
        <div
          className={`hidden sm:flex h-screen align-middle bg-gradient-to-r justify-center items-center xl:col-span-2 `}
        >
          <div className="justify-center flex-col flex align-middle items-center">
            <h1 className=" md:text-[9rem] lg:text-[9.5rem] xl:text-[18rem] fade-up font-[family-name:var(--font-celliad)]">
              BuildU
            </h1>
          </div>
        </div>
        <div
          className={`flex w-full h-screen align-middle justify-center items-center border-silver-500 shadow-2xl`}
        >
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
