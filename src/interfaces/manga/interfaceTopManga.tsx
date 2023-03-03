export interface Jpg {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Webp {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Images {
  jpg: Jpg
  webp: Webp
}

export interface Title {
  type: string
  title: string
}

export interface From {
  day: number
  month: number
  year: number
}

export interface To {
  day?: number
  month?: number
  year?: number
}

export interface Prop {
  from: From
  to: To
}

export interface Published {
  from: Date
  to?: Date
  prop: Prop
  string: string
}

export interface Author {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Serialization {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Theme {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Demographic {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface RootObject {
  mal_id: number
  url: string
  images: Images
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  chapters?: number
  volumes?: number
  status: string
  publishing: boolean
  published: Published
  score: number
  scored: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  authors: Author[]
  serializations: Serialization[]
  genres: Genre[]
  explicit_genres: any[]
  themes: Theme[]
  demographics: Demographic[]
}
