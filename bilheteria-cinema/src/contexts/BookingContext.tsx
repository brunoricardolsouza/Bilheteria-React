import type { Movie, Session, ShowTime } from "../data/movies";
import type { Snack } from "../data/snacks";
import { createContext, useState, type ReactNode, useContext } from "react";

interface CustomerData {
  name: string;
  email: string;
}

export interface SelectedSeats {
  seatId: string;
  ticketType: "full" | "half";
}

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedSession: Session | null;
  selectedShowTime: ShowTime | null;
  selectedSeats: SelectedSeats[];
  selectedSnacks: { snack: Snack; quantity: number }[];
  customerData: CustomerData | null;
  setCustomerData: (data: CustomerData) => void;
  resetBooking: () => void;

  setMovieSelection: (
    movie: Movie,
    session: Session,
    showTime: ShowTime,
  ) => void;
  toggleSeat: (seatId: string, ticketType: "full" | "half") => void;
  updateSnackQuantity: (snack: Snack, quantity: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(
    null,
  );
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeats[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<
    { snack: Snack; quantity: number }[]
  >([]);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);

  const setMovieSelection = (
    movie: Movie,
    session: Session,
    showTime: ShowTime,
  ) => {
    setSelectedMovie(movie);
    setSelectedSession(session);
    setSelectedShowTime(showTime);
  };

  const toggleSeat = (seatId: string, ticketType: "full" | "half") => {
    setSelectedSeats((prev) => {
      const exists = prev.some((item) => item.seatId === seatId);

      if (exists) {
        return prev.filter((item) => item.seatId !== seatId);
      }

      return [...prev, { seatId, ticketType }];
    });
  };

  const updateSnackQuantity = (snack: Snack, quantity: number) => {
    setSelectedSnacks((prevSnacks) => {
      if (quantity <= 0) {
        return prevSnacks.filter((item) => item.snack.id !== snack.id);
      }
      const exists = prevSnacks.find((item) => item.snack.id === snack.id);

      if (exists) {
        return prevSnacks.map((item) =>
          item.snack.id === snack.id ? { ...item, quantity } : item,
        );
      }

      return [...prevSnacks, { snack, quantity }];
    });
  };

  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedSession(null);
    setSelectedShowTime(null);
    setSelectedSeats([]);
    setSelectedSnacks([]);
    setCustomerData(null);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        selectedSession,
        selectedShowTime,
        selectedSeats,
        selectedSnacks,
        setMovieSelection,
        toggleSeat,
        updateSnackQuantity,
        customerData,
        setCustomerData,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (context === undefined) {
    throw new Error(
      "useBooking precisa ser usado dentro de um BookingProvider!",
    );
  }

  return context;
};
