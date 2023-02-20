type Props = {
  characterName: string;
  characterImage?: string;
  characterRole?: string;
  voiceActorImage?: string;
  voiceActorLanguage?: string;
  voiceActorName?: string;
};
export const CharacterCard = ({
  characterName,
  characterImage,
  characterRole,
  voiceActorImage,
  voiceActorLanguage,
  voiceActorName,
}: Props) => {
  return (
    <div
      key={characterName}
      className="flex justify-between rounded bg-[#1D262F] text-gray shadow-md ring-1 ring-black/[.10]"
    >
      <div className="flex">
        <img
          src={characterImage}
          alt={characterName}
          className="object-fit h-auto w-14 rounded-l object-center"
        ></img>
        <div className="flex flex-col justify-between p-2 text-xs text-light">
          <span className="font-semibold">{characterName}</span>
          <span className="text-[0.7rem] font-light tracking-tight text-[#e5e5e5]">
            {characterRole}
          </span>
        </div>
      </div>

      <div className="flex flex-row-reverse">
        <img
          src={voiceActorImage}
          alt={characterName}
          className="object-fit h-auto w-14 rounded-l object-center"
        ></img>
        <div className="flex flex-col items-end justify-between p-2 text-xs text-light">
          <span className="font-semibold">{voiceActorName}</span>
          <span className="text-[0.7rem] font-light tracking-tight text-[#e5e5e5]">
            {voiceActorLanguage}
          </span>
        </div>
      </div>
    </div>
  );
};
