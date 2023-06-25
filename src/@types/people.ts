import { ICast, ICrew } from "./credits";
import { IMovie } from "./movie";

enum Grander {
  female = 1,
  male = 2
}

export type IPeopleCast = ICrew | ICast

export type IPeople = {
  adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: string | undefined;
	gender: number;
	homepage: string | undefined;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
}



export type IPeopleDetail = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: Grander;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
   movie_credits: {
    cast: IMovie[];
    crew: IMovie[];
   }
   external_ids: {
    freebase_mid: string | null;
    freebase_id: string | null;
    imdb_id: string | null;
    tvrage_id: string | null;
    wikidata_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    tiktok_id: string | null;
    twitter_id: string | null;
    youtube_id: string | null
  }
}