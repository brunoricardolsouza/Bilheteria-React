import type { SelectedSeats } from "../contexts/BookingContext";

export const calculateSeatPrice = (
  ticketType: "full" | "half",
  basePrice: number,
) => (ticketType === "half" ? basePrice * 0.5 : basePrice);

export const calculateTicketsTotal = (
  seats: SelectedSeats[],
  basePrice: number,
) =>
  seats.reduce(
    (total, seat) => total + calculateSeatPrice(seat.ticketType, basePrice),
    0,
  );

export const formatSeatsList = (seats: SelectedSeats[]) =>
  seats
    .map(
      (seat) =>
        `${seat.seatId} (${seat.ticketType === "half" ? "Half" : "Full"})`,
    )
    .join(", ");
