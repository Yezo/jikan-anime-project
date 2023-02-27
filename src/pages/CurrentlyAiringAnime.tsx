import { useState, useEffect } from "react";
import { AnimeCard } from "../components/AnimeCard";
import { Navbar } from "../components/Navbar/Navbar";
import { RootObject } from "../interfaces/interfaceCurrentlyAiring";
import {
  removeExtraDate,
  truncateString,
  removeWrittenByMALRewrite,
} from "../helpers/helperFunctions";
export const CurrentlyAiringAnime = () => {
  //States
  const [animes, setAnimes] = useState<RootObject[] | null>(null);

  const URL_PAGE_ONE = "https://api.jikan.moe/v4/seasons/now?page=1";
  const URL_PAGE_TWO = "https://api.jikan.moe/v4/seasons/now?page=2";
  const URL_PAGE_THREE = "https://api.jikan.moe/v4/seasons/now?page=3";

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    const fetchAPI = async () => {
      try {
        const data = await fetch(URL_PAGE_ONE);
        const resp = await data.json();
        const data2 = await fetch(URL_PAGE_TWO);
        const resp2 = await data2.json();

        const data3 = await fetch(URL_PAGE_THREE);
        const resp3 = await data3.json();

        const test = [...resp.data, ...resp2.data, ...resp3.data];
        test && setAnimes(test);
        console.log(test);
      } catch (error) {
        controller.signal.aborted && console.log("Aborted the fetch.");
      }
    };
    fetchAPI();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="container mx-auto bg-[#EDF1F5] py-10 pb-24 font-primary  sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      <div className="grid place-items-center pt-8">
        <h2 className="text-2xl font-bold tracking-tighter text-darktext">
          Currently Airing
        </h2>
      </div>
      <div className="mx-auto flex h-full w-full flex-wrap items-center justify-center gap-3 pt-8">
        {animes && animes
          ? animes.map(
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
                  synopsisNum={180}
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
