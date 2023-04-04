type Props = {
  characterName: string
  characterImage?: string
  characterRole?: string
}
export const MangaCharacterCard = ({ characterName, characterImage, characterRole }: Props) => {
  return (
    <div
      key={characterName}
      className="flex justify-between rounded bg-white text-titleTEXT shadow-md ring-1 ring-titleTEXT/10"
    >
      <div className="flex">
        <img
          src={characterImage}
          alt={characterName}
          className="min-h-[80px] w-14 rounded-l object-cover object-center ring-1 ring-titleTEXT/10"
        ></img>
        <div className="flex flex-col justify-between p-2 text-xs text-titleTEXT ">
          <span className="font-semibold">{characterName}</span>
          <span className="text-[0.7rem] font-light tracking-tight text-normalTEXT ">
            {characterRole}
          </span>
        </div>
      </div>
    </div>
  )
}
