//Imports
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"

//Imports - Anime
import { CurrentAiringAnime } from "./pages/Anime/CurrentAiringAnime"
import { RandomAnime } from "./pages/Anime/RandomAnime"
import { TopAnime } from "./pages/Anime/TopAnime"
import { IndividualAnime } from "./pages/Anime/IndividualAnime"
import { SearchAnime } from "./pages/Anime/SearchAnime"

//Imports - Manga
import { TopManga } from "./pages/Manga/TopManga"
import { IndividualManga } from "./pages/Manga/IndividualManga"
import { RandomManga } from "./pages/Manga/RandomManga"
import { SearchManga } from "./pages/Manga/SearchManga"

//Imports - Test

export default function App() {
  return (
    <div className="min-w-screen min-h-screen bg-[#EDF1F5]">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/anime/:animeId" element={<IndividualAnime />} />
        <Route path="/anime/top" element={<TopAnime />} />
        <Route path="/anime/currently-airing" element={<CurrentAiringAnime />} />
        <Route path="/anime/random" element={<RandomAnime />} />
        <Route path="/anime/search" element={<SearchAnime />} />

        <Route path="/manga/:mangaId" element={<IndividualManga />} />
        <Route path="/manga/top" element={<TopManga />} />
        <Route path="/manga/random" element={<RandomManga />} />
        <Route path="/manga/search" element={<SearchManga />} />
      </Routes>
    </div>
  )
}
