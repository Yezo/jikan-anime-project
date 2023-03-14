import { useState, useEffect } from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import { Searchbar } from "../../components/Searchbar/Searchbar"
import { RootObject } from "../../interfaces/anime/interfaceTop100Anime"
import { MangaCard } from "../../components/MangaCard"

export const SearchManga = () => {
  //States
  const [mangas, setMangas] = useState<RootObject | null>(null)
  const [query, setQuery] = useState<string>("")

  //Constants
  const API_URL = `https://api.jikan.moe/v4/manga?q=${query}`

  useEffect(() => {
    //Debounce the search query to help mitigate 429 API errors
    const getData = setTimeout(() => {
      if (query.length > 0) {
        fetch(API_URL)
          .then((res) => res.json())
          .then((res) => setMangas(res))
      }
    }, 750)
    query.length === 0 && setMangas(null)
    return () => clearTimeout(getData)
  }, [query])

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-24 font-primary  sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      <Searchbar setQuery={setQuery} type="Manga" />

      <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 ">
        {mangas && mangas.data && mangas.pagination.items.count > 0
          ? mangas?.data.map(
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

        {mangas && mangas?.pagination.items.count === 0 && (
          <div className="flex h-80 flex-col items-center justify-center gap-2 text-center text-titleTEXT">
            <HammerSVG />
            Sorry, we could not find any manga that matched your search result.
          </div>
        )}
      </div>
    </div>
  )
}

const HammerSVG = () => {
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
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path>
      <path d="M17.64 15 22 10.64"></path>
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path>
    </svg>
  )
}
