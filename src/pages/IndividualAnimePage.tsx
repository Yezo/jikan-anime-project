import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CharacterCard from "../components/IndividualAnime/CharacterCard";
import { RootObject } from "../interfaces/interfaceSingularAnime";
import { Datum, gObject } from "../interfaces/interfaceAnimeCharacters";
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
    // const fetchCharacters = async (anime: string) => {
    //   const temp = await fetch(
    //     `https://api.jikan.moe/v4/anime/${anime}/characters`
    //   ).then((res) => res.json());

    // const sortedData = temp?.data.sort((a: Datum, b: Datum) =>
    //   a.favorites < b.favorites ? 1 : -1
    // );
    //   setCharacters(sortedData?.slice(0, 10));
    // };

    fetchAPI();
    animeId && fetchCharacters(animeId);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-[95rem] bg-[#131A20] font-primary text-text">
      {!isLoading && anime && (
        <>
          {/* //Header component */}
          <div>
            <img
              src={anime.data.images.jpg.large_image_url}
              alt={anime.data.title}
              className="max-h-60 w-full object-cover object-[bottom_center] "
            ></img>
          </div>

          <h1>Title: {anime.data.title}</h1>

          <Link to="/">Back to homepage</Link>

          <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {characters
              ? characters.data
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
                  ))
              : null}
          </div>
        </>
      )}
    </div>
  );
};
