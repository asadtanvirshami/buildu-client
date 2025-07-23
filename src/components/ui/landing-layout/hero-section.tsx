"use client";

import React from "react";
import { Button } from "../button";
import { FormattedMessage } from "react-intl";

const HeroSection = () => {
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left fade-up">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
         <FormattedMessage id="hero_title"/>
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
        <FormattedMessage id="hero_desc"/>
        </p>
      </div>
      <div className="mt-8">
        <Button
          size={"lg"}
          className="px-8 py-3 cursor-pointer text-lg font-semibold text-white bg-gradient-to-tr from-pink-500 to-rose-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
        >
          <FormattedMessage id="hero_cta"/>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
