type Props = {
  title: string
  children?: string | number | React.ReactNode
}

export const AnimeDetailRow = ({ title, children }: Props) => {
  return (
    <div>
      <h5 className="text-[0.8rem] font-semibold text-titleTEXT">{title}</h5>
      <p className="flex flex-col text-[0.75rem] capitalize">{children ? children : "N/A"}</p>
    </div>
  )
}
