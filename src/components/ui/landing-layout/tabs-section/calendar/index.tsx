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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Trade {
  id: string;
  date: string; // ISO format e.g. "2025-07-01T09:30:00Z"
  pair: string; // Currency pair or instrument
  profit: number; // Profit or loss amount
  entry: string; // Entry price or signal
  exit: string; // Exit price or reason
  notes: string; // Optional notes
}

const TradeContext = React.createContext<
  [Trade[], React.Dispatch<React.SetStateAction<Trade[]>>] | undefined
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
  const context = React.useContext(TradeContext);
  if (!context) throw new Error("TradeContext not found");
  const [trades] = context;

  const matchingTrades = trades.filter((trade) =>
    isSameDay(new Date(trade.date), props.day.date)
  );
  
  const handleDateClick = () => {
    const event = new CustomEvent('dateSelected', { detail: props.day.date });
    window.dispatchEvent(event);
  };

  return (
    <td {...props}>
      <div 
        className="w-full h-full flex flex-col items-center justify-start text-xs p-1 relative cursor-pointer"
        onClick={handleDateClick}
      >
        <div className="text-[15px] font-semibold text-center">
          {format(props.day.date, "d")}
        </div>
        <div className="absolute top-5 left-0 right-0 space-y-1 px-1 pointer-events-none">
          {matchingTrades.slice(0, 3).map((trade, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <div
                  className={`truncate text-[11px] px-1 py-0.5 rounded max-w-full overflow-hidden whitespace-nowrap text-white pointer-events-auto ${
                    trade.profit >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                  draggable
                  onDragStart={(e) => {
                    e.stopPropagation();
                    e.dataTransfer.setData("text/plain", JSON.stringify(trade));
                  }}
                  onClick={(e) =>{
                    e.stopPropagation()
                    handleDateClick()
                  }}
                >
                  {trade.pair}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white max-w-xs">
                <div className="font-medium text-sm">{trade.pair}</div>
                <div className="text-xs">P/L: ${trade.profit}</div>
                <div className="text-xs">Entry: {trade.entry}</div>
                <div className="text-xs">Exit: {trade.exit}</div>
                <div className="text-xs italic mt-1">{trade.notes}</div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </td>
  );
};

// ... existing code ...

const SelectedDateTrades = ({ selectedDate, trades }: { selectedDate: Date | undefined; trades: Trade[] }) => {
  if (!selectedDate) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Trade Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a date to view trades</p>
        </CardContent>
      </Card>
    );
  }

  const selectedTrades = trades.filter((trade) =>
    isSameDay(new Date(trade.date), selectedDate)
  );

  const totalProfit = selectedTrades.reduce((sum, trade) => sum + trade.profit, 0);
  const winningTrades = selectedTrades.filter(trade => trade.profit > 0).length;
  const losingTrades = selectedTrades.filter(trade => trade.profit < 0).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">
          Trades for {format(selectedDate, "MMMM d, yyyy")}
        </CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Total: {selectedTrades.length}</span>
          <span className={totalProfit >= 0 ? "text-green-600" : "text-red-600"}>
            P/L: ${totalProfit.toFixed(2)}
          </span>
          <span className="text-green-600">Wins: {winningTrades}</span>
          <span className="text-red-600">Losses: {losingTrades}</span>
        </div>
      </CardHeader>
      <CardContent>
        {selectedTrades.length === 0 ? (
          <p className="text-muted-foreground">No trades for this date</p>
        ) : (
          <div className="space-y-3">
            {selectedTrades.map((trade, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border !bg-card ${
                  trade.profit >= 0 ? "border-green-500" : "border-red-500"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-lg">{trade.pair}</div>
                  <div className={`font-bold text-lg ${
                    trade.profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    ${trade.profit.toFixed(2)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Entry:</span>
                    <span className="ml-1 font-medium">{trade.entry}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Exit:</span>
                    <span className="ml-1 font-medium">{trade.exit}</span>
                  </div>
                </div>
                {trade.notes && (
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Notes:</span>
                    <span className="ml-1 italic">{trade.notes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function TradeCalendarDemo({
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
  taskData: Trade[];
}) {
  const defaultClassNames = getDefaultClassNames();
  const [taskList, setTaskList] = React.useState<Trade[]>(taskData);
  const [selected, setSelected] = React.useState<Date | undefined>(undefined);
  
  React.useEffect(() => {
    const handleDateSelected = (event: CustomEvent) => {
      setSelected(event.detail);
    };

    window.addEventListener('dateSelected', handleDateSelected as EventListener);
    return () => {
      window.removeEventListener('dateSelected', handleDateSelected as EventListener);
    };
  }, []);
  
  return (
    <TradeContext.Provider value={[taskList, setTaskList]}>
      <TooltipProvider>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <DayPicker
              showOutsideDays={showOutsideDays}
              className={cn(
                "bg-card h-96 md:h-full lg:h-full group/calendar border p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
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
                root: cn(
                  "w-full backdrop-blur-3xl bg-white/20 ",
                  defaultClassNames.root
                ),
                months: cn(
                  "flex gap-4 flex-col md:flex-row relative",
                  defaultClassNames.months
                ),
                month: cn(
                  "flex flex-col w-full gap-4",
                  defaultClassNames.month
                ),
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
                dropdown: cn(
                  "absolute inset-0 opacity-0",
                  defaultClassNames.dropdown
                ),
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
                week: cn(
                  "grid grid-cols-7 w-full gap-1",
                  defaultClassNames.week
                ),

                week_number_header: cn(
                  "select-none w-(--cell-size)",
                  defaultClassNames.week_number_header
                ),
                week_number: cn(
                  "text-[0.8rem] select-none text-muted-foreground",
                  defaultClassNames.week_number
                ),
                day: cn(
                  "relative w-full h-auto mt-2 p-0 text-center aspect-square  group/day select-none  [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
                  defaultClassNames.day
                ),
                range_start: cn(
                  "rounded-l-md bg-accent",
                  defaultClassNames.range_start
                ),
                range_middle: cn(
                  "rounded-none",
                  defaultClassNames.range_middle
                ),
                range_end: cn(
                  "rounded-r-md bg-accent",
                  defaultClassNames.range_end
                ),
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
                    return (
                      <ChevronLeftIcon
                        className={cn("size-4", className)}
                        {...props}
                      />
                    );
                  if (orientation === "right")
                    return (
                      <ChevronRightIcon
                        className={cn("size-4", className)}
                        {...props}
                      />
                    );
                  return (
                    <ChevronDownIcon
                      className={cn("size-4", className)}
                      {...props}
                    />
                  );
                },
                DayButton: CalendarDayButton,
                Day: DayCell,
                ...components,
              }}
              {...props}
            />
          </div>
          <div>
            <SelectedDateTrades selectedDate={selected} trades={taskList} />
          </div>
        </div>
      </TooltipProvider>
    </TradeContext.Provider>
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
  const context = React.useContext(TradeContext);
  const [, setTaskList] = context || [];

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const handleClick = () => {
    if (setTaskList) {
      // Update the selected date in the parent component
      const event = new CustomEvent('dateSelected', { detail: day.date });
      window.dispatchEvent(event);
    }
  };

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
      onClick={handleClick}
      {...props}
    />
  );
}

export { TradeCalendarDemo, CalendarDayButton };
