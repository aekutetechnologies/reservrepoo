"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RoomSelectorProps {
  onSelect: (roomId: string) => void;
  selectedRoom: string | null;
}

interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  bookings: any[];
}

export function RoomSelector({ onSelect, selectedRoom }: RoomSelectorProps) {
  const { user, token } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `/api/rooms?propertyId=${user?.propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        toast.error('Failed to load rooms');
        console.error('Error fetching rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.propertyId) {
      fetchRooms();
    }
  }, [user?.propertyId, token]);

  if (isLoading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => {
        const isAvailable = room.bookings.length === 0;
        
        return (
          <Card
            key={room.id}
            className={cn(
              "p-4 cursor-pointer transition-colors",
              selectedRoom === room.id && "border-primary",
              !isAvailable && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => isAvailable && onSelect(room.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Room {room.number}</h3>
                <p className="text-sm text-muted-foreground">{room.type}</p>
              </div>
              <Badge variant={isAvailable ? "default" : "secondary"}>
                {isAvailable ? "Available" : "Occupied"}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">${room.price}</p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}