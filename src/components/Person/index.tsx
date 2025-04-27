import { HtmlHTMLAttributes } from "react";
import Image from "next/image";

import { IPeopleCast } from "@/@types";
import styles from './styles.module.scss';


type Props = HtmlHTMLAttributes<HTMLElement> & {
  direction?: 'row' | 'column';
  person: IPeopleCast
}


export function Person({person, direction = 'column', ...rest}: Props) {

  
  const avatar = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
  
  const imageSrc = person.profile_path 
  ? `https://image.tmdb.org/t/p/w92${person.profile_path}` 
  : avatar;



  return (
    <figure
      className={styles.container}
      style={{ flexDirection: direction, width: direction === 'row' ? 'fit-content': 110 }}
      {...rest}
    >
      <div className={styles.photo}>
        <Image
          width={70}
          height={70}
          src={imageSrc}
          alt={person.name}
          unoptimized
        />
      </div>

      <div className={styles.wrapperName}>
        <span className={styles.name}>
          {person.name}
        </span>
        <span className={styles.nameCharacter}>
          {person.job ? person.job : person.character}
        </span>
      </div>
    </figure>
  );
}