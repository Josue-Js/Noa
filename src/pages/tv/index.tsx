import { GetServerSideProps } from "next";

import { Navbar } from "@/components/Nabar";
import { Section } from "@/components/Section";

import { api } from "@/services/api";
import { ITvShow } from "@/@types";
import styles from "@/styles/pages/TvShow.module.scss";


type Props = {
  tvShowList: {
    title: string;
    items: ITvShow[]
  }[];
}


export default function Tv({ tvShowList }: Props) {
  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.sections}>
          {tvShowList.map(list => (
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

  const { data: trending } = await api.get('/trending/tv/week')
  const { data: reality } = await api.get('/discover/tv?with_genres=10764')
  const { data: action } = await api.get('/discover/tv?with_genres=10759')
  const { data: news } = await api.get('/discover/tv?with_genres=10763')
  const { data: animation } = await api.get('/discover/tv?with_genres=16')
  const { data: comedy } = await api.get('/discover/tv?with_genres=35')
  const { data: documentary } = await api.get('/discover/tv?with_genres=99')
  const { data: drama } = await api.get('/discover/tv?with_genres=18')

  return {
    props: {
      tvShowList: [
        {
          title: 'trending',
          items: trending.results
        },
        {
          title: 'action',
          items: action.results
        },
        {
          title: 'animation',
          items: animation.results
        },
        {
          title: 'reality',
          items: reality.results
        },
        {
          title: 'comedy',
          items: comedy.results
        },
        {
          title: 'drama',
          items: drama.results
        },
        {
          title: 'documentary',
          items: documentary.results
        },
        {
          title: 'news',
          items: news.results
        },
      ]
    }
  }
}