import { useState, useEffect } from "react"
import { RootObject } from "../interfaces/manga/interfaceIndividualManga"
import { Datum, gObject } from "../interfaces/anime/interfaceAnimeCharacters"
import { AnimeDetail } from "../components/IndividualAnime/AnimeDetail"
import { Navbar } from "../components/Navbar/Navbar"
import { removeWrittenByMALRewrite, isEmpty, formatNums } from "../helpers/helperFunctions"
import { MangaCharacterCard } from "../components/MangaCharacterCard"

export const RandomManga = () => {
  //States
  const [isLoading, setIsLoading] = useState(true)
  const [anime, setAnime] = useState<RootObject | null>(null)
  const [characters, setCharacters] = useState<gObject | null>(null)
  const [error, setError] = useState(null)
  const [id, setID] = useState<number | undefined>(0)
  //Constants
  const API_URL = `https://api.jikan.moe/v4/random/manga`

  //Fetch data
  useEffect(() => {
    const controller = new AbortController()
    const fetchAPI = async () => {
      try {
        const data = await fetch(API_URL)
        const resp = await data.json()
        setAnime(resp)
        setIsLoading(false)
      } catch (error) {
        controller.signal.aborted && console.log("Aborted the fetch.")
      }
    }

    fetchAPI()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    setID(anime?.data.mal_id)
  }, [anime])

  //Fetch data
  useEffect(() => {
    const controller = new AbortController()
    const fetchCharacters = async () => {
      try {
        const data = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`)
        const resp = await data.json()
        setCharacters(resp)
        setIsLoading(false)
      } catch (error) {
        console.log("Aborted the fetch.")
      }
    }
    fetchCharacters()
    return () => {
      controller.abort()
    }
  }, [id])

  useEffect(() => {
    setError(characters?.status)
  }, [characters])

  return (
    <div className="container mx-auto bg-primaryBG py-10 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar></Navbar>
      {!isLoading && anime && anime.data && characters && (
        <>
          {/* //Header component */}
          <div className="z-10 lg:mb-4">
            <div className="lg:flex lg:pt-6">
              <img
                src={anime.data.images.jpg.large_image_url}
                alt={anime.data.title}
                className="max-h-60 w-full object-cover object-[center] shadow-sm ring-1 ring-titleTEXT/10 lg:min-h-[20rem] lg:min-w-[14rem] lg:max-w-[14rem] lg:rounded"
              ></img>
              <div className=" flex flex-col justify-between">
                <div>
                  <h1 className="px-4 pt-5 text-3xl font-bold text-titleTEXT lg:pt-0">
                    {anime.data.title}
                  </h1>
                  <div className="flex gap-2 px-4 py-2">
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Rank: #{anime.data.rank}
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      Popularity: #{anime.data.popularity}
                    </div>
                  </div>
                </div>
                {anime.data.synopsis ? (
                  <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0 ">
                    <h3 className="font-bold text-titleTEXT">Description</h3>
                    <p className=" rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
                      {removeWrittenByMALRewrite(anime.data.synopsis)}
                    </p>
                  </div>
                ) : (
                  <div className="rounded bg-white  p-5 text-normalTEXT lg:pr-0 lg:pb-0">
                    There is no synopsis for this manga.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-4 lg:flex-row lg:gap-4 lg:p-0 ">
            <div className="gap- flex flex-col gap-1">
              <h3 className="font-bold text-titleTEXT">Details</h3>
              <div className="grid grid-cols-2 gap-y-4 rounded bg-white p-4 tracking-normal text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10 lg:min-w-[14rem] lg:max-w-[14rem] lg:grid-cols-1 lg:self-center lg:rounded lg:p-5">
                {anime.data.type && (
                  <AnimeDetail title="Format">
                    <span>{anime.data.type}</span>
                  </AnimeDetail>
                )}

                {anime.data.status && (
                  <AnimeDetail title="Status">
                    <span>{anime.data.status}</span>
                  </AnimeDetail>
                )}

                {anime.data.chapters ? (
                  <AnimeDetail title="Chapters">
                    <span>{anime.data.chapters}</span>
                  </AnimeDetail>
                ) : (
                  <AnimeDetail title="Chapters">
                    <span>Unknown</span>
                  </AnimeDetail>
                )}

                {anime.data.volumes ? (
                  <AnimeDetail title="Volumes">
                    <span>{anime.data.volumes}</span>
                  </AnimeDetail>
                ) : (
                  <AnimeDetail title="Volumes">
                    <span>Unknown</span>
                  </AnimeDetail>
                )}

                {anime.data.published.string && (
                  <AnimeDetail title="Published On">
                    <span>{anime.data.published.string}</span>
                  </AnimeDetail>
                )}
                {!isEmpty(anime.data.authors) && (
                  <AnimeDetail title="Authors">
                    {anime.data.authors.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {anime.data.score && (
                  <AnimeDetail title="Score">
                    <span>{anime.data.score}</span>
                  </AnimeDetail>
                )}

                {anime.data.scored_by && (
                  <AnimeDetail title="Scored by">
                    <span>{formatNums.format(anime.data.scored_by)} users</span>
                  </AnimeDetail>
                )}

                {anime.data.members && (
                  <AnimeDetail title="Members">
                    <span>{formatNums.format(anime.data.members)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(anime.data.favorites) && (
                  <AnimeDetail title="Favorites">
                    <span>{formatNums.format(anime.data.favorites)}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(anime.data.demographics) && (
                  <AnimeDetail title="Demographic">
                    {anime.data.demographics.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {anime.data.title && (
                  <AnimeDetail title="Romaji">
                    <span>{anime.data.title}</span>
                  </AnimeDetail>
                )}

                {anime.data.title_english && (
                  <AnimeDetail title="English">
                    <span>{anime.data.title_english}</span>
                  </AnimeDetail>
                )}

                {anime.data.title_japanese && (
                  <AnimeDetail title="Japanese">
                    <span>{anime.data.title_japanese}</span>
                  </AnimeDetail>
                )}

                {!isEmpty(anime.data.genres) && (
                  <AnimeDetail title="Genres">
                    {anime.data.genres.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {!isEmpty(anime.data.themes) && (
                  <AnimeDetail title="Themes">
                    {anime.data.themes.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}
              </div>
            </div>
            {characters && !isEmpty(characters.data) && (
              <div className="flex w-full flex-col gap-1 ">
                {!error && <h3 className="font-bold text-titleTEXT">Cast</h3>}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  {characters &&
                    characters.data &&
                    characters.data
                      .sort((a: Datum, b: Datum) => (a.favorites < b.favorites ? 1 : -1))
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
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}