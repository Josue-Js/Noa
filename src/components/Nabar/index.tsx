import React, { FocusEvent, FormEventHandler, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlass } from 'phosphor-react';

import styles from './styles.module.scss';
import axios from 'axios';
import { ITrendingList } from '@/@types';
import { useRouter } from 'next/router';



export function Navbar() {

  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null);
  const [isOpenMenuOnMobile, setIsOpenMenuOnMobile] = useState(false);
  const [isOpenSearchOnMobile, setIsOpenSearchOnMobile] = useState(false);
  const [results, setResults] = useState<ITrendingList>([]);
  const [isScrolling, setIsScrolling] = useState(false);




  useEffect(() => {
    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset;
      if (offset >= 10) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    });
  }, []);


  function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push(`/search?query=${ref.current?.value}`)
    setIsOpenSearchOnMobile(false);
    ref.current?.blur()
  }

  function handleOpenSearch() {
    setIsOpenSearchOnMobile(true);
  }

  async function handleSearch() {
    const query = ref.current?.value;

    if (query && query.length >= 3) {
      const { data } = await axios.get('/api/search', {
        params: {
          query: query
        }
      });
      setResults(data.slice(0, 6))
    }

  }

  function handleBlur(event: FocusEvent<HTMLInputElement, Element>) {
    setTimeout(() => {
      setIsOpenSearchOnMobile(() => false)
    }, 300)
  }

  function handleFocus(event: FocusEvent<HTMLInputElement, Element>) {
    setIsOpenSearchOnMobile(true)
  }


  return (
    <nav className={`${styles.navbar} ${isScrolling ? styles.isScrolling : ''}`}>
      <div className={`${styles.navbarWrapper} ${isOpenMenuOnMobile ? styles.active : ''}`}>
        <Link href='/'>
          <h2 className={styles.logo}>
            <Image
              src='/icon.png'
              width={32}
              height={32}
              alt='icon'
              unoptimized
            />
            oa
          </h2>
        </Link>


        <div className={styles.searchWrapper}>
          <form className={styles.field} onSubmit={handlerSubmit}>
            <div className={`${styles.inputWrapper} ${isOpenSearchOnMobile ? styles.active : ''}`}>
              <input
                ref={ref}
                type="search"
                className={styles.input}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleSearch}
                placeholder="Search.."
              />
              {results.length > 0 && isOpenSearchOnMobile && (
                <div className={styles.searchTray}>
                  <ul className={styles.searchResults}>
                    {results.map(media => (
                      <Link
                        key={media.id}
                        href={`/${media.media_type === "movie" ? "movie" : "tv"}/${media.id}`}
                      >
                        <li className={styles.row} >
                          <span>
                            <MagnifyingGlass size={14} color="#FFF" />
                          </span>
                          <p>
                            {media.media_type === 'movie'
                              ? media.title
                              : media.name}
                          </p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              className={styles.btnSc}
              type='button'
              onClick={handleOpenSearch}
            >
              <MagnifyingGlass size={24} color="#FFF" />
            </button>
          </form>
        </div>


        <div className={styles.navMenu}>
          <button
            type='button'
            className={styles.iconMenu}
            onClick={() => setIsOpenMenuOnMobile(!isOpenMenuOnMobile)}
          >
            <span />
            <span />
          </button>

          <ul className={`${styles.navLinkWrapper} ${isOpenMenuOnMobile ? styles.active : ''}`}>
            <li className={styles.navLink}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.navLink}>
              <Link href="/movie">Movies</Link>
            </li>
            <li className={styles.navLink}>
              <Link href="/tv">Tv Shows</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}