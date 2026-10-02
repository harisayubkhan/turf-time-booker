import { addDays, format } from "date-fns";
import f9Image from "@/assets/turf-f9.jpg";
import g8Image from "@/assets/turf-g8.jpg";
import i8Image from "@/assets/turf-i8.jpg";

export type Venue = {
  id: string;
  name: string;
  area: string;
  address: string;
  price: number;
  image: string;
  amenities: string[];
  tag: string;
};

export const venues: Venue[] = [
  { id: "f9-park-arena", name: "F-9 Park Arena", area: "F-9, Islamabad", address: "Fatima Jinnah Park, F-9, Islamabad", price: 3500, image: f9Image, amenities: ["Floodlights", "Bibs provided", "Parking", "Changing rooms"], tag: "Most popular" },
  { id: "g8-sports-complex", name: "G-8 Sports Complex", area: "G-8, Islamabad", address: "Markaz Road, G-8, Islamabad", price: 3000, image: g8Image, amenities: ["Floodlights", "Parking", "Water available"], tag: "Great value" },
  { id: "i8-indoor-pitch", name: "I-8 Indoor Pitch", area: "I-8, Islamabad", address: "I-8 Markaz, Islamabad", price: 4200, image: i8Image, amenities: ["Covered pitch", "Floodlights", "Bibs provided", "Changing rooms"], tag: "All-weather" },
];

export const slotHours = [16, 17, 18, 19, 20, 21, 22, 23];
export const dateKey = (date: Date) => format(date, "yyyy-MM-dd");
export const timeLabel = (hour: number) => format(new Date(2026, 0, 1, hour), "h:mm a");
export const priceLabel = (value: number) => `${value.toLocaleString("en-PK")} PKR`;

export type Reservation = {
  id: string;
  venueId: string;
  date: string;
  hour: number;
  name: string;
  status: "booked" | "blocked";
};

export function initialReservations(): Reservation[] {
  const names = ["Ahmed Raza", "Bilal Malik", "Hassan Ali", "Saad Khan", "Usman Tariq", "Zain Abbas"];
  const reservations: Reservation[] = [];
  for (let day = 0; day < 7; day++) {
    venues.forEach((venue, venueIndex) => {
      [0, 1].forEach((item) => {
        reservations.push({
          id: `mock-${day}-${venueIndex}-${item}`,
          venueId: venue.id,
          date: dateKey(addDays(new Date(), day)),
          hour: slotHours[(day + venueIndex * 2 + item * 3) % slotHours.length],
          name: names[(day + venueIndex + item) % names.length],
          status: "booked",
        });
      });
    });
  }
  return reservations;
}