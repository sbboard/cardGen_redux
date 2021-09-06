import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "John",
  number: 13,
  rank: "Rookie",
  img: null,

  position: null,
  SpSpName: null,
  SpSpDescription: null,
  funFact: null,
};

export const counterSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
