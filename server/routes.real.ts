import type { Express } from "express";
import { createServer, type Server } from "http";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Función auxiliar para sumar totales de propiedades numéricas
const calculateTotal = (items: any[], key: string) => {
  return items.reduce((sum, item) => sum + parseFloat(item[key] || 0), 0);
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Endpoint Real del Dashboard
  app.get("/api/dashboard", async (req, res) => {
    try {
      // 1. Validación de seguridad: Credenciales
      if (!process.env.WOO_URL || !process.env.WOO_KEY || !process.env.WOO_SECRET) {
        console.error("❌ Faltan credenciales de WooCommerce en el .env");
        return res.status(500).json({ message: "Error de Configuración: Faltan claves de API" });
      }

      // 2. Conexión a la Tienda
      const api = new (WooCommerceRestApi as any).default({
        url: process.env.WOO_URL,
        consumerKey: process.env.WOO_KEY,
        consumerSecret: process.env.WOO_SECRET,
        version: "wc/v3"
      });

      // 3. Peticiones en Paralelo (Optimización de velocidad)
      // Traemos ventas del mes y las últimas órdenes simultáneamente
      const [salesReport, recentOrders] = await Promise.all([
        api.get("reports/sales", { period: "month" }), 
        api.get("orders", { per_page: 5 })             
      ]);

      const salesData = salesReport.data;
      const ordersData = recentOrders.data;

      // 4. Cálculo de KPIs en tiempo real
      const totalSales = calculateTotal(salesData, 'total_sales');
      
      // NOTA: WooCommerce API básica no da costos (COGS). 
      // Estimamos un 30% de costos operativos para calcular utilidad neta aproximada.
      // En V2 podríamos conectar plugins de costos.
      const estimatedCost = totalSales * 0.30; 
      const netProfit = totalSales - estimatedCost;
      const profitMargin = totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : "0";

      // 5. Formateo de Gráfica para Recharts
      const chartData = salesData.map((day: any) => ({
        date: new Date(day.date_created).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: parseFloat(day.total_sales),
        profit: parseFloat(day.total_sales) * 0.7 // Proyección de ganancia basada en margen
      }));

      // 6. Formateo de Tabla de Órdenes
      const formattedOrders = ordersData.map((order: any) => ({
        id: `#${order.id}`,
        customer: `${order.billing.first_name} ${order.billing.last_name}`,
        value: `$${order.total}`,
        status: order.status === 'completed' ? 'Completed' : 'Processing',
        date: new Date(order.date_created).toLocaleDateString()
      }));

      // 7. Respuesta JSON Final
      res.json({
        kpis: [
          {
            title: "Net Profit (Est.)",
            value: `$${netProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
            change: "+0%", // Pendiente: Calcular vs mes anterior
            trend: "up",
            isHighlighted: true,
          },
          {
            title: "Total Revenue",
            value: `$${totalSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
            change: "+0%",
            trend: "up",
          },
          {
            title: "Ad Spend",
            value: "$0.00", // Pendiente: Integración futura con Facebook Ads
            change: "0%",
            trend: "down",
          },
          {
            title: "Net Margin %",
            value: `${profitMargin}%`,
            change: "+0%",
            trend: "up",
            tooltipText: "Margen calculado sobre costos operativos estimados del 30%.",
          },
        ],
        revenueChart: chartData,
        recentOrders: formattedOrders,
      });

    } catch (error) {
      console.error("Error conectando a WooCommerce:", error);
      res.status(500).json({ message: "Error al conectar con la tienda" });
    }
  });

  return httpServer;
}

