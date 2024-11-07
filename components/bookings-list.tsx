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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileEdit, XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface BookingsListProps {
  filter: {
    status: string;
    dateRange: string;
  };
}

interface Booking {
  id: string;
  guestName: string;
  room: {
    number: string;
  };
  checkIn: string;
  checkOut: string;
  status: string;
  totalAmount: number;
}

export function BookingsList({ filter }: BookingsListProps) {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `/api/bookings?propertyId=${user?.propertyId}&status=${filter.status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        toast.error('Failed to load bookings');
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.propertyId) {
      fetchBookings();
    }
  }, [user?.propertyId, filter.status, token]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      ACTIVE: "default",
      COMPLETED: "secondary",
      CANCELLED: "destructive",
    };

    return <Badge variant={variants[status]}>{status.toLowerCase()}</Badge>;
  };

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest Name</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.guestName}</TableCell>
            <TableCell>{booking.room.number}</TableCell>
            <TableCell>{format(new Date(booking.checkIn), "MMM dd, yyyy")}</TableCell>
            <TableCell>{format(new Date(booking.checkOut), "MMM dd, yyyy")}</TableCell>
            <TableCell>{getStatusBadge(booking.status)}</TableCell>
            <TableCell className="text-right">${booking.totalAmount}</TableCell>
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
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Booking
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