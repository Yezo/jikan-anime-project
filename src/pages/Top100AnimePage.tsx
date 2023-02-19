import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { RootObject } from "../interfaces/interfaceSingularAnime";

export const Top100AnimePage = () => {
  const { page } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [anime, setAnime] = useState<RootObject | null>(null);

  //Constants
  const API_URL = `https://api.jikan.moe/v4/top/anime?page=${page}&limit=21`;

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
  console.log(anime);

  return (
    <>
      {!isLoading && anime && (
        <>
          {/* <h1>Title: {anime.data.title}</h1>
          <img src={anime.data.images.webp.large_image_url}></img> */}
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
};
