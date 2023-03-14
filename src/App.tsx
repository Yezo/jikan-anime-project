//Imports
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"

//Imports - Anime
import { CurrentlyAiringAnime } from "./pages/Anime/CurrentlyAiringAnime"
import { IndividualAnimePage } from "./pages/Anime/IndividualAnimePage"
import { RandomAnime } from "./pages/Anime/RandomAnime"
import { SearchAnime } from "./pages/Anime/SearchAnime"
import { Top100AnimePage } from "./pages/Anime/Top100AnimePage"

//Imports - Manga
import { IndividualMangaPage } from "./pages/Manga/IndividualMangaPage"
import { RandomManga } from "./pages/Manga/RandomManga"
import { SearchManga } from "./pages/Manga/SearchManga"
import { Top100MangaPage } from "./pages/Manga/Top100MangaPage"

export default function App() {
  return (
    <div className="min-w-screen min-h-screen bg-[#EDF1F5]">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/anime/:animeId" element={<IndividualAnimePage />} />
        <Route path="/anime/search" element={<SearchAnime />} />
        <Route path="/anime/top" element={<Top100AnimePage />} />
        <Route path="/anime/currently-airing" element={<CurrentlyAiringAnime />} />
        <Route path="/anime/random" element={<RandomAnime />} />

        <Route path="/manga/search" element={<SearchManga />} />
        <Route path="/manga/top" element={<Top100MangaPage />} />
        <Route path="/manga/:mangaId" element={<IndividualMangaPage />} />
        <Route path="/manga/random" element={<RandomManga />} />
      </Routes>
    </div>
  )
}
