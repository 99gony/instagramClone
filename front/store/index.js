import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers";

const makeStore = () => configureStore({
  reducer: rootReducer,
})

const wrapper = createWrapper(makeStore, {debug: process.env.NODE_ENV !== 'production'});

export default wrapper;