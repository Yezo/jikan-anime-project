import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { NavCon } from "./NavCon"

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  //If the currently URL path is the random anime page, automatically refresh the page (<Link> doesn't allow you to revisit the current page); otherwise let the user visit a random anime
  function handleRefreshRandomAnimePage() {
    return location.pathname === "/anime/random"
      ? window.location.reload()
      : navigate("/anime/random")
  }

  function handleRefreshRandomMangaPage() {
    return location.pathname === "/manga/random"
      ? window.location.reload()
      : navigate("/manga/random")
  }

  return (
    <nav className=" container flex flex-col items-center justify-center gap-4 border-b border-b-slate-300 px-6 pb-4 font-primary text-sm font-semibold tracking-tight text-titleTEXT sm:flex-row sm:justify-between">
      <h1 className="text-2xl font-bold tracking-tighter hover:text-accent md:pl-8">
        <Link to="/">AniFlux</Link>
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-4 md:justify-center md:gap-10">
        <NavigationMenu.Root className=" relative z-[1] flex justify-center font-primary  text-titleTEXT">
          <NavigationMenu.List className="center flex list-none rounded bg-primaryBG p-1 px-8">
            {/* First Link */}
            <NavigationMenu.Item>
              <Link
                to="/"
                className="block select-none rounded px-3 py-2 text-sm font-semibold leading-none text-titleTEXT no-underline outline-none hover:bg-slate-300"
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <HomeSVG />
                  <span>Home</span>
                </div>
              </Link>
            </NavigationMenu.Item>

            {/* Second Link */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-1 rounded px-3 py-2 text-sm font-semibold leading-none text-titleTEXT outline-none hover:bg-slate-300">
                <div className="flex flex-col items-center justify-center gap-1">
                  <AnimeSVG />
                  <span>Anime</span>
                </div>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-0 left-0 w-full  data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight sm:w-auto">
                <ul className="flex list-none flex-col gap-x-[10px] divide-y divide-gray-200 p-2 sm:w-fit  ">
                  <NavCon title={"Search"} url={"/anime/search"}>
                    <SearchSVG />
                  </NavCon>

                  <NavCon title={"Currently Airing"} url={"/anime/currently-airing"}>
                    <CurrentlyAiringSVG />
                  </NavCon>

                  <NavCon title={"Top Anime"} url={"/anime/top"}>
                    <TopAnimeMangaSVG />
                  </NavCon>

                  <div onClick={handleRefreshRandomAnimePage}>
                    <NavCon title={"Random Anime"} url={"/anime/random"}>
                      <RandomSVG />
                    </NavCon>
                  </div>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* Third Link */}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-1 rounded px-3 py-2 text-sm font-semibold leading-none text-titleTEXT outline-none hover:bg-slate-300">
                <div className="flex flex-col items-center justify-center gap-1">
                  <MangaSVG />
                  <span>Manga</span>
                </div>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-0 left-0 w-full data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight sm:w-auto">
                <ul className="flex list-none flex-col gap-x-[10px] divide-y divide-gray-200 p-2 sm:w-fit ">
                  <NavCon title={"Search"} url={"/manga/search"}>
                    <SearchSVG />
                  </NavCon>
                  <NavCon title={"Top Manga"} url={"/manga/top"}>
                    <TopAnimeMangaSVG />
                  </NavCon>
                  <div onClick={handleRefreshRandomMangaPage}>
                    <NavCon title={"Random Manga"} url={"/manga/random"}>
                      <RandomSVG />
                    </NavCon>
                  </div>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut">
              <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-accent" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="absolute top-full left-0 flex w-full justify-center perspective-[2000px]">
            <NavigationMenu.Viewport className="relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>
      </div>
    </nav>
  )
}

const HomeSVG = () => {
  return (
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
  )
}

const AnimeSVG = () => {
  return (
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
      <path d="M7 21h10"></path>
      <rect x="2" y="3" width="20" height="14" rx="2"></rect>
    </svg>
  )
}

const CurrentlyAiringSVG = () => {
  return (
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
  )
}

const TopAnimeMangaSVG = () => {
  return (
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
  )
}

const RandomSVG = () => {
  return (
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
  )
}

const MangaSVG = () => {
  return (
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  )
}

const SearchSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}
