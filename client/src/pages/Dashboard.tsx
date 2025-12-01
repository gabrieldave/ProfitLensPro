import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import FixedCostsModal from "@/components/dashboard/FixedCostsModal";
import { Spinner } from "@/components/ui/spinner";
import { fetchDashboardData } from "@/services/api";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="size-8" />
            <p className="text-muted-foreground">Cargando datos del dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive text-lg font-semibold">Error al cargar los datos</p>
            <p className="text-muted-foreground mt-2">{error instanceof Error ? error.message : "Error desconocido"}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!data) {
    return null;
  }

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
          {data.kpis && data.kpis.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.kpis.map((kpi, index) => (
                <KPICard 
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  trend={kpi.trend}
                  isHighlighted={kpi.isHighlighted}
                  tooltipText={kpi.tooltipText}
                />
              ))}
            </div>
          )}

          {/* Main Content Grid */}
          {data.revenueChart && data.revenueChart.length > 0 && data.recentOrders && data.recentOrders.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <RevenueChart data={data.revenueChart} />
              <RecentOrders orders={data.recentOrders} />
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}
