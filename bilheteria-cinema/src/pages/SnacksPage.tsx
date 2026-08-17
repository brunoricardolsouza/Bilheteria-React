import { useBooking } from "../contexts/BookingContext";

const SnacksPage = () => {
  const { selectedMovie, selectedSession, selectedShowTime, selectedSeats } =
    useBooking();

  console.log({
    selectedMovie,
    selectedSession,
    selectedShowTime,
    selectedSeats,
  });
  return <div>SnacksPage</div>;
};

export default SnacksPage;
