import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { pokemonApi } from "./services/pokemon";

export const store = rtkConfigureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    counter: counterReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
