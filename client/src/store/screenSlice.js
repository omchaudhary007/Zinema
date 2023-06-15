import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screens: [],
};

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    toFetchScreens: (state, action) => {
      state.screens = action.payload;
    },
    toAddScreen: (state, action) => {
      state.screens.push(action.payload);
    },
    toEditScreen: (state, action) => {
      const { screenId, updatedData } = action.payload;

      const screenIndex = state.screens.findIndex(
        (screen) => screen._id === screenId
      );

      if (screenIndex !== -1) {
        state.screens[screenIndex] = updatedData;
      }
    },
    toDeleteScreen: (state, action) => {
      state.screens = state.screens.filter(
        (screen) => screen._id !== action.payload
      );
    },
  },
});

export const { toFetchScreens, toAddScreen, toEditScreen, toDeleteScreen } =
  screenSlice.actions;

export default screenSlice.reducer;
