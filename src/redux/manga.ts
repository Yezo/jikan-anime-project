import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IMultiManga } from "../interfaces/manga/IMultiManga"
import { ISingleManga } from "../interfaces/manga/ISingleManga"
import { ISingleCharacter } from "../interfaces/manga/ISingleCharacter"

export const mangaApi = createApi({
  reducerPath: "mangaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4/" }),
  endpoints: (builder) => ({
    getTopManga: builder.query<IMultiManga, number>({
      query: (page = 1) => `top/manga?page=${page}&limit=20`,
    }),
    getManga: builder.query<ISingleManga, string>({
      query: (id) => `manga/${id}`,
    }),
    getMangaCharacters: builder.query<ISingleCharacter, string>({
      query: (id) => `manga/${id}/characters`,
    }),
    getRandomManga: builder.query<ISingleManga, string>({
      query: () => `random/manga`,
    }),
    getSearchManga: builder.query<IMultiManga, string>({
      query: (query) => `manga?q=${query}`,
    }),
  }),
})

export const {
  useGetTopMangaQuery,
  useGetMangaQuery,
  useGetMangaCharactersQuery,
  useGetRandomMangaQuery,
  useGetSearchMangaQuery,
} = mangaApi
