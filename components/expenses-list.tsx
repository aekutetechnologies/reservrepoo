"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/auth-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileEdit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ExpensesListProps {
  filter: {
    category: string;
    dateRange: string;
  };
}

interface Expense {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
}

export function ExpensesList({ filter }: ExpensesListProps) {
  const { user, token } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          `/api/expenses?propertyId=${user?.propertyId}&category=${filter.category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        toast.error('Failed to load expenses');
        console.error('Error fetching expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.propertyId) {
      fetchExpenses();
    }
  }, [user?.propertyId, filter.category, token]);

  if (isLoading) {
    return <div>Loading expenses...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">{expense.description}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{format(new Date(expense.date), "MMM dd, yyyy")}</TableCell>
            <TableCell className="text-right">${expense.amount}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}