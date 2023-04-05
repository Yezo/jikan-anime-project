//Imports - Hooks
import { useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { AnimeCard } from "../../components/IndividualAnime/AnimeCard"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { Searchbar } from "../../components/Searchbar/Searchbar"

//Imports - Redux
import { useGetSearchAnimeQuery } from "../../redux/anime"

export const SearchAnime = () => {
  //States
  const [query, setQuery] = useState<string>("")
  const debouncedSearchQuery = useDebounce(query, 1000)
  const {
    data: animes,
    error,
    isLoading,
  } = useGetSearchAnimeQuery(debouncedSearchQuery, { skip: query == "" })

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      <Searchbar setQuery={setQuery} type="Anime" />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : animes ? (
        <>
          <div className="grid place-items-center pt-8">
            <h2 className="text-2xl font-bold tracking-tighter text-titleTEXT">Currently Airing</h2>
          </div>

          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {animes && animes
              ? animes.data.map(({ mal_id, images, title, episodes, aired, synopsis, genres }) => (
                  <AnimeCard
                    id={mal_id}
                    imageURL={images.jpg.large_image_url}
                    title={title}
                    episodes={episodes}
                    aired={aired.string}
                    synopsis={synopsis}
                    genres={genres}
                    key={mal_id}
                  ></AnimeCard>
                ))
              : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
