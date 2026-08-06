import type { Movie, Session, ShowTime } from "../data/movies";
import type { Snack } from "../data/snacks";
import { createContext, useState, type ReactNode, useContext } from "react";

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedSession: Session | null;
  selectedShowTime: ShowTime | null;
  selectedSeats: string[];
  selectedSnacks: { snack: Snack; quantity: number }[];

  setMovieSelection: (
    movie: Movie,
    session: Session,
    showTime: ShowTime,
  ) => void;
  toggleSeat: (seatId: string) => void;
  updateSnackQuantity: (snack: Snack, quantity: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(
    null,
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<
    { snack: Snack; quantity: number }[]
  >([]);

  const setMovieSelection = (
    movie: Movie,
    session: Session,
    showTime: ShowTime,
  ) => {
    setSelectedMovie(movie);
    setSelectedSession(session);
    setSelectedShowTime(showTime);
    setSelectedSeats([]);
  };

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId],
    );
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
