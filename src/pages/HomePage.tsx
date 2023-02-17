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

  return (
    <div className="mx-auto min-h-screen max-w-[95rem] bg-primary px-10 font-primary text-text">
      <div className="grid grid-cols-3 gap-8">
        {animes
          ? animes?.data.map(
              ({
                rank,
                mal_id,
                season,
                images,
                title,
                episodes,
                aired,
                synopsis,
              }) => (
                <div
                  className="flex flex-col items-center overflow-y-auto  rounded-sm bg-white md:max-h-[18rem] md:max-w-xl md:flex-row"
                  key={mal_id}
                >
                  <img
                    className="h-full w-[185px] rounded-l-sm object-cover  "
                    src={images.webp.large_image_url}
                    alt={title}
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-extrabold tracking-tighter text-primary">
                      {title}
                    </h5>
                    <p className="text-gray-700 mb-3 truncate  whitespace-normal  text-sm">
                      {removeWrittenByMALRewrite(synopsis)}
                    </p>
                    <p>
                      {episodes} episodes aired on{" "}
                      {removeExtraDate(aired.string)}
                    </p>
                  </div>
                </div>
              )
            )
          : null}
      </div>
    </div>
  );
};
