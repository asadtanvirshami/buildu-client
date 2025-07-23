import React, { useState } from "react";
interface EditableCellProps {
  value: string;
  row: any;
  column: any;
  updateData: (rowIndex: number, columnId: string, value: string) => void;
}
export const EditableCell = ({
  value: initialValue,
  row,
  column,
  updateData, // (rowIndex, columnId, value)
}: EditableCellProps) => {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);

  const onBlur = () => {
    setEditing(false);
    updateData(row.index, column.id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return editing ? (
    <input
      className="border rounded px-1 py-0.5 w-full"
      value={value}
      autoFocus
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") onBlur();
      }}
    />
  ) : (
    <div onDoubleClick={() => setEditing(true)} className="cursor-pointer">
      {value || (
        <span className="text-gray-400 italic">Double-click to edit</span>
      )}
    </div>
  );
};
