import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/productapislice';
import cartSlicereducer from "./slices/cartslice.js";
import authSlicereducer from './slices/authslice';

const store=configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authSlicereducer,
    cart:cartSlicereducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)

});

export default store;
