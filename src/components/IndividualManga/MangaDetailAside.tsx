import { ISingleManga, Author } from "../../interfaces/manga/ISingleManga"
import { MangaDetailRow } from "./MangaDetailRow"

export const MangaDetailAside = ({ manga }: { manga: ISingleManga }) => {
  //Destructure from props to make it more readable
  const { data } = manga
  const {
    type,
    status,
    chapters,
    volumes,
    published,
    authors,
    score,
    scored_by,
    members,
    favorites,
    demographics,
    title,
    title_english,
    title_japanese,
    genres,
    themes,
  } = data

  //The API returns empty arrays instead of null for non-existing data points
  //If length of array >= 1, then map all the entries
  // If length of array === 0, then return N/A
  const handleArrayData = (data: Author[]) => {
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
        <MangaDetailRow title="Format">{type}</MangaDetailRow>
        <MangaDetailRow title="Status">{status}</MangaDetailRow>
        <MangaDetailRow title="Chapters">{chapters}</MangaDetailRow>
        <MangaDetailRow title="Volumes">{volumes}</MangaDetailRow>
        <MangaDetailRow title="Published">{published.string}</MangaDetailRow>
        <MangaDetailRow title="Authors">{handleArrayData(authors)}</MangaDetailRow>
        <MangaDetailRow title="Score">{score}</MangaDetailRow>
        <MangaDetailRow title="Score by">{scored_by}</MangaDetailRow>
        <MangaDetailRow title="Members">{members}</MangaDetailRow>
        <MangaDetailRow title="Favorites">{favorites}</MangaDetailRow>
        <MangaDetailRow title="Demographic">{handleArrayData(demographics)}</MangaDetailRow>
        <MangaDetailRow title="Romaji">{title}</MangaDetailRow>
        <MangaDetailRow title="English">{title_english}</MangaDetailRow>
        <MangaDetailRow title="Japanese">{title_japanese}</MangaDetailRow>
        <MangaDetailRow title="Genres">{handleArrayData(genres)}</MangaDetailRow>
        <MangaDetailRow title="Themes">{handleArrayData(themes)}</MangaDetailRow>
      </div>
    </div>
  )
}
