//Imports - Hooks
import { useParams } from "react-router-dom"

//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { MangaDetailHeader } from "../../components/IndividualManga/MangaDetailHeader"
import { MangaDetailAside } from "../../components/IndividualManga/MangaDetailAside"
import { MangaCast } from "../../components/IndividualManga/MangaCast"

//Imports - Redux
import { useGetMangaQuery, useGetMangaCharactersQuery } from "../../redux/manga"

export const IndividualManga = () => {
  //States
  const { mangaId } = useParams()
  const { data: manga, error, isLoading } = useGetMangaQuery(mangaId as string)
  const { data: characters } = useGetMangaCharactersQuery(mangaId as string)

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : manga ? (
        <>
          <MangaDetailHeader
            URL={manga.data.images.jpg.large_image_url}
            title={manga.data.title}
            rank={manga.data.rank}
            popularity={manga.data.popularity}
            synopsis={manga.data.synopsis}
          ></MangaDetailHeader>

          <div className="flex flex-col gap-8 p-4 lg:flex-row lg:gap-4 lg:p-0 ">
            <MangaDetailAside manga={manga}></MangaDetailAside>
            <MangaCast characters={characters}></MangaCast>
          </div>
        </>
      ) : null}
    </div>
  )
}
