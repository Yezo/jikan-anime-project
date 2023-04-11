import { useGetSeasonsListQuery } from "../../redux/anime"
import { ErrorMessage } from "../../components/Messages/ErrorMessage"
import { LoadingMessage } from "../../components/Messages/LoadingMessage"
import { Navbar } from "../../components/Navbar/Navbar"
import { Link } from "react-router-dom"

export const SeasonList = () => {
  const { data: animes, error, isLoading } = useGetSeasonsListQuery("")

  return (
    <div className="container mx-auto bg-primaryBG py-10 px-6 pb-16 font-primary sm:px-12 sm:pb-8 lg:px-20 xl:px-40 2xl:px-52">
      <Navbar />
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingMessage />
      ) : animes ? (
        <>
          <div className="grid place-items-center pt-8">
            <h2 className="text-2xl font-bold tracking-tighter text-titleTEXT">Archived Seasons</h2>
          </div>
          <div className="mx-auto flex h-full w-full flex-col flex-wrap items-center justify-center gap-12 pt-8">
            {animes && animes.data
              ? animes.data.slice(0, 24).map(({ year, seasons }, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className=" font-bold text-titleTEXT">{year}</h3>
                    <div className="flex flex-wrap gap-5">
                      {seasons.map((item, index) => (
                        <Link
                          to={`/anime/archive/${year}/${item}`}
                          key={index}
                          className={`grid min-h-[9.5rem] min-w-[9.5rem] place-items-end rounded bg-white p-4 text-sm capitalize text-titleTEXT shadow-sm ring-1 ring-black/5 hover:ring-black/40 hover:saturate-200 ${
                            item === "winter" && "bg-[#DAE8F0]"
                          } ${item === "spring" && "bg-[#E4D9EE]"} ${
                            item === "summer" && "bg-[#DAF0DF]"
                          } ${item === "fall" && "bg-[#F0E2DA]"}`}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
