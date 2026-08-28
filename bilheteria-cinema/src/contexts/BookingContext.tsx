import type { Movie, Session, ShowTime } from "../data/movies";
import type { Snack } from "../data/snacks";
import { createContext, type ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  clearSeats: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMovie, setSelectedMovie] = useLocalStorage<Movie | null>(
    "booking_selectedMovie",
    null,
  );
  const [selectedSession, setSelectedSession] = useLocalStorage<Session | null>(
    "booking_selectedSession",
    null,
  );
  const [selectedShowTime, setSelectedShowTime] =
    useLocalStorage<ShowTime | null>("booking_selectedShowTime", null);
  const [selectedSeats, setSelectedSeats] = useLocalStorage<SelectedSeats[]>(
    "booking_selectedSeats",
    [],
  );
  const [selectedSnacks, setSelectedSnacks] = useLocalStorage<
    { snack: Snack; quantity: number }[]
  >("booking_selectedSnacks", []);
  const [customerData, setCustomerData] = useLocalStorage<CustomerData | null>(
    "booking_customerData",
    null,
  );

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

  const clearSeats = () => {
    setSelectedSeats([]);
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
        clearSeats,
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
