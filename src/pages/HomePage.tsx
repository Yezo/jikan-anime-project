import { useState, useEffect } from "react"
import { AnimeCard } from "../components/AnimeCard"
import { Navbar } from "../components/Navbar/Navbar"
import { Searchbar } from "../components/Searchbar/Searchbar"
import { RootObject } from "../interfaces/interfaceTop100Anime"
import { removeExtraDate, removeWrittenByMALRewrite } from "../helpers/helperFunctions"
import { TestSearchbar } from "../components/Searchbar/TestSearchbar"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { Link } from "react-router-dom"

export const HomePage = () => {
  //States
  const [animes, setAnimes] = useState<RootObject | null>(null)
  const [query, setQuery] = useState<string>("")
  const API_URL = `https://api.jikan.moe/v4/anime?q=${query}`

  useEffect(() => {
    //Debounce the search query to help mitigate 429 API errors
    const getData = setTimeout(() => {
      if (query.length > 0) {
        fetch(API_URL)
          .then((res) => res.json())
          .then((res) => setAnimes(res))
      }
    }, 750)

    return () => clearTimeout(getData)
  }, [query])

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-24 font-primary  sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      <Searchbar setQuery={setQuery} />

      <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 ">
        {animes && animes.data && animes.pagination.items.count > 0
          ? animes?.data.map(({ mal_id, images, title, episodes, aired, synopsis, genres }) => (
              <AnimeCard
                id={mal_id}
                imageURL={images.jpg.large_image_url}
                title={title}
                episodes={episodes}
                aired={aired}
                synopsis={synopsis}
                genres={genres}
                removeExtraDate={removeExtraDate}
                removeWrittenByMALRewrite={removeWrittenByMALRewrite}
                key={mal_id}
              ></AnimeCard>
            ))
          : null}

        {animes && animes?.pagination.items.count === 0 && (
          <div className="grid h-80 place-items-center text-center">
            Sorry, we could not find any animes that matched your search result.
          </div>
        )}
      </div>
    </div>
  )
}
