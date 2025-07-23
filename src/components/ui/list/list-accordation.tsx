"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAccordion,
  addStatus,
  statusSelectors,
} from "@/redux/slices/status/status-slice";
import { Accordion } from "../accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "../button";
import { ChevronDownIcon, ChevronRight } from "lucide-react";
import ListActionGroup from "./list-action-group";
import {
  selectAllTasks,
  selectTasksByStatusId,
} from "@/redux/slices/task/task-slice";
import { DataTable } from "../tables/task-table/data-table";
import { Status } from "@/types/task-type";
import { RootState } from "@/redux/store";

const StatusAccordionItem = React.memo(({ status }: { status: Status }) => {
  const dispatch = useDispatch();
  const tasksForStatus = useSelector((state: RootState) =>
    selectTasksByStatusId(state, status.id)
  );

  return (
    <AccordionItem value={status.id}>
      <div className="flex items-center">
        <AccordionTrigger
          asChild
          onClick={() => dispatch(toggleAccordion(status.id))}
        >
          <Button
            type="button"
            className="w-6 h-6 mx-2"
            variant="ghost"
            size="icon"
          >
            {status.open ? <ChevronDownIcon /> : <ChevronRight />}
          </Button>
        </AccordionTrigger>
        <ListActionGroup status={status} taskLength={tasksForStatus.length} />
      </div>

      {status.open && (
        <AccordionContent className="mx-10">
          <DataTable data={tasksForStatus ?? []} statusId={status.id} />
        </AccordionContent>
      )}
    </AccordionItem>
  );
});

StatusAccordionItem.displayName = "StatusAccordionItem";

const ListAccordation = () => {
  const dispatch = useDispatch();
  const statuses = useSelector(statusSelectors.selectAll);

  return (
    <>
      {statuses.length > 0 && (
        <div className="space-y-6">
          {statuses.map((status) => (
            <Accordion
              key={status.id}
              type="single"
              collapsible
              value={status.open ? status.id : ""}
            >
              <StatusAccordionItem status={status} />
            </Accordion>
          ))}
          <Button
            variant="outline"
            className="text-xs"
            size="sm"
            onClick={() => dispatch(addStatus())}
          >
            Add Status
          </Button>
        </div>
      )}
    </>
  );
};

export default ListAccordation;
