import { apiRequest } from "@/lib/queryClient";

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  profit: number;
}

export interface Order {
  id: string;
  customer: string;
  value: string;
  status: "Completed" | "Processing";
  date: string;
}

export interface KPIData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  isHighlighted?: boolean;
  tooltipText?: string;
}

export interface DashboardData {
  kpis: KPIData[];
  revenueChart: RevenueDataPoint[];
  recentOrders: Order[];
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await apiRequest("GET", "/api/dashboard");
  return await response.json();
}

