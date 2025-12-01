import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import FixedCostsModal from "@/components/dashboard/FixedCostsModal";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16 min-h-screen">
        <div className="container mx-auto p-8 space-y-8">
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <div className="flex items-center gap-4">
              <FixedCostsModal />
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard 
              title="Net Profit" 
              value="$12,450" 
              change="+12.5%" 
              trend="up" 
              isHighlighted={true}
            />
            <KPICard 
              title="Total Revenue" 
              value="$45,231" 
              change="+8.2%" 
              trend="up" 
            />
            <KPICard 
              title="Ad Spend" 
              value="$8,200" 
              change="+2.4%" 
              trend="down" 
            />
            <KPICard 
              title="Net Margin %" 
              value="27.5%" 
              change="+1.2%" 
              trend="up"
              tooltipText="(Net Profit / Total Revenue) * 100. This metric shows how much profit you generate for each dollar of revenue."
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <RevenueChart />
            <RecentOrders />
          </div>
          
        </div>
      </main>
    </div>
  );
}
