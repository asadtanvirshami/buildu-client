import React, { memo } from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className=" w-full flex justify-center items-center">
      <div className={`${className}container flex justify-center`}>
        {children}
      </div>
    </div>
  );
};

export default memo(Container);
