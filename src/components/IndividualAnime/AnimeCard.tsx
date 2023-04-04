import { Link, useNavigate } from "react-router-dom"
import { ScrollableDescriptionArea } from "../ScrollableDescription/ScrollableDescriptionArea"
import { removeExtraDate, removeWrittenByMALRewrite } from "../../helpers/helperFunctions"
import { Demographic } from "../../interfaces/anime/IMultiAnime"

type Props = {
  id: number | null
  imageURL: string | null
  title: string
  episodes: number | null
  synopsis: string | null
  aired: string
  genres: Demographic[]
}

export const AnimeCard = ({ id, imageURL, title, episodes, synopsis, aired, genres }: Props) => {
  //Navigate to a singular anime's page since you can't have an img element inside a Link element
  const navigate = useNavigate()
  const move = (url: string) => {
    return navigate(url)
  }
  return (
    <div
      className="flex min-w-full flex-col rounded-md bg-[white] shadow-md ring-1 ring-black/[.05] sm:h-[275px] sm:flex-row lg:max-h-[275px] lg:min-h-[275px] xl:min-w-[33rem] xl:max-w-[33rem]"
      key={id}
    >
      {/* Left side */}
      {imageURL && (
        <img
          className="max-h-[175px] cursor-pointer rounded-t-md object-cover object-[top_center]  hover:brightness-75 sm:max-h-[275px] sm:min-h-[275px] sm:min-w-[195px] sm:max-w-[195px] sm:rounded-none sm:rounded-l-md"
          src={imageURL}
          alt={title}
          onClick={() => move(`/anime/${id}`)}
        ></img>
      )}

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
              {episodes
                ? `${episodes} episodes aired on ${aired && removeExtraDate(aired)}`
                : `1st episode airing on ${aired && removeExtraDate(aired)}`}
            </p>
          </div>
          {/* Sypnosis Content */}
          <ScrollableDescriptionArea>
            {synopsis && removeWrittenByMALRewrite(synopsis)}
          </ScrollableDescriptionArea>
        </div>
        {/* Footer */}
        <footer className="flex h-[3.5rem] max-h-[3.5rem] w-full flex-wrap items-center gap-1   bg-primaryBG pl-3 md:rounded-br-md">
          {genres &&
            genres.slice(0, 4).map((item) => (
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
  )
}
