import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Endpoint Mock para Demo (Sin WooCommerce real)
  app.get("/api/dashboard", (req, res) => {
    const dashboardData = {
      kpis: [
        {
          title: "Net Profit",
          value: "$12,450",
          change: "+12.5%",
          trend: "up",
          isHighlighted: true,
        },
        {
          title: "Total Revenue",
          value: "$45,231",
          change: "+8.2%",
          trend: "up",
        },
        {
          title: "Ad Spend",
          value: "$8,200",
          change: "+2.4%",
          trend: "down",
        },
        {
          title: "Net Margin %",
          value: "27.5%",
          change: "+1.2%",
          trend: "up",
          tooltipText: "(Net Profit / Total Revenue) * 100. This metric shows how much profit you generate for each dollar of revenue.",
        },
      ],
      revenueChart: [
        { date: "Sep 01", revenue: 4200, profit: 2100 },
        { date: "Sep 03", revenue: 3800, profit: 1900 },
        { date: "Sep 05", revenue: 5100, profit: 2800 },
        { date: "Sep 07", revenue: 4600, profit: 2300 },
        { date: "Sep 09", revenue: 6200, profit: 3400 },
        { date: "Sep 11", revenue: 5800, profit: 2900 },
        { date: "Sep 13", revenue: 7400, profit: 4100 },
        { date: "Sep 15", revenue: 6900, profit: 3600 },
        { date: "Sep 17", revenue: 8100, profit: 4500 },
        { date: "Sep 19", revenue: 7600, profit: 3900 },
        { date: "Sep 21", revenue: 8900, profit: 4800 },
        { date: "Sep 23", revenue: 8200, profit: 4200 },
        { date: "Sep 25", revenue: 9400, profit: 5100 },
        { date: "Sep 27", revenue: 8800, profit: 4600 },
        { date: "Sep 29", revenue: 10200, profit: 5600 },
        { date: "Sep 30", revenue: 9800, profit: 5300 },
      ],
      recentOrders: [
        { id: "ORD-001", customer: "Liam Johnson", value: "$250.00", status: "Completed", date: "2 mins ago" },
        { id: "ORD-002", customer: "Olivia Smith", value: "$120.50", status: "Processing", date: "15 mins ago" },
        { id: "ORD-003", customer: "Noah Williams", value: "$450.00", status: "Completed", date: "1 hr ago" },
        { id: "ORD-004", customer: "Emma Brown", value: "$65.00", status: "Completed", date: "3 hrs ago" },
        { id: "ORD-005", customer: "Ava Jones", value: "$890.00", status: "Processing", date: "5 hrs ago" },
      ],
    };

    res.json(dashboardData);
  });

  return httpServer;
}
