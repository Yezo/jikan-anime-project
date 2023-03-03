import { Link } from "react-router-dom"

type Props = {
  title: string
  children?: React.ReactNode
  url: string
}

export const NavCon = ({ title, children, url }: Props) => {
  return (
    <Link to={url}>
      <li className="flex items-center gap-4 rounded py-2 px-6 text-sm font-semibold hover:bg-slate-300 sm:min-w-[215px] sm:justify-start">
        <div className=" rounded bg-primaryBG p-2 shadow-sm ring-1 ring-black/10">{children}</div>
        {title}
      </li>
    </Link>
  )
}
