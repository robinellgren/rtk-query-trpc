import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { pokemonApi } from "./services/pokemon";
import { nameApi } from "./services/names";
import { apiUrlReducer, ApiUrlsState } from "./services/apiUrlReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const apiUrlsConfig = {
  key: "apiUrls",
  storage,
};
const rootReducer = combineReducers({
  apiUrls: persistReducer<ApiUrlsState>(apiUrlsConfig, apiUrlReducer),
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [nameApi.reducerPath]: nameApi.reducer,
});

export const store = rtkConfigureStore({
  reducer: rootReducer,
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
