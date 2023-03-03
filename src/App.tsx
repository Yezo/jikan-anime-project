import { Route, Routes } from "react-router-dom"
import { CurrentlyAiringAnime } from "./pages/CurrentlyAiringAnime"
import { HomePage } from "./pages/HomePage"
import { IndividualAnimePage } from "./pages/IndividualAnimePage"
import { IndividualMangaPage } from "./pages/IndividualMangaPage"
import { RandomAnime } from "./pages/RandomAnime"
import { RandomManga } from "./pages/RandomManga"
import { Top100AnimePage } from "./pages/Top100AnimePage"
import { Top100MangaPage } from "./pages/Top100MangaPage"

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-[#EDF1F5]">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/anime/:animeId" element={<IndividualAnimePage />} />
        <Route path="/anime/top" element={<Top100AnimePage />} />
        <Route path="/anime/currently-airing" element={<CurrentlyAiringAnime />} />
        <Route path="/anime/random" element={<RandomAnime />} />
        <Route path="/manga/top" element={<Top100MangaPage />} />
        <Route path="/manga/:mangaId" element={<IndividualMangaPage />} />
        <Route path="/manga/random" element={<RandomManga />} />
      </Routes>
    </div>
  )
}

export default App
