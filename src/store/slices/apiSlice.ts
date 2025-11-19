import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PersistedRootState } from "@/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://hrmapi.kobelindustries.com/api/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as PersistedRootState;
    const token = state.auth?.token;
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});