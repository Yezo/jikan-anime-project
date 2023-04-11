//Imports - Hooks
import { useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { Searchbar } from "../../components/Searchbar/Searchbar"
import { MangaCard } from "../../components/IndividualManga/MangaCard"

//Imports - Redux
import { useGetSearchMangaQuery } from "../../redux/manga"

export const SearchManga = () => {
  //States
  const [query, setQuery] = useState<string>("")
  const debouncedSearchQuery = useDebounce(query, 1000)
  const {
    data: mangas,
    error,
    isLoading,
  } = useGetSearchMangaQuery(debouncedSearchQuery, { skip: query == "" })

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      <Searchbar setQuery={setQuery} type="Manga" />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : mangas && debouncedSearchQuery != "" ? (
        <>
          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {mangas
              ? mangas.data.map(
                  ({ mal_id, images, title, rank, popularity, synopsis, genres }, idx) => (
                    <MangaCard
                      id={mal_id}
                      key={idx}
                      title={title}
                      synopsis={synopsis}
                      genres={genres}
                      imageURL={images.jpg.image_url}
                      rank={rank}
                      popularity={popularity}
                    />
                  )
                )
              : null}
          </div>
        </>
      ) : null}

      {mangas?.pagination.items.count === 0 && debouncedSearchQuery.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-2 text-sm">
          <SadFaceSVG />
          <p>{`A manga matching "${debouncedSearchQuery}" could not be found.`}</p>
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
