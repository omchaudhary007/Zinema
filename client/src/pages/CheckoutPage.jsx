import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../constants/formatDate";
import { formatTimeWithIntl } from "../constants/formatIntDate";
import { toast } from "react-toastify";
import axios from "axios";
import { setSeats, setId, setAddOn } from "../store/bookingSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booked = useSelector((state) => state.booking);
  const showtimes = useSelector((state) => state.showtime.showtimes);
  const movies = useSelector((state) => state.movie.movies);

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const showtime = showtimes.find(
    (showtime) => showtime._id === booked?.selectedShowtimeId
  );

  const movie = movies.find((movie) => movie._id === showtime?.movieId);

  const pricing = {
    tickets: booked?.selectedSeats?.length || 0,
    ticketPrice: showtime?.price || 0,
    convenienceFee: 2.5,
    tax: 1.75,
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    // Name validation
    if (!paymentDetails.nameOnCard.trim()) {
      newErrors.nameOnCard = "Please enter the name on card";
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    }

    // CVV validation (3-4 digits)
    if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .substring(0, 5);
    }

    setPaymentDetails((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleBack = () => {
    navigate("/booking/add-on");
  };

  const handleConfirmPayment = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all payment details correctly");
      return;
    }

    try {
      // First update the booked seats
      await axios.put(
        `${import.meta.env.SERVER_URL}/showtime/${showtime._id}/book-seats`,
        { seats: booked.selectedSeats },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear booking state
      dispatch(setSeats([]));
      dispatch(setId(null));
      dispatch(setAddOn({ items: [], subTotal: 0 }));

      toast.success("Payment successful! Your booking is confirmed.");
      navigate("/profile");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-[72px]">
      <div className="max-w-4xl mx-auto my-14">
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <div
            className="p-6 border-b border-gray-200 relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${movie?.background})` }}>
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Your Order
              </h2>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 flex-shrink-0">
                  <img
                    src={movie?.poster}
                    alt={movie?.title}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex-1 text-white">
                  <h3 className="text-lg font-medium text-white">
                    {movie?.title}
                  </h3>
                  <div className="mt-2 text-sm text-gray-200">
                    <p>
                      {showtime?.hall} •{" "}
                      {formatTimeWithIntl(showtime?.startTime)} •{" "}
                      {formatDate(showtime?.date)}
                    </p>
                    <p className="mt-1">
                      Seats: {booked.selectedSeats.join(" - ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Payment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-2 border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  maxLength="19"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={paymentDetails.nameOnCard}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  className={`w-full px-4 py-2 border ${
                    errors.nameOnCard ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.nameOnCard && (
                  <p className="mt-1 text-sm text-red-500">{errors.nameOnCard}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={`w-full px-4 py-2 border ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  maxLength="5"
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={`w-full px-4 py-2 border ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  maxLength="4"
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Price Breakdown
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Tickets ({booked?.selectedSeats.length}x)
                </span>
                <span>
                  ${(showtime?.price * booked?.selectedSeats.length).toFixed(2)}
                </span>
              </div>
              <h1 className="font-semibold">Adds Ons</h1>

              <div className="flex flex-col gap-y-3">
                {booked?.addOns.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">{item?.name}</span>
                    <span>${item?.price?.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${pricing.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-200 font-medium text-gray-900">
                <span>Total</span>
                <span>
                  $
                  {(
                    showtime?.price * booked?.selectedSeats.length +
                    booked?.addOns?.subTotal +
                    pricing.tax
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Final Actions */}
          <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto">
              Back to Add-ons
            </button>

            <button
              onClick={handleConfirmPayment}
              className="px-6 py-3 bg-blue-600 rounded-md text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto">
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
