import { Link, useLocation } from "wouter";
import { LayoutDashboard, DollarSign, ShoppingCart, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusWidget from "../dashboard/StatusWidget";

export default function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: ShoppingCart, label: "Sales", href: "/sales" },
    { icon: DollarSign, label: "Expenses", href: "/expenses" },
    { icon: BarChart3, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 flex flex-col z-30">
      <div className="p-6 flex items-center gap-2 border-b border-border/40">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">ProfitLens</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40">
        <StatusWidget />
      </div>
    </aside>
  );
}
