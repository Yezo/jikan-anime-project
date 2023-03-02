import { Link, useLocation, useNavigate } from "react-router-dom"
import { NavIcon } from "./NavIcon"

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  //If the currently URL path is the random anime page, automatically refresh the page (<Link> doesn't allow you to revisit the current page); otherwise let the user visit a random anime
  function handleRefreshRandomAnimePage() {
    return location.pathname === "/anime/random"
      ? window.location.reload()
      : navigate("/anime/random")
  }

  return (
    <nav className=" text-primary container flex flex-col items-center justify-center gap-4 border-b border-b-slate-300 px-6 pb-4 text-sm font-semibold tracking-tight text-titleTEXT sm:flex-row sm:justify-between">
      <h1 className="text-2xl font-bold tracking-tighter hover:text-accent">
        <Link to="/">AniFlux</Link>
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-4 md:justify-center md:gap-10">
        <NavIcon title={"Home"} url={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </NavIcon>

        <NavIcon title={"Airing Now"} url={"/anime/currently-airing"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
            <polyline points="17 2 12 7 7 2"></polyline>
          </svg>
        </NavIcon>

        <NavIcon title={"Top Anime"} url={"/anime/top"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </NavIcon>

        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-1 hover:text-accent"
          onClick={handleRefreshRandomAnimePage}
        >
          <NavIcon title={"Random"} url={"/anime/random"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </NavIcon>
        </div>
      </div>
    </nav>
  )
}
