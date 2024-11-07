import DashboardLayout from "@/components/dashboard-layout";
import { ExpensesContent } from "@/components/expenses-content";

export default function Expenses() {
  return (
    <DashboardLayout>
      <ExpensesContent />
    </DashboardLayout>
  );
}