import { useState, useEffect } from "react";
import { AnimeCard } from "../components/AnimeCard";
import { Navbar } from "../components/Navbar/Navbar";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { RootObject } from "../interfaces/interfaceTop100Anime";
import {
  removeExtraDate,
  truncateString,
  removeWrittenByMALRewrite,
} from "../helpers/helperFunctions";

export const HomePage = () => {
  //States
  const [animes, setAnimes] = useState<RootObject | null>(null);
  const [query, setQuery] = useState<string>("");
  const API_URL = `https://api.jikan.moe/v4/anime?q=${query}`;

  useEffect(() => {
    //Debounce the search query to help mitigate 429 API errors
    const getData = setTimeout(() => {
      if (query.length > 0) {
        fetch(API_URL)
          .then((res) => res.json())
          .then((res) => setAnimes(res));
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [query]);

  return (
    <div className="container mx-auto min-h-screen bg-[#EDF1F5] p-10 font-primary text-text lg:px-20">
      <Navbar />
      <Searchbar setQuery={setQuery} />
      <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3">
        {animes && animes.data
          ? animes?.data.map(
              ({
                mal_id,
                images,
                title,
                episodes,
                aired,
                synopsis,
                genres,
              }) => (
                <AnimeCard
                  id={mal_id}
                  imageURL={images.jpg.large_image_url}
                  title={title}
                  episodes={episodes}
                  aired={aired}
                  synopsis={synopsis}
                  synopsisNum={200}
                  genres={genres}
                  removeExtraDate={removeExtraDate}
                  removeWrittenByMALRewrite={removeWrittenByMALRewrite}
                  truncateString={truncateString}
                  key={mal_id}
                ></AnimeCard>
              )
            )
          : null}
      </div>
    </div>
  );
};
