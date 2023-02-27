interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

export const AnimeDetail = ({ title, children }: Props) => {
  return (
    <div className="">
      <h5 className="text-[0.8rem] font-semibold text-darktext">{title}</h5>
      <p className="text-[0.75rem] ">{children}</p>
    </div>
  );
};
