import React from "react"
import { removeWrittenByMALRewrite } from "../../helpers/helperFunctions"

type Props = {
  URL: string
  title: string
  rank: number
  popularity: number
  synopsis?: string
}

export const AnimeDetailHeader = ({ URL, title, rank, popularity, synopsis }: Props) => {
  return (
    <div className="z-10 lg:mb-4">
      <div className="lg:flex lg:pt-6">
        <img
          src={URL}
          alt={title}
          className="max-h-60 w-full object-cover object-[center] shadow-sm ring-1 ring-titleTEXT/10 lg:max-h-full lg:min-h-[20rem] lg:min-w-[14rem] lg:max-w-[14rem] lg:rounded"
        ></img>
        <div className=" flex flex-col justify-between">
          <div>
            <h1 className="px-4 pt-5 text-3xl font-bold text-titleTEXT lg:pt-0">{title}</h1>
            <div className="flex gap-2 px-4 py-2">
              <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                Rank: #{rank}
              </div>
              <div className="rounded-2xl bg-white px-4 py-1 text-xs font-semibold text-titleTEXT shadow-sm ring-1 ring-titleTEXT/10">
                Popularity: #{popularity}
              </div>
            </div>
          </div>
          {synopsis ? (
            <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0 ">
              <h3 className="font-bold text-titleTEXT">Description</h3>
              <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
                {removeWrittenByMALRewrite(synopsis)}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 px-4 lg:pr-0 lg:pb-0 ">
              <h3 className="font-bold text-titleTEXT">Description</h3>
              <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
                A synopsis could not be found for this anime.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
