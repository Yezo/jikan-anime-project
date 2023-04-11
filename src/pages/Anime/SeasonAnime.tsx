//Imports - Hooks
import { useParams } from "react-router-dom"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { AnimeCard } from "../../components/IndividualAnime/AnimeCard"

//Imports - Redux
import { useGetSeasonAnimeQuery } from "../../redux/anime"

export const SeasonAnime = () => {
  //States
  const { season, year } = useParams()
  const { data: animes, error, isLoading } = useGetSeasonAnimeQuery({ year: year, season: season })

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : animes ? (
        <>
          <div className="grid place-items-center pt-8">
            <h2 className="text-2xl font-bold capitalize tracking-tighter text-titleTEXT">
              {year} - {season}
            </h2>
          </div>
          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {animes && animes.data
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
