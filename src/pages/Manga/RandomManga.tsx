//Imports - Hooks
import { useEffect, useState } from "react"
//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { MangaCast } from "../../components/IndividualManga/MangaCast"
import { MangaDetailAside } from "../../components/IndividualManga/MangaDetailAside"
import { MangaDetailHeader } from "../../components/IndividualManga/MangaDetailHeader"

//Imports - Redux
import { useGetRandomMangaQuery, useGetMangaCharactersQuery } from "../../redux/manga"

export const RandomManga = () => {
  //States
  const [ID, setID] = useState<string | undefined>()
  const { data: manga, error, isLoading } = useGetRandomMangaQuery("")
  const { data: characters } = useGetMangaCharactersQuery(ID as string)

  //The useGetMangaCharactersQuery requires an ID as props to fetch data
  //Grab the ID of the random anime that the API gives us
  //Pass it as props to the query hook
  useEffect(() => {
    manga && setID(String(manga?.data.mal_id))
  }, [manga])

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
