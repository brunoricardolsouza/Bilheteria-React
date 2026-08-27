import { useNavigate } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";
import { useEffect } from "react";
import { calculateTicketsTotal, formatSeatsList } from "../utils/ticket";

const ConfirmationPage = () => {
  const {
    selectedMovie,
    selectedSession,
    selectedShowTime,
    selectedSeats,
    selectedSnacks,
    resetBooking,
    customerData,
  } = useBooking();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !selectedMovie ||
      !selectedSession ||
      !selectedShowTime ||
      !customerData
    ) {
      navigate("/");
    }
  }, [selectedMovie, selectedSession, selectedShowTime, customerData]);

  if (
    !selectedMovie ||
    !selectedSession ||
    !selectedShowTime ||
    !customerData
  ) {
    return null;
  }

  const hallNumber = String(selectedShowTime.id).slice(-2, -1) || "1";

  const formattedDate = selectedSession.date
    ? new Date(selectedSession.date + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })
    : "";

  const handleBackToHome = () => {
    resetBooking();
    navigate("/");
  };

  return (
    <div className="px-6 py-12 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          stroke="white"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 6 9 17l-5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-1">Booking Confirmed</h1>
      <p className="text-gray-400 text-sm mb-8">
        Thank you for your purchase. We've sent a confirmation email to you.
      </p>
      <div className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-2xl grid grid-cols-1 sm:grid-cols-[1fr_180px]">
        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="w-16 h-24 object-cover rounded-md"
            />
            <div>
              <span className="inline-block bg-red-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-1">
                {selectedShowTime.format}
              </span>
              <h2 className="text-lg font-bold">{selectedMovie.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-500 mb-1">Date & Time</p>
              <p className="text-gray-200">
                {formattedDate} · {selectedShowTime.time}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Theater</p>
              <p className="text-gray-200">
                Hall {hallNumber} · {selectedShowTime.format}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Seats</p>
              <p className="text-gray-200">{formatSeatsList(selectedSeats)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Total Price</p>
              <p className="text-gray-200 font-bold">
                R${" "}
                {calculateTicketsTotal(
                  selectedSeats,
                  selectedShowTime.price,
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black-950 flex flex-col items-center justify-center p-4 border-tsm:border-t-0 sm:border-l border-dashed border-gray-700">
          <div className="w-24 h-24 bg-white rounded-md flex items-center justify-center mb-2">
            <span className="text-gray-900 text-[10px] font-bold text-center">
              {" "}
              QR CODE
            </span>
          </div>
          <p className="text-[12px] text-gray-500 tracking-widest font-bold">
            SCAN FOR ENTRY
          </p>
          <p className="text-[10px] text-gray-600 mt-1">{customerData.name}</p>
          <p className="text-[10px] text-gray-700">Cineplex Prime</p>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => window.print()}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors"
        >
          Download Ticket
        </button>
        <button
          onClick={handleBackToHome}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
