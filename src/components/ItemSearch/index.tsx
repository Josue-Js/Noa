import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns'

import { ITrendingList } from '@/@types';
import styles from './styles.module.scss';


type Props = {
  media: ITrendingList[number]
}


export function ItemSearch({ media }: Props) {

  const mediaType = media.media_type == 'tv';

  let date: string | undefined;
  const dateRelease = mediaType ? media.first_air_date : media.release_date;

  if (dateRelease) {
    const [year, month, day] = dateRelease.split('-').map(i => parseInt(i));
    date = format(new Date(year, month, day), 'MMM-dd-yyyy')
      .replaceAll('-', ' ');
  }



  return (
    <div className={styles.container}>

      <figure className={styles.poster}>
        <Link
          href={`${mediaType ? '/tv' : 'movie'}/${media.id}`}
        >
          <Image
            src={media.poster_path
              ? `https://image.tmdb.org/t/p/w300/${media.poster_path}`
              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
            }
            alt='red'
            fill
          />
        </Link>

      </figure>

      <div className={styles.info}>
        <Link
          href={`${mediaType ? '/tv' : 'movie'}/${media.id}`}
        >
          <h4 className={styles.title}>
            {media.media_type === 'movie' ? media.title : media.name}
          </h4>
        </Link>
        <span className={styles.date}>
          {date}
        </span>
        <p className={styles.overview}>
          {media.overview}
        </p>
      </div>
    </div>
  );
}