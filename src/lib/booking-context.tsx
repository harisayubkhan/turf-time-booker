import { createContext, useContext, useState, type ReactNode } from "react";
import { initialReservations, type Reservation } from "./turf-data";

type BookingContextValue = {
  reservations: Reservation[];
  reserve: (venueId: string, date: string, hour: number) => boolean;
  cancel: (id: string) => void;
  block: (id: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const reserve = (venueId: string, date: string, hour: number) => {
    if (reservations.some((item) => item.venueId === venueId && item.date === date && item.hour === hour)) return false;
    setReservations((items) => [...items, { id: `local-${Date.now()}`, venueId, date, hour, name: "You", status: "booked" }]);
    return true;
  };

  const cancel = (id: string) => setReservations((items) => items.filter((item) => item.id !== id));
  const block = (id: string) => setReservations((items) => items.map((item) => item.id === id ? { ...item, name: "Manager hold", status: "blocked" } : item));

  return <BookingContext.Provider value={{ reservations, reserve, cancel, block }}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("BookingProvider is required");
  return context;
}