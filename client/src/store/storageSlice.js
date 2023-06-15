import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: localStorage.getItem("userId") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  accessToken: localStorage.getItem("accessToken") || "",
  isAdmin: localStorage.getItem("isAdmin") === "true" || false,
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      const { userId, refreshToken, accessToken, isAdmin } = action.payload;

      state.userId = userId;
      localStorage.setItem("userId", userId);

      state.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);

      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);

      state.isAdmin = isAdmin;
      localStorage.setItem("isAdmin", isAdmin);
    },
    authLogout: (state) => {
      state.userId = null;
      state.refreshToken = null;
      state.accessToken = null;
      state.isAdmin = false;
      localStorage.removeItem("userId");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { authLogin, authLogout } = storageSlice.actions;

export default storageSlice.reducer;
