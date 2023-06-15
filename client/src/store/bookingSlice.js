import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  selectedShowtimeId: null,
  addOns: {
    items: [],
    subTotal: 0,
  },
};

const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    setId: (state, action) => {
      state.selectedShowtimeId = action.payload;
    },
    setAddOn: (state, action) => {
      state.addOns = action.payload;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.addOns.items.find(
        (item) => item.id === newItem.id
      );
      state.addOns.subTotal = round(state.addOns.subTotal + newItem.price);

      if (!existingItem) {
        state.addOns.items.push({
          id: newItem.id,
          name: newItem.name,
          totalPrice: newItem.price,
          price: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemToCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.addOns.items.find((item) => item.id === id);
      state.addOns.subTotal = round(state.addOns.subTotal - existingItem.price);
      if (existingItem.quantity === 1) {
        state.addOns.items = state.addOns.items.filter(
          (item) => item.id !== id
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const { setSeats, setId, setAddOn, addItemToCart, removeItemToCart } =
  bookingSlice.actions;

export default bookingSlice.reducer;
