import { Route, Routes } from "react-router-dom";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { CurrentlyAiringAnime } from "./pages/CurrentlyAiringAnime";
import { HomePage } from "./pages/HomePage";
import { IndividualAnimePage } from "./pages/IndividualAnimePage";
import { RandomAnime } from "./pages/RandomAnime";
import { Top100AnimePage } from "./pages/Top100AnimePage";

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-[#131A20]">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/anime/:animeId" element={<IndividualAnimePage />} />
        <Route path="/anime/top" element={<Top100AnimePage />} />
        <Route
          path="/anime/currently-airing"
          element={<CurrentlyAiringAnime />}
        />
        <Route path="/anime/random" element={<RandomAnime />} />
      </Routes>
    </div>
  );
}

export default App;
