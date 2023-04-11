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
      ) : animes && debouncedSearchQuery != "" ? (
        <>
          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {animes
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
      {animes?.pagination.items.count === 0 && debouncedSearchQuery.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-2 text-sm">
          <SadFaceSVG />
          <p>{`An anime matching "${debouncedSearchQuery}" could not be found.`}</p>
        </div>
      )}
    </div>
  )
}

const SadFaceSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
      <line x1="9" x2="9.01" y1="9" y2="9"></line>
      <line x1="15" x2="15.01" y1="9" y2="9"></line>
    </svg>
  )
}
