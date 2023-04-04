//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"

//Imports - Redux
import { AnimeDetail } from "../../components/IndividualAnime/AnimeDetail"
import { formatNums, isEmpty, removeWrittenByMALRewrite } from "../../helpers/helperFunctions"
import { useEffect, useState } from "react"
import { useGetRandomMangaQuery, useGetMangaCharactersQuery } from "../../redux/manga"
import { MangaCharacterCard } from "../../components/IndividualManga/MangaCharacterCard"

export const RandomManga = () => {
  //States
  const [ID, setID] = useState<string | undefined>()
  const { data: mangas, error, isLoading } = useGetRandomMangaQuery("")
  const { data: characters } = useGetMangaCharactersQuery(ID as string)
  useEffect(() => {
    mangas && setID(String(mangas?.data.mal_id))
  }, [mangas])

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : mangas ? (
        <>
          {/* //Header component */}
          <div className="z-10 lg:mb-4">
            <div className="lg:flex lg:pt-6">
              <img
                src={mangas.data.images.jpg.large_image_url}
                alt={mangas.data.title}
                className="max-h-60 w-full object-cover object-[center] shadow-sm ring-1 ring-titleTEXT/10 lg:min-h-[20rem] lg:min-w-[14rem] lg:max-w-[14rem] lg:rounded"
              ></img>
              <div className=" flex flex-col justify-between">
                <div>
                  <h1 className="px-4 pt-5 text-3xl font-bold text-titleTEXT lg:pt-0">
                    {mangas.data.title}
                  </h1>
                  <div className="flex gap-2 px-4 py-2">
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Rank: #{mangas.data.rank}
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Popularity: #{mangas.data.popularity}
                    </div>
                  </div>
                </div>
                {mangas.data.synopsis ? (
                  <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0 ">
                    <h3 className="font-bold text-titleTEXT">Description</h3>
                    <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      {removeWrittenByMALRewrite(mangas.data.synopsis)}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0 ">
                    <h3 className="font-bold text-titleTEXT">Description</h3>
                    <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      A synopsis could not be found for this anime.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-4 lg:flex-row lg:gap-4 lg:p-0 ">
            <div className="gap- flex flex-col gap-1">
              <h3 className="font-bold text-titleTEXT">Details</h3>
              <div className="grid grid-cols-2 gap-y-4 rounded bg-white p-4 tracking-normal text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10 lg:min-w-[14rem] lg:max-w-[14rem] lg:grid-cols-1 lg:self-center lg:rounded lg:p-5">
                {mangas.data.type && (
                  <AnimeDetail title="Format">
                    <span>{mangas.data.type}</span>
                  </AnimeDetail>
                )}

                {mangas.data.status && (
                  <AnimeDetail title="Status">
                    <span>{mangas.data.status}</span>
                  </AnimeDetail>
                )}

                {mangas.data.chapters ? (
                  <AnimeDetail title="Chapters">
                    <span>{mangas.data.chapters}</span>
                  </AnimeDetail>
                ) : (
                  <AnimeDetail title="Chapters">
                    <span>Unknown</span>
                  </AnimeDetail>
                )}

                {mangas.data.volumes ? (
                  <AnimeDetail title="Volumes">
                    <span>{mangas.data.volumes}</span>
                  </AnimeDetail>
                ) : (
                  <AnimeDetail title="Volumes">
                    <span>Unknown</span>
                  </AnimeDetail>
                )}

                {mangas.data.published.string && (
                  <AnimeDetail title="Published On">
                    <span>{mangas.data.published.string}</span>
                  </AnimeDetail>
                )}
                {!isEmpty(mangas.data.authors) && (
                  <AnimeDetail title="Authors">
                    {mangas.data.authors.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {mangas.data.score && (
                  <AnimeDetail title="Score">
                    <span>{mangas.data.score}</span>
                  </AnimeDetail>
                )}

                {mangas.data.scored_by && (
                  <AnimeDetail title="Scored by">
                    <span>{formatNums.format(mangas.data.scored_by)} users</span>
                  </AnimeDetail>
                )}

                {mangas.data.members && (
                  <AnimeDetail title="Members">
                    <span>{formatNums.format(mangas.data.members)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(mangas.data.favorites) && (
                  <AnimeDetail title="Favorites">
                    <span>{formatNums.format(mangas.data.favorites)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(mangas.data.demographics) && (
                  <AnimeDetail title="Demographic">
                    {mangas.data.demographics.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {mangas.data.title && (
                  <AnimeDetail title="Romaji">
                    <span>{mangas.data.title}</span>
                  </AnimeDetail>
                )}

                {mangas.data.title_english && (
                  <AnimeDetail title="English">
                    <span>{mangas.data.title_english}</span>
                  </AnimeDetail>
                )}

                {mangas.data.title_japanese && (
                  <AnimeDetail title="Japanese">
                    <span>{mangas.data.title_japanese}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(mangas.data.genres) && (
                  <AnimeDetail title="Genres">
                    {mangas.data.genres.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {!isEmpty(mangas.data.themes) && (
                  <AnimeDetail title="Themes">
                    {mangas.data.themes.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-1 ">
              <h3 className="font-bold text-titleTEXT">Cast</h3>
              {characters && (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  {characters &&
                    characters.data &&
                    characters.data
                      .slice(0, 12)
                      .map(({ character, role }) => (
                        <MangaCharacterCard
                          characterName={character.name}
                          characterImage={character.images.jpg.image_url}
                          characterRole={role}
                          key={character.name}
                        ></MangaCharacterCard>
                      ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
