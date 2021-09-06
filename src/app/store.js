import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../reducers/player";
import processReducer from "../reducers/process";
import cardReducer from "../reducers/card";

export const store = configureStore({
  reducer: {
    playerInfo: playerReducer,
    process: processReducer,
    cardInfo: cardReducer
  },
});
