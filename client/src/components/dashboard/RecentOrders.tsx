import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const orders = [
  { id: "ORD-001", customer: "Liam Johnson", value: "$250.00", status: "Completed", date: "2 mins ago" },
  { id: "ORD-002", customer: "Olivia Smith", value: "$120.50", status: "Processing", date: "15 mins ago" },
  { id: "ORD-003", customer: "Noah Williams", value: "$450.00", status: "Completed", date: "1 hr ago" },
  { id: "ORD-004", customer: "Emma Brown", value: "$65.00", status: "Completed", date: "3 hrs ago" },
  { id: "ORD-005", customer: "Ava Jones", value: "$890.00", status: "Processing", date: "5 hrs ago" },
];

export default function RecentOrders() {
  return (
    <Card className="col-span-3 border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Order</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-border hover:bg-muted/50">
                <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                <TableCell className="text-muted-foreground">{order.customer}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      order.status === "Completed" 
                        ? "border-primary/20 text-primary bg-primary/10 hover:bg-primary/10 hover:text-primary" 
                        : "border-yellow-500/20 text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/10 hover:text-yellow-500"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">{order.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
