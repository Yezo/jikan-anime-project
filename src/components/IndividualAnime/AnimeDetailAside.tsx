import { ISingleAnime, Demographic } from "../../interfaces/anime/ISingleAnime"
import { AnimeDetailRow } from "./AnimeDetailRow"
type Props = {
  animes: ISingleAnime
}

export const AnimeDetailAside = ({ animes }: Props) => {
  //Destructure from props to make it more readable
  const { data } = animes
  const {
    type,
    status,
    episodes,
    duration,
    season,
    year,
    aired,
    score,
    scored_by,
    members,
    favorites,
    studios,
    demographics,
    title,
    title_english,
    title_japanese,
    producers,
    genres,
  } = data

  // Combine season and year into one string - e.g; Winter 2023
  const seasons = () => {
    if (season && year) {
      return `${season} ${String(year)}`
    }
    if (season) {
      return season
    }
    if (year) {
      return String(year)
    }
    if (!season && !year) {
      return "N/A"
    }
  }

  // Trim extra text off of airing dates
  const sliceText = (date: Date) => {
    return `${String(date).slice(0, 10)}`
  }

  //The API returns empty arrays instead of null for non-existing data points
  //If length of array >= 1, then map all the entries
  // If length of array === 0, then return N/A
  const handleArrayData = (data: Demographic[]) => {
    const length = data.length
    if (length >= 1) {
      return data.map((item) => <span key={item.name}>{item.name}</span>)
    }
    if (length === 0) {
      return "N/A"
    }
  }
  return (
    <div className="gap- flex flex-col gap-1">
      <h3 className="font-bold text-titleTEXT">Details</h3>
      <div className="grid grid-cols-2 gap-y-4 rounded bg-white p-4 tracking-normal text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10 lg:min-w-[14rem] lg:max-w-[14rem] lg:grid-cols-1 lg:self-center lg:rounded lg:p-5">
        <AnimeDetailRow title="Format">{type}</AnimeDetailRow>
        <AnimeDetailRow title="Status">{status}</AnimeDetailRow>
        <AnimeDetailRow title="Episodes">{episodes}</AnimeDetailRow>
        <AnimeDetailRow title="Duration">{duration}</AnimeDetailRow>
        <AnimeDetailRow title="Season">{seasons()}</AnimeDetailRow>
        <AnimeDetailRow title="Start Date">{sliceText(aired.from)}</AnimeDetailRow>
        <AnimeDetailRow title="End Date">{sliceText(aired.to)}</AnimeDetailRow>
        <AnimeDetailRow title="Score">{score}</AnimeDetailRow>
        <AnimeDetailRow title="Score by">{scored_by}</AnimeDetailRow>
        <AnimeDetailRow title="Members">{members}</AnimeDetailRow>
        <AnimeDetailRow title="Favorites">{favorites}</AnimeDetailRow>
        <AnimeDetailRow title="Studio">{handleArrayData(studios)}</AnimeDetailRow>
        <AnimeDetailRow title="Demographic">{handleArrayData(demographics)}</AnimeDetailRow>
        <AnimeDetailRow title="Romaji">{title}</AnimeDetailRow>
        <AnimeDetailRow title="English">{title_english}</AnimeDetailRow>
        <AnimeDetailRow title="Japanese">{title_japanese}</AnimeDetailRow>
        <AnimeDetailRow title="Producers">{handleArrayData(producers)}</AnimeDetailRow>
        <AnimeDetailRow title="Genres">{handleArrayData(genres)}</AnimeDetailRow>
      </div>
    </div>
  )
}
