import { VoiceActor } from "../../interfaces/interfaceAnimeCharacters";

type Props = {
  characterName: string;
  characterImage?: string;
  characterRole?: string;
  voiceActor: VoiceActor[];
};
export const CharacterCard = ({
  characterName,
  characterImage,
  characterRole,
  voiceActor,
}: Props) => {
  const japaneseVoiceActor = voiceActor.filter(
    (item) => item.language === "Japanese"
  );

  return (
    <div
      key={characterName}
      className="flex justify-between rounded bg-white text-darktext shadow-md ring-1 ring-darktext/10"
    >
      <div className="flex">
        <img
          src={characterImage}
          alt={characterName}
          className="h-auto w-14 rounded-l object-cover object-center ring-1 ring-darktext/10"
        ></img>
        <div className="flex flex-col justify-between p-2 text-xs text-darktext ">
          <span className="font-semibold">{characterName}</span>
          <span className="text-[0.7rem] font-light tracking-tight ">
            {characterRole}
          </span>
        </div>
      </div>

      <div className="flex flex-row-reverse">
        {japaneseVoiceActor[0] && (
          <img
            src={japaneseVoiceActor[0].person.images.jpg.image_url}
            alt={characterName}
            className="h-auto w-14 rounded-r object-cover object-center ring-1 ring-darktext/10"
          ></img>
        )}
        <div className="flex flex-col items-end justify-between p-2 text-xs ">
          <span className="text-right font-semibold">
            {japaneseVoiceActor[0] && japaneseVoiceActor[0].person.name}
          </span>
          <span className=" text-right text-[0.7rem] font-light tracking-tight ">
            {japaneseVoiceActor[0] && japaneseVoiceActor[0].language}
          </span>
        </div>
      </div>
    </div>
  );
};
