import { useParams } from "react-router-dom";
import { getMovieById, Session, ShowTime } from "../data/movies";
import { useMemo, useState } from "react";
import { useBooking } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const movie = id ? getMovieById(id) : undefined;

  const [selectedSession, setSelectedSession] = useState<Session | null>(
    movie ? movie.sessions[0] : null,
  );
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(
    null,
  );
  const { selectedSeats, toggleSeat, setMovieSelection } = useBooking();

  const formatSessionDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const day = date.getDate();
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const weekday = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    const isToday = dateStr === new Date().toISOString().split("T")[0];

    return { day, month, label: isToday ? "TODAY" : weekday };
  };

  const Seat_Rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const Seats_Per_Row = 10;
  const Reserved_Seats = ["D5", "D6", "E3", "E4", "F7", "B2", "B3", "G9"];

  const allSeats = useMemo(() => {
    const seats: string[] = [];
    for (const row of Seat_Rows) {
      for (let i = 1; i <= Seats_Per_Row; i++) {
        seats.push(`${row}${i}`);
      }
    }
    return seats;
  }, []);

  const navigate = useNavigate();

  const totalPrice = selectedShowTime
    ? selectedShowTime.price * selectedSeats.length
    : 0;

  const canConfirm =
    selectedSession && selectedShowTime && selectedSeats.length > 0;

  const handleConfirmBooking = () => {
    if (!selectedSession || !selectedShowTime) return;
    setMovieSelection(movie, selectedSession, selectedShowTime);
    navigate("/snacks");
  };

  if (!movie) {
    return <p className="text-white px-6 py-12">Filme não encontrado!</p>;
  }

  return (
    <div className="px-6 py-8 grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-16">
      <div>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full rounded-lg mb-4"
        />
        <div className="flex items-center gap-3 mb-2 text-sm">
          <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {movie.classification}
          </span>
          <span className="text-yellow-400">★ {movie.rating.toFixed(1)}</span>
          <span className="text-white text-sm">{movie.duration}</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
        <p className="text-gray-400 text-sm mb-4">{movie.description}</p>
        <div className="flex gap-1">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="text-xs border border-gray-600 rounded-full px-3 py-1 text-gray-300"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="bg-gray-900 rounded-lg p-3 mb-6">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-calendar"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>{" "}
            Select Date
          </h3>
          <div className="flex flex-wrap gap-4">
            {movie.sessions.map((session) => {
              const { day, month, label } = formatSessionDate(session.date);
              const isActive = selectedSession?.id === session.id;

              return (
                <button
                  key={session.id}
                  onClick={() => {
                    setSelectedSession(session);
                    setSelectedShowTime(null);
                  }}
                  className={`w-16 rounded-md py-1.5 text-center border transition-colors ${
                    isActive
                      ? "bg-red-600 border-red-600 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-500"
                  }`}
                >
                  <div className="text-lg font-bold">{day}</div>
                  <div className="text-xs">{month}</div>
                  <div className="text-[10px] opacity-80">{label}</div>
                </button>
              );
            })}
          </div>
        </div>
        {selectedSession && (
          <div className="bg-gray-900 rounded-lg p-3 mb-6">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clock"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>{" "}
              Available Time Slots
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-8 flex gap-4">
              {selectedSession.times.map((showtime) => {
                const isActive = selectedShowTime?.id === showtime.id;

                return (
                  <button
                    key={showtime.id}
                    onClick={() => setSelectedShowTime(showtime)}
                    className={`rounded-md py-2 text-center border transition-colors font-semibold ${
                      isActive
                        ? "bg-red-950 border-red-600 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    <div>{showtime.time}</div>
                    <div>{showtime.format}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="w-full h-2 bg-gray-700 rounded-full mb-1 p-1.4" />
          <p className="text-center font-bold text-[15px] text-gray-500 tracking-widest mb-4 p-1">
            THE SCREEN
          </p>
          <div
            className="grid gap-1.5 justify-center mb-4"
            style={{
              gridTemplateColumns: `repeat(${Seats_Per_Row}, minmax(0, 1.6rem))`,
            }}
          >
            {allSeats.map((seatId) => {
              const isReserved = Reserved_Seats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <button
                  key={seatId}
                  disabled={isReserved}
                  onClick={() => toggleSeat(seatId)}
                  className={`w-6 h-6 rounded ${isReserved ? "bg-gray-800 cursor-not-allowed" : isSelected ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gray-700 border border-gray-600" />
              Available
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gray-800" />
              Reserved
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-600" />
              Selected
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg mb-6 p-4 flex items-center justify-between">
          <div>
            <p>
              {selectedSeats.length} Seats Selected: {selectedSeats.join(", ")}
            </p>
            <p className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</p>
          </div>
          <button
            disabled={!canConfirm}
            onClick={handleConfirmBooking}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors flex items-center"
          >
            Complete Booking
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
