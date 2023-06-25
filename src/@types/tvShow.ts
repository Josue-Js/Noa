import { ICredits } from "./credits";
import { IImage } from "./image";
import { IVideo } from "./video";

export type ITvShowDetails = {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number
    profile_path: string
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: false;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string
  };
  name: string;
  next_episode_to_air: null | number;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string
  }[]
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string;
    name: string
  }[]
  seasons: {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
  }[];
  spoken_languages: {
    english_name: string,
    iso_639_1: string,
    name: string
  }[]
  status: string,
  tagline: string,
  type: string,
  vote_average: number,
	vote_count: number,
  videos: {
    results: IVideo[]
  },
  images: {
    backdrops: IImage[];
    logos: IImage[];
    posters: IImage[];
  }
  external_ids: {
		imdb_id: string,
		freebase_mid: string,
		freebase_id: string | null,
		tvdb_id: number,
		tvrage_id: number,
		wikidata_id: string | null,
		facebook_id: string
		instagram_id: string,
		twitter_id: string
	};
  credits: ICredits;
  similar: {
    page: number;
    results: ITvShow[]
  }
}




export type ITvShowList = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: 'tv';
  genre_ids: Array<number>;
  popularity: number;
  first_air_date: string;
  videos: IVideo[]
  vote_average: number;
  vote_count: number;
  origin_country: Array<string>;
}

export type ITvShow = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  genre_ids: Array<number>;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: Array<string>;

  title?: string;
  original_title?: string;
}