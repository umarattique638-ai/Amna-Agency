"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import type { UserDTO } from "@/types/api";

export function StoreProvider({ children, initialUser = null }: { children: ReactNode; initialUser?: UserDTO | null }) {
  const [store] = useState(() => makeStore(initialUser));
  return <Provider store={store}>{children}</Provider>;
}
