"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  CalendarDay,
  DayButton,
  DayPicker,
  getDefaultClassNames,
  Modifiers,
} from "react-day-picker";
import { format, isSameDay } from "date-fns";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  priority: string;
  flag: boolean;
  dueDate: string;
  taskReminder: {
    takskId: string;
    remindAt: string;
  }[];
}
const TaskContext = React.createContext<
  [Task[], React.Dispatch<React.SetStateAction<Task[]>>] | undefined
>(undefined);

// const colors = [
//   "bg-blue-100 text-blue-800 hover:bg-blue-200",
//   "bg-green-100 text-green-800 hover:bg-green-200",
//   "bg-purple-100 text-purple-800 hover:bg-purple-200",
//   "bg-red-100 text-red-800 hover:bg-red-200",
//   "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
//   "bg-pink-100 text-pink-800 hover:bg-pink-200",
//   "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
//   "bg-teal-100 text-teal-800 hover:bg-teal-200",
// ];

const DayCell = (
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
    children?: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement>
) => {
  const context = React.useContext(TaskContext);
  if (!context) throw new Error("TaskContext not found");
  const [taskList, setTaskList] = context;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [draggedTask, setDraggedTask] = React.useState<Task | null>(null);
  const [timeValue, setTimeValue] = React.useState("");

  const matchingTasks = taskList.filter((task) =>
    isSameDay(new Date(task.dueDate), props.day.date)
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const task: Task = JSON.parse(e.dataTransfer.getData("text/plain"));
    setDraggedTask(task);
    setDialogOpen(true);
  };

  const handleConfirmTime = () => {
    if (!timeValue || !/^[0-2]?\d:[0-5]\d$/.test(timeValue)) return;

    const newDate = new Date(props.day.date);
    const [hours, minutes] = timeValue.split(":").map(Number);
    newDate.setHours(hours, minutes, 0, 0);

    const updated = taskList.map((t) =>
      t.id === draggedTask?.id ? { ...t, dueDate: newDate.toISOString() } : t
    );
    setTaskList(updated);
    setDialogOpen(false);
    setTimeValue("");
  };

  return (
    <td {...props}>
      <div
        className="w-full h-full flex flex-col items-center justify-start text-xs p-1 relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* //calendar view// */}
        <div className="text-[15px] font-semibold text-center">
          {format(props.day.date, "d")}
        </div>
        <div className="absolute top-5 left-0 right-0 space-y-1 px-1">
          {matchingTasks.slice(0, 3).map((task, idx) => {
            const colorClass = "bg-aqua-500"
            return (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <div
                    className={`truncate px-1 py-0.5 ${colorClass} bg-violet-500 dark:text-white rounded text-[13px] cursor-grab`}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", JSON.stringify(task))
                    }
                  >
                    {task.title}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-violet-500 text-white">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="text-[12px]">
                    {format(new Date(task.dueDate), "PPpp")}
                  </div>
                  {task.description && (
                    <div className="mt-1 text-[12px] ">
                      {task.description}
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Time</DialogTitle>
              <DialogDescription>
                Enter new time for the task (HH:MM 24h format)
              </DialogDescription>
            </DialogHeader>
            <Input
              type="time"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
            />
            <Button onClick={handleConfirmTime}>Confirm</Button>
          </DialogContent>
        </Dialog>
      </div>
    </td>
  );
};

function EventCalendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  taskData,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  taskData: Task[];
}) {
  const defaultClassNames = getDefaultClassNames();
  const [taskList, setTaskList] = React.useState<Task[]>(taskData);

  return (
    <TaskContext.Provider value={[taskList, setTaskList]}>
      <TooltipProvider>
        {/* <div className=" grid grid-cols-2 gap-3"> */}
        <div className="">
          <div className=" overflow-x-auto">
            <DayPicker
              showOutsideDays={showOutsideDays}
              className={cn(
                "bg-card group/calendar border p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
                String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
                className
              )}
              captionLayout={captionLayout}
              formatters={{
                formatMonthDropdown: (date) =>
                  date.toLocaleString("default", { month: "short" }),
                ...formatters,
              }}
              classNames={{
                root: cn("w-full backdrop-blur-3xl bg-white/20 ", defaultClassNames.root),
                months: cn(
                  "flex gap-4 flex-col md:flex-row relative",
                  defaultClassNames.months
                ),
                month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
                nav: cn(
                  "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
                  defaultClassNames.nav
                ),
                button_previous: cn(
                  buttonVariants({ variant: buttonVariant }),
                  "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
                  defaultClassNames.button_previous
                ),
                button_next: cn(
                  buttonVariants({ variant: buttonVariant }),
                  "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
                  defaultClassNames.button_next
                ),
                month_caption: cn(
                  "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
                  defaultClassNames.month_caption
                ),
                dropdowns: cn(
                  "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
                  defaultClassNames.dropdowns
                ),
                dropdown_root: cn(
                  "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
                  defaultClassNames.dropdown_root
                ),
                dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
                caption_label: cn(
                  "select-none font-medium",
                  captionLayout === "label"
                    ? "text-sm"
                    : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
                  defaultClassNames.caption_label
                ),
                table: "w-full border-collapse",
                weekdays: cn("flex", defaultClassNames.weekdays),
                weekday: cn(
                  "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
                  defaultClassNames.weekday
                ),
                week: cn("flex w-full mt-2", defaultClassNames.week),
                week_number_header: cn(
                  "select-none w-(--cell-size)",
                  defaultClassNames.week_number_header
                ),
                week_number: cn(
                  "text-[0.8rem] select-none text-muted-foreground",
                  defaultClassNames.week_number
                ),
                day: cn(
                  "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
                  defaultClassNames.day
                ),
                range_start: cn(
                  "rounded-l-md bg-accent",
                  defaultClassNames.range_start
                ),
                range_middle: cn("rounded-none", defaultClassNames.range_middle),
                range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
                today: cn(
                  "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
                  defaultClassNames.today
                ),
                outside: cn(
                  "text-muted-foreground aria-selected:text-muted-foreground",
                  defaultClassNames.outside
                ),
                disabled: cn(
                  "text-muted-foreground opacity-50",
                  defaultClassNames.disabled
                ),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
              }}
              components={{
                Root: ({ className, rootRef, ...props }) => (
                  <div ref={rootRef} className={cn(className)} {...props} />
                ),
                Chevron: ({ className, orientation, ...props }) => {
                  if (orientation === "left")
                    return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
                  if (orientation === "right")
                    return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
                  return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
                },
                DayButton: CalendarDayButton,
                Day: DayCell,
                ...components,
              }}
              {...props}
            />
          </div>
          {/* <div className="float-right pb-4 backdrop-blur-3xl bg-white/20 rounded-xl p-3 space-y-3 overflow-x-auto">
            {taskList.map((task) => <Card className="py-4 px-4" key={task.id}>
              <CardHeader className="h-0"><CardTitle>{task.title}</CardTitle></CardHeader>
              <CardContent><CardDescription>{task.description}</CardDescription>
                <CardDescription> {format(new Date(task.dueDate), "PPpp")}</CardDescription>
              </CardContent>

            </Card>)}
          </div> */}
        </div>

      </TooltipProvider>
    </TaskContext.Provider>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      className={cn(
        "flex aspect-square size-auto w-full flex-col gap-1 leading-none font-normal",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { EventCalendar, CalendarDayButton };