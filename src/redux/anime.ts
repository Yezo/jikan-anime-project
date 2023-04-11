import { FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IMultiAnime } from "../interfaces/anime/IMultiAnime"
import { ISingleAnime } from "../interfaces/anime/ISingleAnime"
import { ISingleCharacter } from "../interfaces/anime/ISingleCharacter"
import { ISeasons } from "../interfaces/anime/ISeasons"

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4/" }),
  endpoints: (builder) => ({
    getCurrentlyAiringAnime: builder.query<IMultiAnime, number>({
      query: (page = 1) => `seasons/now?page=${page}&limit=20`,
    }),
    getTopAnime: builder.query<IMultiAnime, number>({
      query: (page = 1) => `top/anime?page=${page}&limit=20`,
    }),
    getAnime: builder.query<ISingleAnime, string>({
      query: (id) => `anime/${id}`,
    }),
    getAnimeCharacters: builder.query<ISingleCharacter, string>({
      query: (id) => `anime/${id}/characters`,
    }),
    getRandomAnime: builder.query<ISingleAnime, string>({
      query: () => `random/anime`,
    }),
    getSearchAnime: builder.query<IMultiAnime, string>({
      query: (query) => `anime?q=${query}`,
    }),
    getSeasonsList: builder.query<ISeasons, string>({
      query: () => `seasons`,
    }),
    getSeasonAnime: builder.query<
      IMultiAnime,
      { year: string | undefined; season: string | undefined }
    >({
      query: (arg) => {
        const { year, season } = arg
        return `seasons/${year}/${season}`
      },
    }),
  }),
})

export const {
  useGetCurrentlyAiringAnimeQuery,
  useGetTopAnimeQuery,
  useGetAnimeQuery,
  useGetAnimeCharactersQuery,
  useGetRandomAnimeQuery,
  useGetSearchAnimeQuery,
  useGetSeasonsListQuery,
  useGetSeasonAnimeQuery,
} = animeApi
