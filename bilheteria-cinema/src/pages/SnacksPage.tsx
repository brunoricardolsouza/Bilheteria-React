import { useBooking } from "../contexts/BookingContext";
import { useMemo, useState } from "react";
import { snacks, snackCategories } from "../data/snacks";
import { useNavigate } from "react-router-dom";

const SnacksPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { selectedSnacks, updateSnackQuantity } = useBooking();

  const filteredSnacks = useMemo(() => {
    if (activeCategory === "Todos") return snacks;
    return snacks.filter((snack) => snack.category === activeCategory);
  }, [activeCategory]);

  const snacksSubtotal = selectedSnacks.reduce(
    (total, item) => total + item.snack.price * item.quantity,
    0,
  );
  const bookingFee = snacksSubtotal > 0 ? 2.5 : 0;
  const orderTotal = snacksSubtotal + bookingFee;

  const navigate = useNavigate();

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-1">Bomboniere</h1>
      <p className="text-gray-400 text-sm mb-6">
        Elevate your cinematic experience with our premium selection.
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {snackCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`text-xs px-4 py-1.5 rounded-full border transition colors ${
              activeCategory === category
                ? "bg-red-600 border-red-600 text-white"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSnacks.map((snack) => {
            const inCart = selectedSnacks.find(
              (item) => item.snack.id === snack.id,
            );
            const quantity = inCart ? inCart.quantity : 0;

            return (
              <div
                key={snack.id}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={snack.image}
                    alt={snack.name}
                    className="w-full h-36 object-cover"
                  />
                  {snack.badge && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {snack.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold">{snack.name}</h3>
                    <span className="text-red-500 font-bold text-sm">
                      R$ {snack.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-1.5xs text-gray-400 mb-3">
                    {snack.description}
                  </p>
                  {quantity === 0 ? (
                    <button
                      onClick={() => updateSnackQuantity(snack, 1)}
                      className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs font-medium py-2 rounded-md transition-colors"
                    >
                      Add to Order
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-800 rounded-md px-3 py-2">
                      <button
                        onClick={() => updateSnackQuantity(snack, quantity - 1)}
                        className="text-white font-bold w-5"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold">{quantity}</span>
                      <button
                        onClick={() => updateSnackQuantity(snack, quantity + 1)}
                        className="text-white font-bold w-5"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-gray-900 rounded-lg p-4 h-fit sticky top-20">
          <h3 className="text-sm font-bold mb-4">🛒 Current Order</h3>
          {selectedSnacks.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              Your basket is empty
            </p>
          ) : (
            <div className="flex flex-col gap-3 mb-4">
              {selectedSnacks.map((item) => (
                <div
                  key={item.snack.id}
                  className="flex justify-between text-sm font-semibold"
                >
                  <span>
                    {item.quantity}x {item.snack.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="border-t border-gray-800 pt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>R$ {snacksSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Booking Fee</span>
              <span>R$ {bookingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-1">
              <span>Total</span>
              <span>R$ {orderTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            disabled={selectedSnacks.length === 0}
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-md transition-colors"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnacksPage;
