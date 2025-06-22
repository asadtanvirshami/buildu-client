import React, { memo } from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (

    <div className={`${className}container w-full h-full flex justify-center`}>
      {children}
    </div>
  );
};

export default memo(Container);
