import { useState, useEffect } from "react"
import { AnimeCard } from "../../components/AnimeCard"
import { Navbar } from "../../components/Navbar/Navbar"
import { RootObject } from "../../interfaces/anime/interfaceCurrentlyAiring"
import { removeExtraDate, removeWrittenByMALRewrite } from "../../helpers/helperFunctions"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"

export const CurrentlyAiringAnime = () => {
  //States
  const [animes, setAnimes] = useState<RootObject[] | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  //Constants
  const URL_PAGE_ONE = "https://api.jikan.moe/v4/seasons/now?page=1"
  const URL_PAGE_TWO = "https://api.jikan.moe/v4/seasons/now?page=2"
  const URL_PAGE_THREE = "https://api.jikan.moe/v4/seasons/now?page=3"

  useEffect(() => {
    window.scrollTo(0, 0)
    const controller = new AbortController()
    const fetchAPI = async () => {
      try {
        const data = await fetch(URL_PAGE_ONE)
        const resp = await data.json()

        const data2 = await fetch(URL_PAGE_TWO)
        const resp2 = await data2.json()

        const data3 = await fetch(URL_PAGE_THREE)
        const resp3 = await data3.json()

        const test = [...resp.data, ...resp2.data, ...resp3.data]
        test && setAnimes(test)
      } catch (error) {
        controller.signal.aborted ? console.log("Aborted the fetch") : setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAPI()
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />

      {isLoading && <LoadingMessage />}
      {isError && <ErrorMessage />}
      {!isError && !isLoading ? (
        <>
          <div className="grid place-items-center pt-8">
            <h2 className="text-2xl font-bold tracking-tighter text-titleTEXT">Currently Airing</h2>
          </div>
          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {animes && animes
              ? animes.map(({ mal_id, images, title, episodes, aired, synopsis, genres }) => (
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
          </div>
        </>
      ) : null}
    </div>
  )
}
