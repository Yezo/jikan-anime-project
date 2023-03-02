import { Link } from "react-router-dom"

type Props = {
  title: string
  url: string
  children?: React.ReactNode
}

export const NavIcon = ({ title, url, children }: Props) => {
  return (
    <Link to={url}>
      <div className="flex flex-col items-center justify-center gap-1 hover:text-accent">
        {children}
        <span>{title}</span>
      </div>
    </Link>
  )
}
