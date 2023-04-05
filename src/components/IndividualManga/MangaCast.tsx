import { ISingleCharacter } from "../../interfaces/manga/ISingleCharacter"
import { MangaCharacterCard } from "./MangaCharacterCard"

export const MangaCast = ({ characters }: { characters: ISingleCharacter | undefined }) => {
  const length = characters && characters.data.length

  return (
    <>
      {length === 0 ? (
        <div className="flex w-full flex-col gap-1 ">
          <h3 className="font-bold text-titleTEXT">Characters</h3>
          <p className="rounded bg-white p-5 text-[0.85rem] leading-6 text-normalTEXT shadow-sm ring-1 ring-titleTEXT/10">
            A cast of characters could not be found for this manga.
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1 ">
          {characters && (
            <>
              <h3 className="font-bold text-titleTEXT">Characters</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                {characters &&
                  characters.data &&
                  characters.data
                    .slice(0, 12)
                    .map(({ character, role }) => (
                      <MangaCharacterCard
                        characterName={character.name}
                        characterImage={character.images.jpg.image_url}
                        characterRole={role}
                        key={character.name}
                      ></MangaCharacterCard>
                    ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
