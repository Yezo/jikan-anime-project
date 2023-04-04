export interface IMultiAnime {
  pagination: Pagination
  data: Datum[]
}

export interface Datum {
  mal_id: number
  url: string
  images: Image
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: null | string
  title_japanese: string
  title_synonyms: string[]
  type: DatumType
  source: string
  episodes: number | null
  status: Status
  airing: boolean
  aired: Aired
  duration: Duration
  rating: null | string
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number
  members: number
  favorites: number
  synopsis: null | string
  background: null | string
  season: Season
  year: number
  broadcast: Broadcast
  producers: Demographic[]
  licensors: Demographic[]
  studios: Demographic[]
  genres: Demographic[]
  explicit_genres: any[]
  themes: Demographic[]
  demographics: Demographic[]
}

export interface Aired {
  from: Date
  to: null
  prop: Prop
  string: string
}

export interface Prop {
  from: From
  to: From
}

export interface From {
  day: number | null
  month: number | null
  year: number | null
}

export interface Broadcast {
  day: string
  time: string
  timezone: Timezone
  string: string
}

export enum Timezone {
  AsiaTokyo = "Asia/Tokyo",
}

export interface Demographic {
  mal_id: number
  type: DemographicType
  name: string
  url: string
}

export enum DemographicType {
  Anime = "anime",
}

export enum Duration {
  The23Min = "23 min",
  The23MinPerEp = "23 min per ep",
  Unknown = "Unknown",
}

export interface Image {
  jpg: Images
  webp: Images
}

export enum Season {
  Spring = "spring",
}

export enum Status {
  CurrentlyAiring = "Currently Airing",
  NotYetAired = "Not yet aired",
}

export interface Title {
  type: TitleType
  title: string
}

export enum TitleType {
  Default = "Default",
  English = "English",
  Japanese = "Japanese",
  Synonym = "Synonym",
}

export interface Trailer {
  youtube_id: null | string
  url: null | string
  embed_url: null | string
  images: Images
}

export interface Images {
  image_url: null | string
  small_image_url: null | string
  medium_image_url: null | string
  large_image_url: null | string
  maximum_image_url: null | string
}

export enum DatumType {
  Tv = "TV",
}

export interface Pagination {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: Items
}

export interface Items {
  count: number
  total: number
  per_page: number
}
