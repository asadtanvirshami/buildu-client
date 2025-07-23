import React, { useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../badge";
import { Button } from "../button";
import {
  MoreHorizontalIcon,
  Pencil,
  PlusCircle,
  Settings,
  Trash2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  addStatus,
  deleteStatus,
  toggleEditable,
  updateStatusName,
} from "@/redux/slices/status/status-slice";
import { Status } from "@/types/task-type";
import { addTask } from "@/redux/slices/task/task-slice";

interface Props {
  status: Status;
  taskLength: number;
}

const ListActionGroup: React.FC<Props> = ({ status, taskLength }) => {
  const dispatch = useDispatch();
  const deleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDeleteWithDelay = () => {
    if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    deleteTimerRef.current = setTimeout(() => {
      dispatch(deleteStatus(status.id));
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    };
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Badge
        onDoubleClick={() => dispatch(toggleEditable(status.id))}
        className="text-sm bg-rose-500 text-white !rounded-sm px-2 py-1"
      >
        {status.editable ? (
          <input
            className="bg-transparent border-none outline-none text-white text-xs w-fit"
            value={status.name}
            autoFocus
            onChange={(e) =>
              dispatch(
                updateStatusName({ id: status.id, name: e.target.value })
              )
            }
            onBlur={() => dispatch(toggleEditable(status.id))}
            onKeyDown={(e) => {
              if (e.key === "Enter") dispatch(toggleEditable(status.id));
            }}
          />
        ) : (
          status.name
        )}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            className="w-6 h-6 mx-2"
            variant="ghost"
            size="icon"
          >
            <MoreHorizontalIcon className="text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-45 p-4 rounded-lg"
          side="right"
          align="end"
        >
          <DropdownMenuLabel className="p-0 font-normal text-xs text-gray-500 mb-2">
            Status Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => dispatch(toggleEditable(status.id))}
            >
              <Pencil className="mr-2 h-4 w-4" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(addStatus())}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Status
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Edit Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteWithDelay}>
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Delete in 10s
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="text-xs mb-1 text-slate-500">{taskLength}</p>
      <Button
        className="text-[12px]"
        onClick={() => dispatch(addTask({ statusId: status.id, title: "" }))}
        variant="ghost"
        size="xs"
      >
        <PlusCircle className="h-3 w-3 mr-1" />
        Add Task
      </Button>
    </div>
  );
};

export default ListActionGroup;
