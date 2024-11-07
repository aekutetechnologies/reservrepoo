"use client";

import { useState } from "react";
import { ExpensesList } from "@/components/expenses-list";
import { ExpensesFilter } from "@/components/expenses-filter";
import { ExpensesSummary } from "@/components/expenses-summary";
import { Card } from "@/components/ui/card";

export function ExpensesContent() {
  const [filter, setFilter] = useState({
    category: "all",
    dateRange: "all",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expenses</h1>
        <p className="text-muted-foreground">Track and manage your property expenses</p>
      </div>

      <ExpensesSummary />

      <Card className="p-6">
        <ExpensesFilter filter={filter} onFilterChange={setFilter} />
        <ExpensesList filter={filter} />
      </Card>
    </div>
  );
}