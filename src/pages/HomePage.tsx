import { Navbar } from "../components/Navbar/Navbar"

export const HomePage = () => {
  return (
    <div className="container mx-auto h-full bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      <div className="flex flex-col gap-10 pt-8 lg:flex-row-reverse lg:pt-12">
        <div className="basis-1/2">
          <img
            src="/japan.png"
            alt="Photo of Japan"
            className="max-h-[30rem] rounded-lg shadow-md ring-1 ring-black/[.45]"
          />
        </div>
        <div className="basis-1/2">
          <div className="flex h-full flex-col items-center justify-evenly gap-8 pb-8">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-titleTEXT">Welcome to AniFlux</h2>
              <p className="max-w-[40ch] text-center tracking-tight opacity-80">
                This is a project for all anime lovers to view details of their favorite anime.
                Users can search for any anime, view all currently airing anime, see the top anime
                of all time, or be sent to any random anime.
              </p>
            </div>
            <div className="flex max-w-fit flex-col items-center justify-center gap-4 rounded-lg bg-accent py-3 px-8 text-center text-xs font-semibold text-primaryBG opacity-80 shadow-sm ring-1 ring-black/[.15] sm:flex-row">
              <WarningSVG />
              <p>Some data may not load due to API rate-limiting.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WarningSVG = () => {
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
      className="opacity-80"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  )
}
