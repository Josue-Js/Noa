import { Navbar } from "@/components/Nabar";
import { Section } from "@/components/Section";
import styles from "@/styles/pages/Movie.module.scss";

import { Carousel } from "@/components/Carousel";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/services/api";
import { IHomeList } from "@/@types";


type Props = {
  movieList: IHomeList[];
}



export default function Movie({ movieList }: Props) {





  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.sections}>
          {movieList.map(list => (
            <Section
              key={list.title}
              title={list.title}
              listItems={list.items}
            />
          ))}
        </div>
      </main>
    </div>
  );
}





export const getServerSideProps: GetServerSideProps = async (context) => {

  const { data: trending } = await api.get('/movie/upcoming')
  const { data: popular } = await api.get('/movie/popular')
  const { data: action } = await api.get('/discover/movie?with_genres=28')
  const { data: adventure } = await api.get('/discover/movie?with_genres=12')
  const { data: animation } = await api.get('/discover/movie?with_genres=16')
  const { data: comedy } = await api.get('/discover/movie?with_genres=35')
  const { data: documentary } = await api.get('/discover/movie?with_genres=99')
  const { data: romance } = await api.get('/discover/movie?with_genres=10749')

  return {
    props: {
      movieList: [
        {
          title: 'trending',
          items: trending.results
        },
        {
          title: 'action',
          items: action.results
        },
        {
          title: 'adventure',
          items: adventure.results
        },
        {
          title: 'animation',
          items: animation.results
        },
        {
          title: 'comedy',
          items: comedy.results
        },
        {
          title: 'romance',
          items: romance.results
        },
        {
          title: 'documentary',
          items: documentary.results
        },
        {
          title: 'popular',
          items: popular.results
        },
      ]
    }
  }
}