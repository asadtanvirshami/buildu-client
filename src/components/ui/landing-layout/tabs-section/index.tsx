"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardDemo from "./dashboard";
import Overview from "./overview";
import TradesDemo from "./trades";
import { TradeCalendarDemo } from "./calendar";
import { trades } from "./calendar/mock/data";

const TabsSection = () => {
  return (
    <div className="flex justify-center">
      <div className="shadow-lg h-full w-screen md:w-full lg:w-full border rounded-lg p-5 bg-card">
        <Tabs defaultValue="dashboard">
          {/* Tab Triggers */}
          <TabsList>
            <TabsTrigger className="text-pink" value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Overiew */}
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          {/* Dashboard */}
          <TabsContent value="dashboard">
            <DashboardDemo />
          </TabsContent>
          {/* Trades */}
          <TabsContent value="trades">
            <TradesDemo />
          </TabsContent>
          {/* Calendar */}
          <TabsContent className="h-full" value="calendar">
            <TradeCalendarDemo taskData={trades} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsSection;
