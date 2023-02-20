import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CharacterCard from "../components/IndividualAnime/CharacterCard";
import { RootObject } from "../interfaces/interfaceSingularAnime";
import { Datum, gObject } from "../interfaces/interfaceAnimeCharacters";
import { AnimeDetail } from "../components/IndividualAnime/AnimeDetail";
export const IndividualAnimePage = () => {
  const { animeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [anime, setAnime] = useState<RootObject | null>(null);
  const [characters, setCharacters] = useState<gObject | null>(null);

  //Constants
  const API_URL = `https://api.jikan.moe/v4/anime/${animeId}`;

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

    const fetchCharacters = async (id: string) => {
      try {
        const data = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        );
        const resp = await data.json();
        setCharacters(resp);
        setIsLoading(false);
      } catch (error) {
        controller.signal.aborted && console.log("Aborted the fetch.");
      }
    };

    animeId && fetchAPI();
    animeId && fetchCharacters(animeId);
    return () => {
      controller.abort();
    };
  }, []);

  function removeWrittenByMALRewrite(url: string) {
    return url.split("[Written by MAL Rewrite]")[0].replace(/\s*$/, "");
  }

  const formatNums = new Intl.NumberFormat("en-US", {
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className="mx-auto min-h-screen max-w-[95rem] bg-[#131A20] font-primary text-light">
      {!isLoading && anime && characters && (
        <>
          {/* //Header component */}
          <div className="">
            <img
              src={anime.data.images.jpg.large_image_url}
              alt={anime.data.title}
              className="max-h-60 w-full object-cover object-[center] "
            ></img>
            <h1 className="px-4 pt-5 text-3xl font-bold">{anime.data.title}</h1>
            <div className="flex gap-2 px-4 py-2">
              <div className="rounded-2xl bg-[#1D262F] px-4 py-1 text-xs font-semibold">
                Rank: #{anime.data.rank}
              </div>
              <div className="rounded-2xl bg-[#1D262F] px-4 py-1 text-xs font-semibold">
                Popularity: #{anime.data.popularity}
              </div>
            </div>
            <div className="flex flex-col p-4">
              <h3 className="font-bold">Description</h3>
              <p className="text-sm">
                {removeWrittenByMALRewrite(anime.data.synopsis)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 tracking-normal">
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

          <div className="flex flex-col gap-2 p-4">
            <h3 className="font-bold">Cast</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {characters &&
                characters.data &&
                characters.data
                  .sort((a: Datum, b: Datum) =>
                    a.favorites < b.favorites ? 1 : -1
                  )
                  .slice(0, 8)
                  .map(({ character, role, voice_actors }) => (
                    <CharacterCard
                      characterName={character.name}
                      characterImage={character.images.jpg.image_url}
                      characterRole={role}
                      voiceActorImage={
                        voice_actors[0].person.images.jpg.image_url
                      }
                      voiceActorLanguage={voice_actors[0].language}
                      voiceActorName={voice_actors[0].person.name}
                      key={character.name}
                    ></CharacterCard>
                  ))}
            </div>
          </div>

          <Link to="/">Back to homepage</Link>
        </>
      )}
    </div>
  );
};
