import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Store, Key, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  storeUrl: z.string().url({ message: "Please enter a valid URL starting with http:// or https://" }),
  consumerKey: z.string().min(5, { message: "Consumer Key is required" }).startsWith("ck_", { message: "Key must start with ck_" }),
  consumerSecret: z.string().min(5, { message: "Consumer Secret is required" }).startsWith("cs_", { message: "Secret must start with cs_" }),
});

export default function ConnectStore() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeUrl: "",
      consumerKey: "",
      consumerSecret: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Store connected successfully!",
        description: "Importing your products and orders...",
        variant: "default",
        className: "bg-primary text-primary-foreground border-primary",
      });
      
      setTimeout(() => {
        setLocation("/");
      }, 1500);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64">
        <Header />
        
        <main className="flex-1 flex items-center justify-center p-8 pt-24">
          <Card className="w-full max-w-lg border-border bg-card shadow-lg">
            <CardHeader className="space-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Connect your store</CardTitle>
              <CardDescription>
                Enter your WooCommerce credentials to sync your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="storeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Store className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://mystore.com" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="consumerKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consumer Key</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="ck_..." className="pl-9 font-mono text-sm" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="consumerSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consumer Secret</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input type="password" placeholder="cs_..." className="pl-9 font-mono text-sm" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs">
                            You can find these in WooCommerce {'>'} Settings {'>'} Advanced {'>'} REST API
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting Store...
                      </>
                    ) : (
                      <>
                        Connect Store
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
