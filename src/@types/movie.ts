import { ICredits } from "./credits";
import { IImage } from "./image";
import { IVideo } from "./video";


export type IMovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string
  };
  budget: number;
  genres: {
    id: number;
    name: string
  }[]
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
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
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string
  }[]
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: IVideo[]
  };
  images: {
    backdrops: IImage[];
    logos: IImage[]
    posters: IImage[]
  };
  external_ids: {
    imdb_id: string;
    wikidata_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string
  };
  credits: ICredits;
  similar: {
    page: number,
    results: IMovie[]
  }
} 

export type IMovieList = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: 'movie';
  genre_ids: Array<number>;
  popularity: number;
  release_date: string;
  video: boolean;
  videos: IVideo[]
  vote_average: number;
  vote_count: number;
}


export type IMovie = {
  adult: boolean,
  backdrop_path: string,
  id: number,
  title: string,
  original_language: string
  original_title: string,
  overview: string,
  poster_path: string,
  genre_ids: Array<number>,
  popularity: number,
  release_date?: string,
  video: boolean,
  vote_average: number,
  vote_count: number

  name?: string;
  original_name?: string;
}