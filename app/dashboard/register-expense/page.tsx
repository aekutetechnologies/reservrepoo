"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { RegisterExpenseForm } from "@/components/register-expense-form";
import { Card } from "@/components/ui/card";

export default function RegisterExpense() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Register Expense</h1>
          <p className="text-muted-foreground">Record a new expense for your property</p>
        </div>

        <Card className="p-6">
          <RegisterExpenseForm />
        </Card>
      </div>
    </DashboardLayout>
  );
}