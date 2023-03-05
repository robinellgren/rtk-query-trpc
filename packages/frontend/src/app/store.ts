import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { pokemonApi } from "./services/pokemon";
import { nameApi } from "./services/names";
import apiUrlReducer from "./services/apiUrlReducer";

const preloadedState = {
  apiUrls: {
    TRPC_API_URL: "http://localhost:4000/trpc",
  },
};

export const store = rtkConfigureStore({
  reducer: {
    apiUrls: apiUrlReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [nameApi.reducerPath]: nameApi.reducer,
    counter: counterReducer,
  },
  preloadedState,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(nameApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
