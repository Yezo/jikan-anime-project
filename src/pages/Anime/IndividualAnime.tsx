//Imports - Hooks
import { useParams } from "react-router-dom"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"

//Imports - Redux
import { useGetAnimeCharactersQuery, useGetAnimeQuery } from "../../redux/anime"
import { AnimeDetailHeader } from "../../components/IndividualAnime/AnimeDetailHeader"
import { AnimeDetailAside } from "../../components/IndividualAnime/AnimeDetailAside"
import { AnimeCast } from "../../components/IndividualAnime/AnimeCast"

export const IndividualAnime = () => {
  //States
  const { animeId } = useParams()
  const { data: animes, error, isLoading } = useGetAnimeQuery(animeId as string)
  const { data: characters } = useGetAnimeCharactersQuery(animeId as string)

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
