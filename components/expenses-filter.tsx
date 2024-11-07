"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExpensesFilterProps {
  filter: {
    category: string;
    dateRange: string;
  };
  onFilterChange: (filter: { category: string; dateRange: string }) => void;
}

export function ExpensesFilter({ filter, onFilterChange }: ExpensesFilterProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row">
      <Select
        value={filter.category}
        onValueChange={(category) => onFilterChange({ ...filter, category })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
          <SelectItem value="utilities">Utilities</SelectItem>
          <SelectItem value="supplies">Supplies</SelectItem>
          <SelectItem value="staff">Staff</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.dateRange}
        onValueChange={(dateRange) => onFilterChange({ ...filter, dateRange })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}