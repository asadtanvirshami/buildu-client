"use client";
import React from "react";
import { Button } from "../../button";
import { FormattedMessage } from "react-intl";

const StartNowSection = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 mt-12">
      <div className="p-6 text-center bg-gradient-to-r rounded-xl from-pink-500 to-rose-500">
        <span className="text-4xl space-x-3 flex-none  justify-center md:flex lg:flex md:text-5xl font-extrabold tracking-tight">
          <h1 className="text-white"><FormattedMessage id="start_now"/></h1>
        </span>
        <Button className="bg-white w-[15rem] h-[3rem] mt-12 font-extrabold text-2xl text-rose-400">
          <FormattedMessage id="start_now_cta"/>
        </Button>
      </div>
    </div>
  );
};

export default StartNowSection;
