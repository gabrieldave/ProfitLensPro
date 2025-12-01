import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
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
];

export default function RevenueChart() {
  return (
    <Card className="col-span-4 border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">Revenue vs Net Profit</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#525252" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#525252" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value}`} 
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '6px' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="hsl(var(--foreground))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorProfit)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
