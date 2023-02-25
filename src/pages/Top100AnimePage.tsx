import { useState, useEffect } from "react";
import { AnimeCard } from "../components/AnimeCard";
import { Navbar } from "../components/Navbar/Navbar";
import { RootObject } from "../interfaces/interfaceTop100Anime";
import {
  removeExtraDate,
  truncateString,
  removeWrittenByMALRewrite,
} from "../helpers/helperFunctions";
export const Top100AnimePage = () => {
  //States
  const [animes, setAnimes] = useState<RootObject | null>(null);
  const [pagination, setPagination] = useState<string>("1");

  const pages = ["1", "2", "3", "4", "5"];
  const url = `https://api.jikan.moe/v4/top/anime?page=${pagination}&limit=21`;

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    const fetchAPI = async () => {
      try {
        const data = await fetch(url);
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
  }, [pagination]);

  return (
    <div className="container mx-auto bg-[#F0F0F0] pb-24 font-primary text-light">
      <h1>top 100 anime</h1>
      <Navbar />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
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
                <div
                  className="flex flex-col items-center justify-center rounded-md"
                  key={mal_id}
                >
                  <AnimeCard
                    id={mal_id}
                    imageURL={images.jpg.large_image_url}
                    title={title}
                    episodes={episodes}
                    aired={aired}
                    synopsis={synopsis}
                    synopsisNum={250}
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

      <div className="mt-4 flex flex-col items-center justify-center">
        Page
        <ul className="flex gap-4">
          {pages.map((item) => (
            <li
              className={`flex cursor-pointer gap-4 hover:font-bold ${
                item === pagination ? "font-bold" : null
              }  `}
              key={item}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setPagination(e.currentTarget.textContent as any)
              }
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
