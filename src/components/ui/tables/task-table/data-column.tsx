import Task from "@/types/task-type";
import { Checkbox } from "../../checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { FlagIcon } from "lucide-react";
import { Badge } from "../../badge";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../../label";

type EditingCell = {
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<React.SetStateAction<{ rowId: string; columnId: string } | null>>;
};

export const getColumns = ({
  editingCell,
  setEditingCell,
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
      cell: ({ row, column }) => {
        const isEditing =
          editingCell?.rowId === row.id && editingCell?.columnId === column.id;

        return isEditing ? (
          <input
            type="text"
            defaultValue={row.getValue("title")}
            className="border px-1 py-0.5 text-sm rounded w-full"
            autoFocus
            onBlur={() => setEditingCell(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditingCell(null);
            }}
          />
        ) : (
          <div
            className="capitalize cursor-pointer"
            onDoubleClick={() => setEditingCell({ rowId: row.id, columnId: column.id })}
          >
            {row.getValue("title")}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row, column }) => {
        const isEditing =
          editingCell?.rowId === row.id && editingCell?.columnId === column.id;

        return isEditing ? (
          <textarea
            defaultValue={row.getValue("description")}
            className="border px-1 py-0.5 text-sm rounded w-full"
            autoFocus
            onBlur={() => setEditingCell(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditingCell(null);
            }}
          />
        ) : (
          <p
            className="truncate overflow-hidden text-ellipsis cursor-pointer"
            onDoubleClick={() => setEditingCell({ rowId: row.id, columnId: column.id })}
          >
            {row.getValue("description")}
          </p>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <Badge className={`${row.getValue("priority") === 'low' ? 'bg-green-500 border-green-800 b' : row.getValue("priority") === 'medium' ? 'bg-yellow-500' : 'bg-red-500'} text-[10px] rounded-sm h-5 text-white}`}>{row.getValue("priority")}</Badge>
      ),
      enableSorting: false,

    },

    {
      accessorKey: "flag",
      header: "Flag",
      cell: ({ row }) => (
        <>
          {row.getValue("flag") ? <FlagIcon fill="red" className="w-4 h-4 text-rose-400" /> : ""}
        </>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <>
            <Label htmlFor={`${row.original.id}-status`} className="sr-only">
              Status
            </Label>
            <Select >
              <Badge variant={"outline"} className="text-[10px] px-0 flex justify-evenly bg-card rounded-xl w-[8rem] h-6 bg- text-white ">
                <SelectTrigger
                  className="text-[10px] rounded-sm h-5 !text-white **:data-[slot=select-value]:block border-none w-full !bg-transparent **:data-[slot=select-value]:truncate"
                  id={`${row.original.id}-status`}
                >
                  <span className={`${row.getValue("status") === "pending" ? "bg-red-500" : row.getValue("status") === "paused" ? "bg-yellow-500" : row.getValue("status") === "canceled" ? "bg-red-500" : row.getValue("status") === "done" ? "bg-green-500" : row.getValue("status") === "in-progress" ? "bg-blue-500" : "bg-gray-500"} h-2 w-2 rounded-full`} />
                  <SelectValue className="w-full !capitalize" defaultValue={row.getValue("status")} placeholder={row.getValue("status") ?? "Select a status"} />
                </SelectTrigger>
              </Badge>
              <SelectContent align="end">
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="in-progress">In-progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </>
        )
      },
    },
    // {
    //   accessorKey: "flag",
    //   header: "Flag",
    //   cell: ({ row }) => (
    //     <>
    //       {row.getValue("flag") ? <FlagIcon fill="red" className="w-4 h-4 text-rose-400" /> : ""}
    //     </>
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
  ];
