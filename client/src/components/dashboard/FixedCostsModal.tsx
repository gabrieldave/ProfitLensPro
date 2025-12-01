import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";

export default function FixedCostsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-border bg-card text-muted-foreground hover:text-foreground">
          <Settings2 className="w-4 h-4" />
          Manage Fixed Costs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Fixed Monthly Costs</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your recurring monthly expenses to calculate accurate net profit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rent" className="text-right text-muted-foreground">
              Rent
            </Label>
            <Input id="rent" defaultValue="2,500" className="col-span-3 bg-background border-border text-foreground" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="software" className="text-right text-muted-foreground">
              Software
            </Label>
            <Input id="software" defaultValue="450" className="col-span-3 bg-background border-border text-foreground" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payroll" className="text-right text-muted-foreground">
              Payroll
            </Label>
            <Input id="payroll" defaultValue="12,000" className="col-span-3 bg-background border-border text-foreground" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
