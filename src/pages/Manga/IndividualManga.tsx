//Imports - Hooks
import { useParams } from "react-router-dom"
//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"

//Imports - Redux
import { AnimeDetail } from "../../components/IndividualAnime/AnimeDetail"
import { formatNums, isEmpty, removeWrittenByMALRewrite } from "../../helpers/helperFunctions"
import { useGetMangaQuery, useGetMangaCharactersQuery } from "../../redux/manga"
import { MangaCharacterCard } from "../../components/IndividualManga/MangaCharacterCard"

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
          {/* //Header component */}
          <div className="z-10 lg:mb-4">
            <div className="lg:flex lg:pt-6">
              <img
                src={manga.data.images.jpg.large_image_url}
                alt={manga.data.title}
                className="max-h-60 w-full object-cover object-[center] shadow-sm ring-1 ring-titleTEXT/10 lg:min-h-[20rem] lg:min-w-[14rem] lg:max-w-[14rem] lg:rounded"
              ></img>
              <div className=" flex flex-col justify-between">
                <div>
                  <h1 className="px-4 pt-5 text-3xl font-bold text-titleTEXT lg:pt-0">
                    {manga.data.title}
                  </h1>
                  <div className="flex gap-2 px-4 py-2">
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Rank: #{manga.data.rank}
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Popularity: #{manga.data.popularity}
                    </div>
                  </div>
                </div>
                {manga.data.synopsis ? (
                  <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0 ">
                    <h3 className="font-bold text-titleTEXT">Description</h3>
                    <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      {removeWrittenByMALRewrite(manga.data.synopsis)}
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
                {manga.data.type && (
                  <AnimeDetail title="Format">
                    <span>{manga.data.type}</span>
                  </AnimeDetail>
                )}

                {manga.data.status && (
                  <AnimeDetail title="Status">
                    <span>{manga.data.status}</span>
                  </AnimeDetail>
                )}

                {manga.data.chapters ? (
                  <AnimeDetail title="Chapters">
                    <span>{manga.data.chapters}</span>
                  </AnimeDetail>
                ) : (
                  <AnimeDetail title="Chapters">
                    <span>Unknown</span>
                  </AnimeDetail>
                )}

                {manga.data.volumes ? (
                  <AnimeDetail title="Volumes">
                    <span>{manga.data.volumes}</span>
                  </AnimeDetail>
                ) : (
                  <AnimeDetail title="Volumes">
                    <span>Unknown</span>
                  </AnimeDetail>
                )}

                {manga.data.published.string && (
                  <AnimeDetail title="Published On">
                    <span>{manga.data.published.string}</span>
                  </AnimeDetail>
                )}
                {!isEmpty(manga.data.authors) && (
                  <AnimeDetail title="Authors">
                    {manga.data.authors.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {manga.data.score && (
                  <AnimeDetail title="Score">
                    <span>{manga.data.score}</span>
                  </AnimeDetail>
                )}

                {manga.data.scored_by && (
                  <AnimeDetail title="Scored by">
                    <span>{formatNums.format(manga.data.scored_by)} users</span>
                  </AnimeDetail>
                )}

                {manga.data.members && (
                  <AnimeDetail title="Members">
                    <span>{formatNums.format(manga.data.members)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(manga.data.favorites) && (
                  <AnimeDetail title="Favorites">
                    <span>{formatNums.format(manga.data.favorites)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(manga.data.demographics) && (
                  <AnimeDetail title="Demographic">
                    {manga.data.demographics.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {manga.data.title && (
                  <AnimeDetail title="Romaji">
                    <span>{manga.data.title}</span>
                  </AnimeDetail>
                )}

                {manga.data.title_english && (
                  <AnimeDetail title="English">
                    <span>{manga.data.title_english}</span>
                  </AnimeDetail>
                )}

                {manga.data.title_japanese && (
                  <AnimeDetail title="Japanese">
                    <span>{manga.data.title_japanese}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(manga.data.genres) && (
                  <AnimeDetail title="Genres">
                    {manga.data.genres.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {!isEmpty(manga.data.themes) && (
                  <AnimeDetail title="Themes">
                    {manga.data.themes.map((item) => (
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