import { Button } from "@/components/ui/button";
import React from "react";
import { FormattedMessage } from "react-intl";

const Overview = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-12">
      <span className="text-4xl space-x-3 flex-none md:flex lg:flex md:text-4xl lg:text-5xl font-extrabold tracking-tight">
        <h1 className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
         <FormattedMessage id="overview_title01"/>
        </h1>
        <h1><FormattedMessage id="overview_title02"/></h1>
      </span>
      <p className="text-lg md:text-xl mt-8 font-light">
      <FormattedMessage id="overview_dec"/>
      </p>
      <div className="flex justify-center gap-4 pt-6 flex-wrap">
        <Button className="relative overflow-hidden px-6 py-3 text-rose-500 dark:hover:text-white cursor-pointer rounded-md font-semibold group">
          <span className="absolute inset-0  bg-gradient-to-tr from-pink-500 to-rose-500  transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
          <span className="relative z-10   group-hover:text-white transition-colors duration-300">
            <FormattedMessage id="overview_cta01"/>
          </span>
        </Button>
        <Button className="border border-white px-6 py-3 rounded-lg cursor-pointer hover:bg-white hover:text-rose-600 transition">
        <FormattedMessage id="overview_cta02"/>
        </Button>
      </div>
    </div>
  );
};

export default Overview;
