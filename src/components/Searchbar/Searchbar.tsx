import { useEffect, useState } from "react";
import { RootObject } from "../../interfaces/interfaceTop100Anime";

type Props = {
  setAnimes: React.Dispatch<React.SetStateAction<RootObject | null>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Searchbar = ({ setAnimes, setQuery }: Props) => {
  //States

  return (
    <div className="grid h-40 place-items-center">
      <form>
        <label
          htmlFor="searchbar"
          className="border-secondary focus-within:border-secondary relative block overflow-hidden border-b pt-3"
        >
          <input
            type="searchbar"
            id="searchbar"
            placeholder="Search something..."
            className="peer h-7 w-full border-none bg-transparent p-0 px-1 py-1 italic tracking-tighter focus:border-transparent focus:placeholder-transparent focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};
