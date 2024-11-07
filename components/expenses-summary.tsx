"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";

export function ExpensesSummary() {
  // In a real app, this would come from an API
  const summary = {
    totalExpenses: 3250,
    averageDaily: 108.33,
    monthlyChange: -5.2,
    largestCategory: "Utilities",
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
            <h3 className="text-2xl font-bold">${summary.totalExpenses}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Average Daily</p>
            <h3 className="text-2xl font-bold">${summary.averageDaily}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            {summary.monthlyChange >= 0 ? (
              <TrendingUp className="h-6 w-6 text-primary" />
            ) : (
              <TrendingDown className="h-6 w-6 text-destructive" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Change</p>
            <h3 className="text-2xl font-bold">
              {summary.monthlyChange >= 0 ? "+" : ""}{summary.monthlyChange}%
            </h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Largest Category</p>
            <h3 className="text-2xl font-bold">{summary.largestCategory}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}