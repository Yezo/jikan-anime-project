import { useState, useEffect } from "react"
import { AnimeCard } from "../components/AnimeCard"
import { Navbar } from "../components/Navbar/Navbar"
import { RootObject } from "../interfaces/anime/interfaceTop100Anime"
import { removeExtraDate, removeWrittenByMALRewrite } from "../helpers/helperFunctions"
export const Top100AnimePage = () => {
  //States
  const [animes, setAnimes] = useState<RootObject | null>(null)
  const [pagination, setPagination] = useState<string>("1")

  const pages = ["1", "2", "3", "4", "5"]
  const url = `https://api.jikan.moe/v4/top/anime?page=${pagination}&limit=21`

  useEffect(() => {
    window.scrollTo(0, 0)
    const controller = new AbortController()
    const fetchAPI = async () => {
      try {
        const data = await fetch(url)
        const resp = await data.json()
        setAnimes(resp)
      } catch (error) {
        controller.signal.aborted && console.log("Aborted the fetch.")
      }
    }
    fetchAPI()
    return () => {
      controller.abort()
    }
  }, [pagination])

  return (
    <div className="container mx-auto bg-primaryBG px-6 py-10 pb-16 font-primary  sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      <div className="grid place-items-center pt-8">
        <h2 className="text-2xl font-bold tracking-tighter text-titleTEXT">Top 100 Anime</h2>
      </div>
      <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
        {animes && animes.data
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
      </div>

      <div className="text-primary mt-4 flex flex-col items-center justify-center text-sm font-semibold tracking-tight">
        Page
        <ul className="flex gap-4">
          {pages.map((item) => (
            <li
              className={`flex cursor-pointer gap-4 hover:font-bold hover:underline ${
                item === pagination ? "font-bold" : null
              }  `}
              key={item}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setPagination(e.currentTarget.textContent as any)
              }
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
