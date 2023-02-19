import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { IndividualAnimePage } from "./pages/IndividualAnimePage";
import { Top100AnimePage } from "./pages/Top100AnimePage";

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-primary">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/anime/:animeId" element={<IndividualAnimePage />} />
        <Route path="/top100/:page" element={<Top100AnimePage />} />
      </Routes>
    </div>
  );
}

export default App;
