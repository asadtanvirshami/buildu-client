import { Task } from "@/types/task-type";
import { Checkbox } from "../../checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronRight, EditIcon, Trash2 } from "lucide-react";
import { Badge } from "../../badge";
import { Textarea } from "../../textarea";
import React from "react";
import { Button } from "../../button";
import { useDispatch } from "react-redux";
import {
  addSubtask,
  removeSubtask,
  removeTask,
} from "@/redux/slices/task/task-slice";

type EditingCell = {
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  statusId: string;
};

export const getColumns = ({
  editingCell,
  setEditingCell,
  statusId,
}: EditingCell): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row, getValue, column }: any) => {
      const canExpand = row.getCanExpand();
      const isExpanded = row.getIsExpanded();
      const value = getValue() as string | undefined;

      const [editing, setEditing] = React.useState(false);
      const [inputValue, setInputValue] = React.useState(value || "");
      const inputRef = React.useRef<HTMLInputElement>(null);
      const dispatch = useDispatch();

      const onSave = () => {
        setEditing(false);
        column.columnDef.meta?.updateData(row.index, column.id, inputValue);
      };
      const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        task: Task
      ) => {
        if (e.key === "Tab") {
          e.preventDefault();
          dispatch(addSubtask({ parentId: task.id, title: "Start Writing" }));
        }
      };

      React.useEffect(() => {
        if (editing) inputRef.current?.focus();
      }, [editing]);

      console.log(row.depth);
      console.log(row.original);
      
      return (
        <div
          className="flex items-center gap-2 w-full group relative"
          style={{ paddingLeft: `${row.depth * 1.5}rem` }}
        >
          {canExpand ? (
            <Button
              type="button"
              className="w-6 h-6 p-0"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
            >
              {isExpanded ? <ChevronDownIcon /> : <ChevronRight />}
            </Button>
          ) : (
            <div className="w-6 h-6" />
          )}

          <div className="flex items-center w-full relative">
            <input
              ref={inputRef}
              className="px-1 text-[12px] rounded w-full outline-none bg-transparent"
              value={inputValue}
              disabled={!editing}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={onSave}
              onKeyDown={(e) =>
                (e.key === "Enter" && onSave()) ||
                handleKeyDown(e, row.original)
              }
              onDoubleClick={() => setEditing(true)}
            />
            {!editing && (
              <div className="absolute gap-1 right-0 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="border h-fit w-fit p-1"
                  onClick={() => setEditing(true)}
                >
                  <EditIcon className="w-2 h-2 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="border h-fit w-fit p-1"
                  onClick={() => {
                    if (row.depth > 0 && row.original.parentId) {
                      dispatch(
                        removeSubtask({
                          parentId: row.original.parentId,
                          subtaskId: row.original.id,
                        })
                      );
                    } else {
                      dispatch(removeTask({ taskId: row.original.id }));
                    }
                  }}
                >
                  <Trash2 className="w-2 h-2 text-red-500" />
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   cell: ({ row, column }) => {
  //     const isEditing =
  //       editingCell?.rowId === row.id && editingCell?.columnId === column.id;
  //     const dispatch = useDispatch();

  //     return isEditing ? (
  //       <Textarea
  //         defaultValue={row.getValue("description")}
  //         className="px-1 text-[12px] rounded w-full outline-none bg-transparent"
  //         autoFocus
  //         onBlur={(e) => {
  //           setEditingCell(null);
  //           dispatch(
  //             updateTaskDescription({
  //               statusId,
  //               taskId: row.original.id,
  //               newDescription: e.target.value,
  //             })
  //           );
  //         }}
  //         onKeyDown={(e) => {
  //           if (e.key === "Enter") {
  //             e.currentTarget.blur();
  //           }
  //         }}
  //       />
  //     ) : (
  //       <p
  //         className="px-1 text-[12px] rounded w-full outline-none bg-transparent"
  //         onDoubleClick={() =>
  //           setEditingCell({ rowId: row.id, columnId: column.id })
  //         }
  //       >
  //         {row.getValue("description")}
  //       </p>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: true,
  // },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge
        className={`${
          row.getValue("priority") === "low"
            ? "bg-green-500 border-green-800"
            : row.getValue("priority") === "medium"
            ? "bg-yellow-500"
            : "bg-red-500"
        } text-[10px] rounded-sm h-5 text-white`}
      >
        {row.getValue("priority")}
      </Badge>
    ),
    enableSorting: false,
  },
];
