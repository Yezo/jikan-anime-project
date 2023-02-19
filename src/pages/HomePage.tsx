import React, { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import { RootObject } from "../interfaces/interfaceTop100Anime";

export const HomePage = () => {
  //States
  const [animes, setAnimes] = useState<RootObject | null>(null);
  const [pagination, setPagination] = useState<number>(1);

  //Constants
  const API_URL = `https://api.jikan.moe/v4/top/anime?page=${pagination}&limit=21`;

  //Fetch data
  useEffect(() => {
    const controller = new AbortController();
    const fetchAPI = async () => {
      try {
        const data = await fetch(API_URL);
        const resp = await data.json();
        setAnimes(resp);
      } catch (error) {
        controller.signal.aborted && console.log("Aborted the fetch.");
      }
    };
    fetchAPI();
    return () => {
      controller.abort();
    };
  }, []);

  //Helper functions
  function removeExtraDate(url: string) {
    return url.split("to")[0].replace(/\s*$/, "");
  }

  function removeWrittenByMALRewrite(url: string) {
    return url.split("[Written by MAL Rewrite]")[0].replace(/\s*$/, "");
  }

  function truncateString(str: string, num: number) {
    const trimmedString = str.slice(0, num);
    const good = trimmedString.slice(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
    return str.length > num ? good.slice(0, num) + "..." : str;
  }

  return (
    <div className="mx-auto min-h-screen max-w-[95rem] bg-light p-10 font-primary text-text">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
        {animes
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
                <div
                  className="flex flex-col items-center justify-center rounded-md"
                  key={mal_id}
                >
                  <AnimeCard
                    id={mal_id}
                    imageURL={images.webp.large_image_url}
                    title={title}
                    episodes={episodes}
                    aired={aired}
                    synopsis={synopsis}
                    synopsisNum={150}
                    genres={genres}
                    removeExtraDate={removeExtraDate}
                    removeWrittenByMALRewrite={removeWrittenByMALRewrite}
                    truncateString={truncateString}
                  ></AnimeCard>
                </div>
              )
            )
          : null}
      </div>
    </div>
  );
};
