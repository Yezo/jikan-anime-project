import { Datum } from "../../interfaces/anime/ISingleCharacter"
import { AnimeCharacterCard } from "./AnimeCharacterCard"

export const AnimeCast = ({ characters }: { characters: Datum[] | undefined }) => {
  const length = characters && characters.length

  return (
    <>
      {length === 0 ? (
        <div className="flex w-full flex-col gap-1 ">
          <h3 className="font-bold text-titleTEXT">Cast</h3>
          <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
            A cast of characters could not be found for this anime.
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1 ">
          {characters && (
            <>
              <h3 className="font-bold text-titleTEXT">Cast</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                {characters &&
                  characters &&
                  characters
                    .slice(0, 12)
                    .map(({ character, role, voice_actors }) => (
                      <AnimeCharacterCard
                        characterName={character.name}
                        characterImage={character.images.jpg.image_url}
                        characterRole={role}
                        voiceActor={voice_actors}
                        key={character.name}
                      ></AnimeCharacterCard>
                    ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
