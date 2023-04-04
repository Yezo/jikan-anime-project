import { configureStore } from "@reduxjs/toolkit"

import { animeApi } from "./anime"
import { mangaApi } from "./manga"

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [animeApi.reducerPath]: animeApi.reducer,
    [mangaApi.reducerPath]: mangaApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware, mangaApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
