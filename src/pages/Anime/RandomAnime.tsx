//Imports - Hooks
import { useEffect, useState } from "react"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { AnimeDetailHeader } from "../../components/IndividualAnime/AnimeDetailHeader"
import { AnimeCast } from "../../components/IndividualAnime/AnimeCast"
import { AnimeDetailAside } from "../../components/IndividualAnime/AnimeDetailAside"

//Imports - Redux
import { useGetAnimeCharactersQuery, useGetRandomAnimeQuery } from "../../redux/anime"

export const RandomAnime = () => {
  //States
  const [ID, setID] = useState<string | undefined>()
  const { data: animes, error, isLoading } = useGetRandomAnimeQuery("")
  const { data: characters } = useGetAnimeCharactersQuery(ID as string)
  useEffect(() => {
    animes && setID(String(animes?.data.mal_id))
  }, [animes])

  const sortedCharacters =
    characters && [...characters.data].sort((a, b) => b.favorites - a.favorites)

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : animes ? (
        <>
          <AnimeDetailHeader
            URL={animes.data.images.jpg.large_image_url}
            title={animes.data.title}
            rank={animes.data.rank}
            popularity={animes.data.popularity}
            synopsis={animes.data.synopsis}
          ></AnimeDetailHeader>

          <div className="flex flex-col gap-8 p-4 lg:flex-row lg:gap-4 lg:p-0 ">
            <AnimeDetailAside animes={animes}></AnimeDetailAside>
            <AnimeCast characters={sortedCharacters}></AnimeCast>
          </div>
        </>
      ) : null}
    </div>
  )
}
