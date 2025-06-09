import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full flex justify-center items-center">
      <div className="container flex justify-center">{children}</div>
    </div>
  );
};

export default Container;
