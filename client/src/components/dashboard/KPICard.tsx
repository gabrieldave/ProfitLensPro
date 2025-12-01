import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  isHighlighted?: boolean;
  tooltipText?: string;
}

export default function KPICard({ title, value, change, trend, isHighlighted, tooltipText }: KPICardProps) {
  return (
    <Card 
      className={cn(
        "border-border bg-card transition-all duration-200 hover:shadow-md hover:border-primary/20",
        isHighlighted && "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {tooltipText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="bg-popover text-popover-foreground border-border">
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground tracking-tight">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-primary" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <p className={cn("text-xs font-medium", trend === "up" ? "text-primary" : "text-red-500")}>
            {change}
          </p>
          <span className="text-xs text-muted-foreground ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
