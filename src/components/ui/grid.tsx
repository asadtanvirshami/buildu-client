import React from "react";

const Grid = ({ numberOfGrids = 9 }: { numberOfGrids?: number }) => {
  const gridItems = React.useMemo(() => {
    return Array.from({ length: numberOfGrids }, (_, index) => (
      <div
        key={index}
        className="bg-gray-300 rounded p-4 flex items-center justify-center"
      >
        {index + 1}
      </div>
    ));
  }, [numberOfGrids]);

  return <div className="grid grid-cols-3 gap-4">{gridItems}</div>;
};

export default Grid;
