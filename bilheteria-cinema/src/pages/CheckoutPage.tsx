import { useNavigate } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";
import { useForm } from "react-hook-form";
import { checkoutSchema, CheckoutSchema } from "../Schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { promoCodeSchema, type PromoCodeSchema } from "../Schemas/promocode";
import { calculateTicketsTotal, formatSeatsList } from "../utils/ticket";

const CheckoutPage = () => {
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "pix">(
    "card",
  );

  const {
    register: registerPromo,
    handleSubmit: handleSubmitPromo,
    formState: { errors: promoErrors },
  } = useForm<PromoCodeSchema>({
    resolver: zodResolver(promoCodeSchema),
  });

  const onApplyPromo = (data: PromoCodeSchema) => {
    if (data.code.trim().toUpperCase() === "CINEMAX10") {
      setDiscount(0.1);
      setPromoMessage("Cupom aplicado! 10% de desconto.");
    } else {
      setDiscount(0);
      setPromoMessage("Cupom inválido.");
    }
  };

  const {
    selectedMovie,
    selectedSession,
    selectedShowTime,
    selectedSeats,
    selectedSnacks,
    setCustomerData,
  } = useBooking();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    if (!selectedMovie || !selectedSession || !selectedShowTime) {
      navigate("/");
    }
  }, [selectedMovie, selectedSession, selectedShowTime, navigate]);

  if (!selectedMovie || !selectedSession || !selectedShowTime) {
    return null;
  }

  const formattedDate = selectedSession.date
    ? new Date(selectedSession.date + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })
    : "";

  const onSubmit = (data: CheckoutSchema) => {
    setCustomerData({ name: data.name, email: data.email });
    navigate("/confirmation");
  };

  const ticketsTotal = calculateTicketsTotal(
    selectedSeats,
    selectedShowTime.price,
  );
  const snacksSubtotal = selectedSnacks.reduce(
    (total, item) => total + item.snack.price * item.quantity,
    0,
  );

  const subtotalBeforeDiscount = ticketsTotal + snacksSubtotal;
  const discountAmount = subtotalBeforeDiscount * discount;
  const subtotal = subtotalBeforeDiscount - discountAmount;
  const bookingFee = 2.5;
  const tax = (subtotal + bookingFee) * 0.05;
  const orderTotal = subtotal + bookingFee + tax;

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        noValidate
      >
        <div className="flex flex-col gap-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex gap-3">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-16 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                  {selectedMovie.title}
                </h3>
                <p className="text-xs text-gray-400 mb-2">
                  {selectedShowTime.format}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  {formattedDate} · {selectedShowTime.time}
                </p>
                <div className="flex items-center justify-between">
                  <p>Seats: {formatSeatsList(selectedSeats)}</p>
                  <button
                    onClick={() => navigate(`/movie/${selectedMovie.id}`)}
                    className="text-red-500 text-[13px] font-semibold hover:underline"
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm font-bold mt-2">
                  R${" "}
                  {calculateTicketsTotal(
                    selectedSeats,
                    selectedShowTime.price,
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-3">Concessions</h3>
            {selectedSnacks.length === 0 ? (
              <p className="text-xs text-gray-500">Snacks is empty</p>
            ) : (
              <div className="flex flex-col gap-2">
                {selectedSnacks.map((item) => (
                  <div
                    key={item.snack.id}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-gray-300">
                      {item.quantity}x {item.snack.name}
                    </span>
                    <span className="text-gray-400">
                      R$ {(item.snack.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-3">Contact Information</h3>
            <div className="flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Full Name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-3">Promo Code</h3>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  {...registerPromo("code")}
                  placeholder="Enter your code..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                />
                {promoErrors.code && (
                  <p className="text-red-400 text-xs mt-1">
                    {promoErrors.code.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleSubmitPromo(onApplyPromo)}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs font-medium px-4 rounded-md transition-colors"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                className={`text-xs mt-2 ${discount > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {promoMessage}
              </p>
            )}
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-3">Payment Method</h3>
            <div className="flex gap-3">
              {(
                [
                  { id: "card", label: "Credit Card" },
                  { id: "apple", label: "Apple Pay" },
                  { id: "pix", label: "Pix Instant Payment" },
                ] as const
              ).map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`text-left text-sm px-4 py-2.5 rounded-md border transition-colors ${
                    paymentMethod === method.id
                      ? "bg-gray-800 border-red-600"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
            {paymentMethod === "card" && (
              <div className="flex flex-col gap-3 mt-4">
                <div>
                  <input
                    type="text"
                    {...register("cardNumber")}
                    placeholder="Card Number"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("expiry")}
                      placeholder="MM/YY"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                    />
                    {errors.expiry && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.expiry.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("cvv")}
                      placeholder="CVV"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                    />
                    {errors.cvv && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-4">Order Total</h3>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Booking Fee</span>
              <span>R$ {bookingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax (5%)</span>
              <span>R$ {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-gray-800 pt-2 mt-1">
              <span>Total</span>
              <span>R$ {orderTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-md transition-colors"
          >
            Pay Now
          </button>
          <div className="flex items-center">
            <p className="text-gray-500 text-[11px] text-center mt-3 leading-relaxed">
              By clicking Pay Now, you agree to our terms of service and refund
              policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
