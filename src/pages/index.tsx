import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { Carousel } from '@/components/Carousel';
import { Navbar } from '@/components/Nabar';
import { Section } from '@/components/Section';

import { api } from '@/services/api';
import { IHomeList, ITrendingList } from '@/@types';
import styles from '@/styles/pages/Home.module.scss';


type Props = {
  data: {
    trending: ITrendingList,
    homeList: IHomeList[]
  }
}



export default function Home({ data }: Props) {

  const [trending, setTrending] = useState<ITrendingList>([])
  const [homeList, setHomeList] = useState<IHomeList[]>([])

  useEffect(() => {
    setTrending(data.trending)
    setHomeList(data.homeList)
  }, []);



  return (
    <div className={styles.container}>

      <Navbar />

      <Head>
        <title>Noa</title>
      </Head>
      <main className={styles.main}>

        {trending && <Carousel data={trending} />}

        <div className={styles.sections}>

          {homeList?.map(list => (
            <Section
              key={list.title}
              title={list.title}
              listItems={list.items}
            />
          ))}
        </div>
      </main>
    </div>
  )
}



export const getStaticProps: GetStaticProps = async () => {

  const { data: trending } = await api.get('/trending/all/week');
  const { data: upcoming } = await api.get('/movie/upcoming');
  const { data: popular } = await api.get('/movie/popular');
  const { data: action } = await api.get('/discover/movie?with_genres=28');
  const { data: adventure } = await api.get('/discover/movie?with_genres=12');
  const { data: animation } = await api.get('/discover/movie?with_genres=16');
  const { data: comedy } = await api.get('/discover/movie?with_genres=35');
  const { data: romance } = await api.get('/discover/movie?with_genres=10749');
  const trendingPart: ITrendingList = trending.results.slice(0, 6);

  const trendingList = await Promise.all(trendingPart.map(async (media) => {
    
    const mediaType = media.media_type === 'movie' ? 'movie' : 'tv';
    const { data } = await api.get(`/${mediaType}/${media.id}/videos`);
    const videos = data.results;

    return {
      ...media,
      videos: videos,
    }
  }));
  
  return {
    props: {
      data: {
        trending: trendingList,
        homeList: [
          {
            title: 'upcoming',
            items: upcoming.results
          },
          {
            title: 'popular',
            items: popular.results
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
        ]
      }
    },
    revalidate: 60 * 60 * 24
  }
}