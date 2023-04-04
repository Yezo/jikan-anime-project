//Imports - Components
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"

//Imports - Redux
import { useGetAnimeCharactersQuery, useGetRandomAnimeQuery } from "../../redux/anime"
import { AnimeDetail } from "../../components/IndividualAnime/AnimeDetail"
import { formatNums, isEmpty, removeWrittenByMALRewrite } from "../../helpers/helperFunctions"
import { AnimeCharacterCard } from "../../components/IndividualAnime/AnimeCharacterCard"
import { useEffect, useState } from "react"

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
          {/* //Header component */}
          <div className="z-10 lg:mb-4">
            <div className="lg:flex lg:pt-6">
              <img
                src={animes.data.images.jpg.large_image_url}
                alt={animes.data.title}
                className="max-h-60 w-full object-cover object-[center] shadow-sm ring-1 ring-titleTEXT/10 lg:min-h-[20rem] lg:min-w-[14rem] lg:max-w-[14rem] lg:rounded"
              ></img>
              <div className=" flex flex-col justify-between">
                <div>
                  <h1 className="px-4 pt-5 text-3xl font-bold text-titleTEXT lg:pt-0">
                    {animes.data.title}
                  </h1>
                  <div className="flex gap-2 px-4 py-2">
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Rank: #{animes.data.rank}
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Popularity: #{animes.data.popularity}
                    </div>
                  </div>
                </div>
                {animes.data.synopsis ? (
                  <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0 ">
                    <h3 className="font-bold text-titleTEXT">Description</h3>
                    <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      {removeWrittenByMALRewrite(animes.data.synopsis)}
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
                {animes.data.type && (
                  <AnimeDetail title="Format">
                    <span>{animes.data.type}</span>
                  </AnimeDetail>
                )}

                {animes.data.status && (
                  <AnimeDetail title="Status">
                    <span>{animes.data.status}</span>
                  </AnimeDetail>
                )}

                {animes.data.episodes && (
                  <AnimeDetail title="Episodes">
                    <span>{animes.data.episodes}</span>
                  </AnimeDetail>
                )}

                {animes.data.duration && (
                  <AnimeDetail title="Episode Duration">
                    <span>{animes.data.duration}</span>
                  </AnimeDetail>
                )}

                {animes.data.aired.from && (
                  <AnimeDetail title="Start Date">
                    <span>{String(animes.data.aired.from).slice(0, 10)}</span>
                  </AnimeDetail>
                )}

                {animes.data.season && animes.data.year && (
                  <AnimeDetail title="Season">
                    <span className="capitalize">
                      {animes.data.season} {animes.data.year}
                    </span>
                  </AnimeDetail>
                )}

                {animes.data.aired.to && (
                  <AnimeDetail title="End Date">
                    <span>{String(animes.data.aired.to).slice(0, 10)}</span>
                  </AnimeDetail>
                )}

                {animes.data.score && (
                  <AnimeDetail title="Score">
                    <span>{animes.data.score}</span>
                  </AnimeDetail>
                )}

                {animes.data.scored_by && (
                  <AnimeDetail title="Scored by">
                    <span>{formatNums.format(animes.data.scored_by)} users</span>
                  </AnimeDetail>
                )}

                {animes.data.members && (
                  <AnimeDetail title="Members">
                    <span>{formatNums.format(animes.data.members)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(animes.data.favorites) && (
                  <AnimeDetail title="Favorites">
                    <span>{formatNums.format(animes.data.favorites)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(animes.data.studios) && (
                  <AnimeDetail title="Studio">
                    {animes.data.studios.map((item) => (
                      <span key={item.name}>{item.name}</span>
                    ))}
                  </AnimeDetail>
                )}

                {!isEmpty(animes.data.demographics) && (
                  <AnimeDetail title="Demographic">
                    {animes.data.demographics.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {animes.data.title && (
                  <AnimeDetail title="Romaji">
                    <span>{animes.data.title}</span>
                  </AnimeDetail>
                )}

                {animes.data.title_english && (
                  <AnimeDetail title="English">
                    <span>{animes.data.title_english}</span>
                  </AnimeDetail>
                )}

                {animes.data.title_japanese && (
                  <AnimeDetail title="Japanese">
                    <span>{animes.data.title_japanese}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(animes.data.producers) && (
                  <AnimeDetail title="Producers">
                    {animes.data.producers.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {!isEmpty(animes.data.genres) && (
                  <AnimeDetail title="Genres">
                    {animes.data.genres.map((item) => (
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
                  {sortedCharacters &&
                    sortedCharacters &&
                    sortedCharacters
                      .slice(0, 12)
                      .map(({ character, role, voice_actors }) => (
                        <AnimeCharacterCard
                          characterName={character.name}
                          characterImage={character.images.jpg.image_url}
                          characterRole={role}
                          voiceActor={voice_actors}
                          key={character.name}
                        ></AnimeCharacterCard>
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
