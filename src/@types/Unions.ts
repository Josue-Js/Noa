import { IMovie, IMovieList } from "./movie";
import {  ITvShow, ITvShowList } from "./tvShow";



export type IHomeList = {
  title: string;
  items: Array<IMovie | ITvShow>;
};
export type ITrendingList = Array<IMovieList | ITvShowList>;



