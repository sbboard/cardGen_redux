import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    width: 0,
    height: 0,
    zoomAmt: 0,
    leftCrop: 0,
    topCrop: 0,

    zoomCircleAmt: 0,
    cropCircleLeft: 0,
    cropCircleTop: 0
};

export const counterSlice = createSlice({
  name: "card",
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