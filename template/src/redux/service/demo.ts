import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  car_brand: string | null;
  car_model: string | null;
}

const initialState: userState | any = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action?.payload;
    },

    removeUser: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
