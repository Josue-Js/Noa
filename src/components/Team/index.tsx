import { MouseEvent, useEffect, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';
import Axios from 'axios';

import { Person } from '../Person';
import { Profile } from './Profile';

import { ICredits, IPeopleDetail } from '@/@types';
import styles from './styles.module.scss';

type ITeam = ICredits

type Props = {
  team: ITeam
  isOpen: boolean;
  onRequestClose: () => void;
  idSelected?: number;
}


export function Team({ isOpen, onRequestClose, team, idSelected }: Props) {


  const [personIdSelected, setPersonIdSelected] = useState<number>();
  const [person, setPerson] = useState<IPeopleDetail>();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    if (!personIdSelected) return

    (async () => {
      const { data } = await Axios.get(`/api/person/${personIdSelected}`);
      setPerson(data);
      setIsLoading(false);
    })();
  }, [personIdSelected]);



  useEffect(() => {
    if (!idSelected) return

    handleClickPerson(idSelected);
  }, [idSelected]);


  function handleClickOutWrapper(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onRequestClose()
    }
  }

  function handleRequestClose() {
    if (isOpenProfile) {
      setIsOpenProfile(false)
    } else {
      setIsOpenProfile(true)
      onRequestClose()
    }
  }

  function handleClickPerson(personId: number) {
    if (personId != personIdSelected) {
      setIsLoading(true);
      setIsOpenProfile(true)
      setPersonIdSelected(personId)
    } else {
      setIsOpenProfile(true)
    }

  }



  return (
    <>
      {isOpen && (
        <div className={styles.container} onClick={handleClickOutWrapper}>
          <div className={styles.wrapper}>

            <header>
              <ArrowLeft color='#fff' weight='fill' onClick={handleRequestClose} />
            </header>

            {isOpenProfile && !isLoading && person ? (
              <Profile
                onRequestClose={onRequestClose}
                setIsOpenProfile={setIsOpenProfile}
                person={person}
              />
            ) : (
              <div className={styles.sections}>
                <section className={styles.cast}>
                  <h1 className={styles.title}>Elenco</h1>
                  <div>
                    {team.cast.map(person => (
                      <Person
                        key={person.id}
                        person={person}
                        direction='row'
                        onClick={() => handleClickPerson(person.id)}
                      />
                    ))}
                  </div>
                </section>

                <section className={styles.crew}>
                  <h1 className={styles.title}>
                    Equipe técnica
                  </h1>
                  <div>
                    {team.crew.map(person => (
                      <Person
                        key={`${person.id} - ${person.job}`}
                        person={person}
                        direction='row'
                        onClick={() => handleClickPerson(person.id)}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      )
      }
    </>
  );
}