import React, { useState, useEffect } from "react";
import { RootObject, JikanAPI } from "../interfaces/interfaceJikanAPI";

export const HomePage = () => {
  //States
  const [animes, setAnimes] = useState<RootObject | null>(null);
  const [pagination, setPagination] = useState<number>(1);

  //Constants
  const API_URL = `https://api.jikan.moe/v4/top/anime?page=${pagination}`;

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
    <div className="mx-auto min-h-screen max-w-[95rem] bg-primary px-10 font-primary text-text">
      <div className="grid grid-cols-3 gap-8">
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
                  className="flex flex-col items-center rounded-sm bg-white md:max-h-[18rem]  md:min-h-[18rem] md:max-w-lg md:flex-row"
                  key={mal_id}
                >
                  <img
                    className="h-full w-[185px] rounded-l-sm object-cover object-center"
                    src={images.webp.large_image_url}
                    alt={title}
                  />
                  <div className="flex h-full flex-col">
                    <div className="flex h-full flex-col justify-between gap-4 p-4  leading-normal">
                      <div className="flex flex-col">
                        <h2 className="text-xl font-semibold tracking-tighter text-[#393831]">
                          {title}
                        </h2>
                        <p className="text-xs font-semibold">
                          {episodes} episodes aired on{" "}
                          {removeExtraDate(aired.string)}
                        </p>
                      </div>
                      <p className="max-h-[10rem] max-w-full overflow-y-auto overscroll-contain  text-[0.7rem] leading-5  text-text">
                        {truncateString(
                          removeWrittenByMALRewrite(synopsis),
                          150
                        )}
                      </p>
                    </div>
                    <footer className="flex h-[3.5rem] max-h-[3.5rem] w-full flex-wrap items-center gap-1  bg-gray px-2">
                      {genres.map((item) => (
                        <div
                          className="flex max-h-[2rem] max-w-fit items-center justify-center rounded-2xl bg-[#3480EA] px-2 py-1 pb-1.5 text-[0.65rem] font-semibold text-white"
                          key={item.mal_id}
                        >
                          {item.name}
                        </div>
                      ))}
                    </footer>
                  </div>
                </div>
              )
            )
          : null}
      </div>
    </div>
  );
};
