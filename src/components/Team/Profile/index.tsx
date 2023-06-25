import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { FacebookLogo, InstagramLogo, TwitterLogo } from 'phosphor-react';

import { Section } from '@/components/Section';

import styles from './styles.module.scss';
import { IPeopleDetail } from '@/@types';


type Props = {
  person: IPeopleDetail;
  onRequestClose: () => void;
  setIsOpenProfile: Dispatch<SetStateAction<boolean>>;
}


export function Profile({ person, onRequestClose, setIsOpenProfile }: Props) {

  function handleClickCard(){
    setIsOpenProfile(false);
    onRequestClose();
  }

  
  return (
    <div className={styles.container}>
      <section>
        <figure className={styles.photo}>
          <Image
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            fill
          />
        </figure>

        <h2 className={styles.name}>
          {person.name}
        </h2>

        <div className={styles.social}>
          <Link href='https://facebook.com' target='_blank'>
              <FacebookLogo color="#fff" weight="fill" size={24} />
          </Link>
          <Link href='https://instagram.com' target='_blank'>
            <InstagramLogo color="#fff" weight="fill" size={24} />
          </Link>
          <Link href='https://twitter.com' target='_blank'>
            <TwitterLogo color="#fff" weight="fill" size={24} />
          </Link>
        </div>

        <div className={styles.info}>
          <h2>Person info</h2>
          <div className={styles.knowCredit}>
            <h4>Known credit</h4>
            <p>{person.movie_credits.cast.length}</p>
          </div>
          <div className={styles.grander}>
            <h4>Grander</h4>
            <p>{person.gender === 2 ? 'male' : 'female'}</p>
          </div>
          <div className={styles.birthday}>
            <h4>birthday</h4>
            <p>{person.birthday}</p>
          </div>
          <div className={styles.placeBirth}>
            <h4>place birth</h4>
            <p>{person.place_of_birth}</p>
          </div>
        </div>

        <div className={styles.biography}>
          <h4>Biography</h4>
          <p>
            {person.biography}
          </p>
        </div>

        <div className={styles.knowFor}>
          <Section
            title='know for'
            listItems={person.movie_credits.cast}
            style={{ padding: 0 }}
            card={{onClick: handleClickCard}}
          />
        </div>
      </section>
    </div>
  );
}