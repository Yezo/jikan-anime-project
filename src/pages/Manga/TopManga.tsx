//Imports - Hooks
import { useState } from "react"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { MangaCard } from "../../components/IndividualManga/MangaCard"
import { Pagination } from "../../components/Pagination/Pagination"

//Imports - Redux
import { useGetTopMangaQuery } from "../../redux/manga"

export const TopManga = () => {
  //States
  const [page, setPage] = useState(1)
  const { data: mangas, error, isLoading } = useGetTopMangaQuery(page)

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : mangas ? (
        <>
          <div className="grid place-items-center pt-8">
            <h2 className="text-2xl font-bold tracking-tighter text-titleTEXT">Top Manga</h2>
          </div>
          <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
            {mangas && mangas
              ? mangas.data.map(
                  ({ mal_id, images, title, synopsis, genres, rank, popularity }, idx) => (
                    <MangaCard
                      id={mal_id}
                      key={idx}
                      title={title}
                      synopsis={synopsis}
                      genres={genres}
                      imageURL={images.jpg.large_image_url}
                      rank={rank}
                      popularity={popularity}
                    />
                  )
                )
              : null}
          </div>
          <Pagination data={mangas.pagination} page={page} setPage={setPage}></Pagination>
        </>
      ) : null}
    </div>
  )
}
