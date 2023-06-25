import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

import styles from './styles.module.scss';
import { IHomeList } from '@/@types';


type Props = HTMLAttributes<HTMLDivElement> & {
  media: IHomeList['items'][0];
  active?: boolean;
}


export function Card({ media, active = false, ...rest }: Props) {

  const mediaType = media.title ? 'movie' : 'tv'
  const assets = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;


  return (
    <div
      className={`${styles.container} ${active ? styles.active : ''}`}
      {...rest}
    >
      <Link
        href={`/${mediaType === 'movie' ? 'movie' : 'tv'}/${media.id}`}
        draggable={false}
      >
        <figure className={styles.wrapperImage} >
          <Image
            src={media.poster_path ? `https://image.tmdb.org/t/p/w300${media.poster_path}` : assets}
            sizes='(max-width: 300px) 100vw, (max-width: 600px) 50vw, 33vw'
            alt={(mediaType === 'movie' ? media.title : media.name) as string}
            fill
            draggable={false}
          />
        </figure>
      </Link>
    </div>
  );
}