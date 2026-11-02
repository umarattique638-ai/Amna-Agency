import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";
import { api } from "./api";
import type { UserDTO } from "@/types/api";

/** One store per browser session (created in StoreProvider — never a module singleton on the server). */
export function makeStore(user: UserDTO | null = null) {
  const store = configureStore({
    reducer: { auth: authReducer, [api.reducerPath]: api.reducer },
    preloadedState: { auth: { user } },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });
  setupListeners(store.dispatch); // refetch on window focus / reconnect
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
