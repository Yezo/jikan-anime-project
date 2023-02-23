import { useEffect, useState } from "react";
import { AnimeDetail } from "../components/IndividualAnime/AnimeDetail";
import { Navbar } from "../components/Navbar/Navbar";
import { Data, RootObject } from "../interfaces/interfaceRandomAnime";

export const RandomAnime = () => {
  //States
  const [anime, setAnime] = useState<RootObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //Constants
  const API_URL = `https://api.jikan.moe/v4/random/anime`;

  //Fetch data
  useEffect(() => {
    const controller = new AbortController();
    const fetchAPI = async () => {
      try {
        const data = await fetch(API_URL);
        const resp = await data.json();
        setAnime(resp);
        setIsLoading(false);
      } catch (error) {
        controller.signal.aborted && console.log("Aborted the fetch.");
      }
    };
    fetchAPI();
    return () => {
      controller.abort();
    };
  }, []);

  function removeWrittenByMALRewrite(url: string) {
    return url && url.split("[Written by MAL Rewrite]")[0].replace(/\s*$/, "");
  }

  const formatNums = new Intl.NumberFormat("en-US", {
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return (
    <div className="container mx-auto bg-[#131A20] pb-24 font-primary text-light sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar></Navbar>
      {!isLoading && anime && anime.data && (
        <>
          {/* //Header component */}
          <div className="z-10 lg:mb-4">
            <div className="lg:flex lg:pt-6">
              <img
                src={anime.data.images.jpg.large_image_url}
                alt={anime.data.title}
                className="max-h-60 w-full object-cover object-[center] lg:min-h-[20rem] lg:w-[14rem] lg:rounded"
              ></img>
              <div className=" flex flex-col justify-between">
                <div>
                  <h1 className="px-4 pt-5 text-3xl font-bold lg:pt-0">
                    {anime.data.title}
                  </h1>
                  <div className="flex gap-2 px-4 py-2">
                    <div className="rounded-2xl bg-[#1D262F] px-4 py-1 text-xs font-semibold">
                      Rank: #{anime.data.rank}
                    </div>
                    <div className="rounded-2xl bg-[#1D262F] px-4 py-1 text-xs font-semibold">
                      Popularity: #{anime.data.popularity}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0">
                  <h3 className="font-bold">Description</h3>
                  <p className=" rounded bg-[#1D262F] p-5 text-[0.85rem] leading-6 text-[#d3d3d3]">
                    {removeWrittenByMALRewrite(anime.data.synopsis)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-4 lg:flex-row lg:gap-4 lg:p-0 ">
            <div className="gap- flex flex-col gap-1">
              <h3 className="font-bold ">Details</h3>
              <div className="grid grid-cols-2 gap-y-4 rounded bg-[#1D262F] p-4 tracking-normal  lg:min-w-[14rem] lg:max-w-[14rem] lg:grid-cols-1 lg:self-center lg:rounded lg:p-5">
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

                {anime.data.episodes && (
                  <AnimeDetail title="Episodes">
                    <span>{anime.data.episodes}</span>
                  </AnimeDetail>
                )}

                {anime.data.duration && (
                  <AnimeDetail title="Episode Duration">
                    <span>{anime.data.duration}</span>
                  </AnimeDetail>
                )}

                {anime.data.aired.from && (
                  <AnimeDetail title="Start Date">
                    <span>{String(anime.data.aired.from).slice(0, 10)}</span>
                  </AnimeDetail>
                )}

                {anime.data.season && anime.data.year && (
                  <AnimeDetail title="Season">
                    <span className="capitalize">
                      {anime.data.season} {anime.data.year}
                    </span>
                  </AnimeDetail>
                )}

                {anime.data.aired.to && (
                  <AnimeDetail title="End Date">
                    <span>{String(anime.data.aired.to).slice(0, 10)}</span>
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

                {anime.data.favorites && (
                  <AnimeDetail title="Favorites">
                    <span>{formatNums.format(anime.data.favorites)}</span>
                  </AnimeDetail>
                )}

                {anime.data.studios && (
                  <AnimeDetail title="Studio">
                    {anime.data.studios.map((item) => (
                      <span key={item.name}>{item.name}</span>
                    ))}
                  </AnimeDetail>
                )}

                {anime.data.demographics && (
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

                {anime.data.producers && (
                  <AnimeDetail title="Producers">
                    {anime.data.producers.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}

                {anime.data.genres && (
                  <AnimeDetail title="Genres">
                    {anime.data.genres.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))}
                  </AnimeDetail>
                )}
              </div>
            </div>
            {/* <div className="flex w-full flex-col gap-1 ">
              <h3 className="font-bold">Cast</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                {characters &&
                  characters.data &&
                  characters.data
                    .sort((a: Datum, b: Datum) =>
                      a.favorites < b.favorites ? 1 : -1
                    )
                    .slice(0, 12)
                    .map(({ character, role, voice_actors }) => (
                      <CharacterCard
                        characterName={character.name}
                        characterImage={character.images.jpg.image_url}
                        characterRole={role}
                        voiceActor={voice_actors}
                        key={character.name}
                      ></CharacterCard>
                    ))}
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};
