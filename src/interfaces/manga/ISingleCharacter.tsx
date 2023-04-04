export interface ISingleCharacter {
  data: Datum[]
}

export interface Datum {
  character: Character
  role: Role
}

export interface Character {
  mal_id: number
  url: string
  images: Images
  name: string
}

export interface Images {
  jpg: Jpg
  webp: Webp
}

export interface Jpg {
  image_url: string
}

export interface Webp {
  image_url: string
  small_image_url: string
}

export enum Role {
  Main = "Main",
  Supporting = "Supporting",
}
