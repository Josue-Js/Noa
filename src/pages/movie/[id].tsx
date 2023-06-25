import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';
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
import { convertMinutesToHours } from "@/utils/convertMinutesToHours";
import { IMovieDetails } from "@/@types";

import styles from '@/styles/pages/Media.module.scss';


type Props = {
  movie: IMovieDetails
}


export default function Movie({ movie }: Props) {

  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [personId, setPersonId] = useState<number>();


  function toggleIsOpenTeam() {
    setIsOpenTeam(!isOpenTeam);
  }

  function toggleIsOpenTrailer() {
    setIsOpenTrailer(!isOpenTrailer);
  }

  function toggleIsOpenGallery() {
    setIsOpenGallery(!isOpenGallery);
  }

  function handleClickPerson(id: number) {
    setPersonId(id);
    toggleIsOpenTeam();
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>{`${movie.title} - Noa`}</title>
      </Head>
      <div className={styles.backdrop}>
        <figure className={styles.image}>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie.title}
            fill
            priority
          />
        </figure>
        <div className={styles.gradient} />
      </div>

      <div className={styles.content}>
        <Navbar />

        <div className={styles.wrapperContent}>
          <div className={styles.info}>
            <h1 className={styles.title}>
              {movie.title}
            </h1>

            <div className={styles.facts}>
              <div className={styles.rated}>
                <Star color="#FABC2B" weight="fill" />
                <span>
                  {movie.vote_average.toFixed(1)}| {movie.vote_count}
                </span>
              </div>
              <span className={styles.durationTime}>
                {convertMinutesToHours(movie.runtime)}
              </span>
              <span className={styles.year}>
                {movie.release_date.split('-')[0]}
              </span>
              <span className={styles.genres}>
                {movie.genres.map(genre => (
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
              {movie.overview}
            </p>
          </div>
        </div>

        <div className={styles.cast}>
          <h2>
            Elenco
          </h2>

          <div className={styles.peoples}>
            {movie.credits.cast.slice(0, 3).map(person => (
              <Person
                key={person.id}
                person={person}
                onClick={() => handleClickPerson(person.id)}
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
            listItems={movie.similar.results}
            style={{ padding: 0 }}
          />
        </div>

        <div className={styles.social}>
          <span className={styles.line} />
          <div className={styles.icons}>
            <Link
              href={`https://www.facebook.com/${movie.external_ids.facebook_id}`}
              target="_blank"
            >
              <FacebookLogo color="#fff" weight="fill" size={24} />
            </Link>
            <Link
              href={`https://www.instagram.com/${movie.external_ids.instagram_id}`}
              target="_blank"
            >
              <InstagramLogo color="#fff" weight="fill" size={24} />
            </Link>

            <Link
              href={`https://www.twitter.com/${movie.external_ids.twitter_id}`}
              target="_blank"
            >
              <TwitterLogo color="#fff" weight="fill" size={24} />
            </Link>

          </div>
        </div>
      </div>

      <Trailer
        embedId={movie.videos.results[movie.videos.results.length - 1]?.key}
        isOpen={isOpenTrailer}
        onRequestClose={toggleIsOpenTrailer}
      />
      <Team
        team={movie.credits}
        isOpen={isOpenTeam}
        onRequestClose={toggleIsOpenTeam}
        idSelected={personId}
      />

      <Gallery
        title={movie.title}
        images={movie.images}
        isOpen={isOpenGallery}
        onRequestClose={toggleIsOpenGallery}
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
    const response: AxiosResponse | AxiosError = await api.get(`/movie/${params.id}`, {
      params: {
        append_to_response: 'videos,images,external_ids,credits,similar'
      }
    }).catch(error => error);


    const isMediaNotExists = response instanceof AxiosError

    if (!isMediaNotExists) {
      return {
        props: {
          movie: response.data
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