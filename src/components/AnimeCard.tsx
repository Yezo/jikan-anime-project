import { Genre, Aired } from "../interfaces/interfaceTop100Anime";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";
type Props = {
  id: number;
  imageURL: string;
  title: string;
  episodes?: number;
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
    //! 380 x 300
    //TODO  recreate the anime card from sc ratch

    <div className="flex min-w-full flex-col rounded-md bg-[white] shadow-md ring-1 ring-black/[.05] sm:h-[275px] sm:flex-row lg:max-h-[275px] lg:min-h-[275px] xl:min-w-[33rem] xl:max-w-[33rem]">
      {/* Left side */}
      <img
        className="max-h-[175px] cursor-pointer rounded-t-md object-cover object-[top_center]  hover:brightness-75 sm:max-h-[275px] sm:min-h-[275px] sm:min-w-[195px] sm:max-w-[195px] sm:rounded-none sm:rounded-l-md"
        src={imageURL}
        alt={title}
        onClick={() => move(`/anime/${id}`)}
      ></img>

      {/* Right side */}
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-full flex-col justify-between gap-4 p-3">
          {/* Title + Air Date */}
          <div className="flex flex-col gap-1">
            <Link to={`/anime/${id}`}>
              <h2 className="text-md font-semibold tracking-tighter text-titleTEXT transition-all  hover:text-accent">
                {title}
              </h2>
            </Link>
            <p className="text-xs font-semibold text-normalTEXT ">
              {episodes} episodes aired on {removeExtraDate(aired.string)}
            </p>
          </div>
          {/* Sypnosis Content */}
          <ScrollArea.Root className="max-h-[8.9rem] overflow-hidden rounded bg-white text-xs">
            <ScrollArea.Viewport className="h-full w-full rounded">
              <div className="pr-4 text-[0.7rem]  leading-5 text-normalTEXT">
                {truncateString(
                  removeWrittenByMALRewrite(synopsis),
                  synopsisNum
                )}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out hover:bg-white data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="vertical"
            >
              <ScrollArea.Thumb className=" relative flex-1 rounded-[10px] bg-titleTEXT/30 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-titleTEXT/80" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out hover:bg-white data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-blackA8" />
          </ScrollArea.Root>
          {/* <p className="max-h-[10rem] max-w-full overflow-y-auto overscroll-contain  text-[0.7rem] leading-5  text-normalTEXT">
            {truncateString(removeWrittenByMALRewrite(synopsis), synopsisNum)}
          </p> */}
        </div>
        {/* Footer */}
        <footer className="flex h-[3.5rem] max-h-[3.5rem] w-full flex-wrap items-center gap-1   bg-primaryBG pl-3 md:rounded-br-md">
          {genres.slice(0, 4).map((item) => (
            <div
              className="flex max-h-[2rem] max-w-fit flex-wrap items-center justify-center rounded-2xl bg-accent px-2 py-1 pb-1.5 text-[0.65rem] font-semibold text-white shadow-md"
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
