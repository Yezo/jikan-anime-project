//Imports - Hooks
import { useState } from "react"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { AnimeCard } from "../../components/IndividualAnime/AnimeCard"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { Pagination } from "../../components/Pagination/Pagination"

//Imports - Redux
import { useGetTopAnimeQuery } from "../../redux/anime"

export const TopAnime = () => {
  //States
  const [page, setPage] = useState(1)
  const { data: animes, error, isLoading } = useGetTopAnimeQuery(page)

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
            <h2 className="text-2xl font-bold tracking-tighter text-titleTEXT">Top Anime</h2>
          </div>
          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {animes && animes
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
          <Pagination data={animes.pagination} page={page} setPage={setPage}></Pagination>
        </>
      ) : null}
    </div>
  )
}
