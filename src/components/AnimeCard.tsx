import { Genre, Aired } from "../interfaces/interfaceTop100Anime";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  imageURL: string;
  title: string;
  episodes: number;
  aired: Aired;
  synopsis: string;
  synopsisNum: number;
  genres: Genre[];
  removeExtraDate: (url: string) => string;
  removeWrittenByMALRewrite: (url: string) => string;
  truncateString: (url: string, num: number) => string;
};

export const AnimeCard = ({
  id,
  imageURL,
  title,
  episodes,
  aired,
  synopsis,
  synopsisNum,
  genres,
  removeExtraDate,
  removeWrittenByMALRewrite,
  truncateString,
}: Props) => {
  //Navigate to a singular anime's page since you can't have an img element inside a Link element
  const navigate = useNavigate();
  const move = (url: string) => {
    return navigate(url);
  };

  return (
    <div className="flex flex-col rounded-md  bg-[white] shadow-md ring-1 ring-black/[.05] sm:h-[275px] sm:min-w-[30rem] sm:max-w-[30rem] sm:flex-row lg:max-h-[275px] lg:min-h-[275px]">
      {/* Left side */}

      <img
        className="h-full w-full cursor-pointer rounded-t-md object-cover object-[top_center] sm:h-auto sm:w-48 sm:rounded-none sm:rounded-l-md lg:max-h-[275px] lg:min-h-[275px] lg:min-w-[195px] lg:max-w-[195px]"
        src={imageURL}
        alt={title}
        onClick={() => move(`/anime/${id}`)}
      ></img>

      {/* Right side */}
      <div className="flex w-full flex-col justify-between">
        <div className="flex h-full flex-col justify-between gap-4 p-3">
          {/* Title + Air Date */}
          <div className="flex flex-col gap-1">
            <Link to={`/anime/${id}`}>
              <h2 className="text-xl font-semibold tracking-tighter text-[#393831]">
                {title}
              </h2>
            </Link>
            <p className="text-xs font-semibold text-text">
              {episodes} episodes aired on {removeExtraDate(aired.string)}
            </p>
          </div>
          {/* Sypnosis Content */}
          <p className="max-h-[10rem] max-w-full overflow-y-auto overscroll-contain  text-[0.7rem] leading-5  text-text">
            {truncateString(removeWrittenByMALRewrite(synopsis), synopsisNum)}
          </p>
        </div>
        {/* Footer */}
        <footer className="flex h-[3.5rem] max-h-[3.5rem] w-full flex-wrap items-center gap-1  rounded-b-md bg-gray pl-3 md:rounded-br-md">
          {genres.slice(0, 3).map((item) => (
            <div
              className="flex max-h-[2rem] max-w-fit flex-wrap items-center justify-center rounded-2xl bg-[#3480EA] px-2 py-1 pb-1.5 text-[0.65rem] font-semibold text-white shadow-md"
              key={item.mal_id}
            >
              {item.name}
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
};
