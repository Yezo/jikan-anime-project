import { useState, useEffect } from "react"
import { RootObject } from "../../interfaces/manga/interfaceTopManga"
import { MangaCard } from "../../components/MangaCard"
import { Navbar } from "../../components/Navbar/Navbar"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"

export const Top100MangaPage = () => {
  //States
  const [mangas, setMangas] = useState<RootObject[] | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const controller = new AbortController()
    const fetchAPI = async () => {
      try {
        const data = await fetch("https://api.jikan.moe/v4/top/manga?page=1")
        const resp = await data.json()

        const data2 = await fetch("https://api.jikan.moe/v4/top/manga?page=2")
        const resp2 = await data2.json()

        const data3 = await fetch("https://api.jikan.moe/v4/top/manga?page=3")
        const resp3 = await data3.json()

        const total = [...resp.data, ...resp2.data, ...resp3.data]
        setMangas(total)
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
            <h2 className="text-2xl font-bold tracking-tighter text-titleTEXT">Top Manga</h2>
          </div>
          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {mangas
              ? mangas.map(({ mal_id, images, title, synopsis, genres, rank, popularity }, idx) => (
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
                ))
              : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
