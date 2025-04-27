import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { AxiosError, AxiosResponse } from "axios";
import { Star, FacebookLogo, InstagramLogo, TwitterLogo, Play, ImageSquare } from 'phosphor-react';

import { Navbar } from "@/components/Nabar";
import { Button } from "@/components/Button";
import { Person } from "@/components/Person";
import { Section } from "@/components/Section";
import { Team } from "@/components/Team";
import { Trailer } from "@/components/Trailer";
import { Gallery } from "@/components/Gallery";

import { api } from "@/services/api";
import { ITvShowDetails } from "@/@types";
import styles from '@/styles/pages/Media.module.scss';


type Props = {
  tvShow: ITvShowDetails
}


export default function TvShow({ tvShow }: Props) {

  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [isOpenGallery, setIsOpenGallery] = useState(false);


  function toggleIsOpenTeam() {
    setIsOpenTeam(!isOpenTeam);
  }

  function toggleIsOpenTrailer() {
    setIsOpenTrailer(!isOpenTrailer);
  }

  function toggleIsOpenGallery() {
    setIsOpenGallery(!isOpenGallery);
  }



  return (
    <div className={styles.container}>

      <div className={styles.backdrop}>
        <figure className={styles.image}>
          <Image
            src={`https://image.tmdb.org/t/p/original${tvShow?.backdrop_path}`}
            alt={tvShow.name}
            fill
            unoptimized
          />
        </figure>
        <div className={styles.gradient} />
      </div>

      <div className={styles.content}>
        <Navbar />

        <div className={styles.wrapperContent}>
          <div className={styles.info}>
            <h1 className={styles.title}>
              {tvShow.name}
            </h1>

            <div className={styles.facts}>
              <div className={styles.rated}>
                <Star color="#FABC2B" weight="fill" />
                <span>
                  {tvShow.vote_average.toFixed(1)}| {tvShow.vote_count}
                </span>
              </div>
              <span className={styles.durationTime}>
                {tvShow.seasons.length} seasons
              </span>
              <span className={styles.year}>
                {tvShow.first_air_date.split('-')[0]}
              </span>
              <span className={styles.genres}>
                {tvShow.genres.map(genre => (
                  <span key={genre.id}>
                    {genre.name},
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className={styles.buttons}>
            <Button
              color="#9747FF"
              title="Watch Trailer"
              icon={<Play color="#fff" weight="fill" size={24} />}
              onClick={toggleIsOpenTrailer}
            />
            <Button
              color="#1B1934"
              title="Gallery"
              icon={<ImageSquare color="#fff" weight="fill" size={24} />}
              onClick={toggleIsOpenGallery}
            />
          </div>

          <div className={styles.overview}>
            <p>
              {tvShow.overview}
            </p>
          </div>
        </div>

        <div className={styles.cast}>
          <h2>Elenco</h2>

          <div className={styles.peoples}>
            {tvShow.credits.cast.slice(0, 3).map(person => (
              <Person
                key={person.id}
                person={person}
              />
            ))}

            <button
              type="button"
              className={styles.viewAll}
              onClick={toggleIsOpenTeam}
            >
              View All
            </button>
          </div>
        </div>

        <div className={styles.recommendation}>
          <Section
            title="Recomendação"
            listItems={tvShow.similar.results}
            style={{ padding: 0 }}
          />
        </div>

        <div className={styles.social}>
          <span className={styles.line} />
          <div className={styles.icons}>
            <Link
              target="_blank"
              href={`https://www.facebook.com/${tvShow.external_ids.facebook_id}`}>
              <FacebookLogo color="#fff" weight="fill" size={24} />
            </Link>

            <Link
              target="_blank"
              href={`https://www.instagram.com/${tvShow.external_ids.instagram_id}`}
            >
              <InstagramLogo color="#fff" weight="fill" size={24} />
            </Link>
            <Link
              target="_blank"
              href={`https://www.twitter.com/${tvShow.external_ids.twitter_id}`}
            >
              <TwitterLogo color="#fff" weight="fill" size={24} />
            </Link>
          </div>
        </div>
      </div>

      <Trailer
        embedId={tvShow.videos.results[0]?.key}
        isOpen={isOpenTrailer}
        onRequestClose={toggleIsOpenTrailer}
      />
      <Team
        isOpen={isOpenTeam}
        onRequestClose={toggleIsOpenTeam}
        team={tvShow.credits}
      />

      <Gallery
        title={tvShow.name}
        isOpen={isOpenGallery}
        onRequestClose={toggleIsOpenGallery}
        images={tvShow.images}
      />
    </div>
  )
}




export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: 'blocking',
    paths: []
  }
}


export const getStaticProps: GetStaticProps = async (context) => {

  const params = context.params;

  if (params && params.id) {
    const response: AxiosResponse | AxiosError = await api.get(`/tv/${params.id}`, {
      params: {
        append_to_response: 'videos,images,external_ids,credits,similar'
      }
    }).catch(error => error);


    const isMeditExists = response instanceof AxiosError;

    if (!isMeditExists) {
      return {
        props: {
          tvShow: response.data
        },
        revalidate: 60 * 60 * 48
      }

    }
  }

  return {
    redirect: {
      permanent: true,
      destination: '/'
    },
  }
}