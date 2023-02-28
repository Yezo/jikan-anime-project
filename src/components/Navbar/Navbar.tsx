import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleRefreshRandomAnimePage() {
    //If the currently URL path is the random anime page, automatically refresh the page (<Link> doesn't allow you to revisit the current page); otherwise let the user visit a random anime
    return location.pathname === "/anime/random"
      ? window.location.reload()
      : navigate("/anime/random");
  }

  return (
    <>
      {/* <nav className="container fixed bottom-0 z-40 grid grid-cols-4 place-items-center gap-2 border-t border-t-[#181818] bg-[#1D262F] p-3 text-sm font-semibold tracking-tight text-[#d3d3d3] shadow-2xl shadow-white sm:hidden">
        <Link to="/">
          <div className="flex cursor-pointer flex-col items-center justify-center gap-1 hover:text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-house-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
            </svg>
            <span>Home</span>
          </div>
        </Link>
        <Link to="/anime/currently-airing">
          <div className="flex flex-col items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-display-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 12c0 .667-.083 1.167-.25 1.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-.75c-.167-.333-.25-.833-.25-1.5h4c2 0 2-2 2-2V4c0-2-2-2-2-2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h4z" />
            </svg>
            <span>Airing</span>
          </div>
        </Link>
        <Link to="/anime/top">
          <div className="flex flex-col items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-reception-4"
              viewBox="0 0 16 16"
            >
              <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z" />
            </svg>
            <span>Top 100</span>
          </div>
        </Link>
        <Link to="/anime/random">
          <div className="flex flex-col items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-shuffle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
              />
              <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
            </svg>
            <span>Random</span>
          </div>
        </Link>
      </nav> */}

      <nav className=" container flex flex-col items-center justify-center gap-4 border-b border-b-slate-300 px-6 pb-4 text-sm font-semibold tracking-tight text-primary sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tighter hover:text-accent">
          <Link to="/">AniFlux</Link>
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 md:justify-center md:gap-10">
          <Link to="/">
            <div className="flex cursor-pointer flex-col items-center justify-center  hover:text-accent">
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
              <span>Home</span>
            </div>
          </Link>
          <Link to="/anime/currently-airing">
            <div className="flex flex-col items-center justify-center gap-1 hover:text-accent">
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
              <span>Airing Now</span>
            </div>
          </Link>
          <Link to="/anime/top">
            <div className="flex flex-col items-center justify-center gap-1 hover:text-accent">
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
              <span>Top 100</span>
            </div>
          </Link>

          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-1 hover:text-accent"
            onClick={handleRefreshRandomAnimePage}
          >
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
            <span>Random</span>
          </div>
        </div>
      </nav>
    </>
  );
};
