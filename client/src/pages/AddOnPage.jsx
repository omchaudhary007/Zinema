import React, { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemToCart } from "../store/bookingSlice";
import { useNavigate } from "react-router-dom";

const AddOnPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Small Popcorn", price: 5.99, quantity: 0 },
    { id: 2, name: "Medium Popcorn", price: 7.99, quantity: 0 },
    { id: 3, name: "Large Popcorn", price: 9.99, quantity: 0 },
    { id: 4, name: "Small Combo (Popcorn + Drink)", price: 8.99, quantity: 0 },
    {
      id: 5,
      name: "Medium Combo (Popcorn + Drink)",
      price: 10.99,
      quantity: 0,
    },
    { id: 6, name: "Large Combo (Popcorn + Drink)", price: 12.99, quantity: 0 },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addOns = useSelector((state) => state.booking.addOns);
  const bookedItems = useSelector((state) => state.booking);
  const showtimes = useSelector((state) => state.showtime.showtimes);
  const movies = useSelector((state) => state.movie.movies);

  const showtime = showtimes.find(
    (showtime) => showtime._id === bookedItems.selectedShowtimeId
  );

  const movie = movies.find((movie) => movie._id === showtime?.movieId);

  const totalBookedSeats = bookedItems?.selectedSeats?.length;

  return (
    <div className="pt-[72px] py-12 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg my-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">
            Cinema Snacks
          </h2>
          <p className="text-indigo-600">
            Pre-order your favorite movie treats!
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const itemInCart = addOns.items.find((i) => i.id === item.id);
            const quantity = itemInCart ? itemInCart.quantity : 0;

            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="https://media.istockphoto.com/photos/large-bucket-of-popcorn-on-red-picture-id137099651?k=6&m=137099651&s=612x612&w=0&h=TiS0WvXOaeZszKpKBcl8e4c-bNFxaqGKMOHZ2-TrW1U="
                        className="w-16 h-16 rounded-lg object-cover border-2 border-indigo-100"
                        alt={item.name}
                      />
                      {item.isCombo && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          COMBO
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-indigo-600 font-medium">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => dispatch(removeItemToCart(item.id))}
                      disabled={quantity === 0}
                      className={`text-3xl transition-colors ${
                        quantity === 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-600 hover:text-red-700"
                      }`}
                      aria-label={`Decrease quantity of ${item.name}`}>
                      <CiCircleMinus />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          addItemToCart({
                            id: item.id,
                            price: item.price,
                            name: item.name,
                          })
                        )
                      }
                      className="text-3xl text-blue-600 hover:text-blue-700 transition-colors"
                      aria-label={`Increase quantity of ${item.name}`}>
                      <IoIosAddCircleOutline />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-indigo-800 mb-4">
            Order Summary
          </h3>

          <div className="space-y-3">
            {/* Highlighted total row */}
            <div className="grid grid-cols-3 items-center bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-white rounded-lg">
              <span className="font-bold">{movie?.title}</span>
              <span className="font-bold text-center">{totalBookedSeats}x</span>
              <span className="text-xl font-bold text-right">
                ${showtime?.price * totalBookedSeats}
              </span>
            </div>

            <div className="gap-y-2">
              {addOns.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-3 items-center py-2">
                  <span className="font-medium text-gray-700 truncate pr-2">
                    {item.name}
                  </span>
                  <span className="font-medium text-gray-700 text-center">
                    {item.quantity}x
                  </span>
                  <span className="text-lg font-bold text-indigo-700 text-right">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-4 border-t border-gray-200" />

          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-gray-800 text-lg">
              Total Amount:
            </span>
            <span className="text-2xl font-bold text-indigo-700">
              $
              {(addOns.subTotal + showtime?.price * totalBookedSeats).toFixed(
                2
              )}
            </span>
          </div>

          <div className="flex flex-col gap-y-4">
            <button
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => navigate("/booking/checkout")}>
              Add to Booking
            </button>
            <button
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-600 text-white rounded-lg font-bold hover:from-red-700 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
            <p>Your snacks will be ready for pickup at our concession stand</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnPage;
