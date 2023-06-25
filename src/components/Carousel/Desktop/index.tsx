import { useState } from 'react';
import Link from 'next/link';
import { X, Play } from 'phosphor-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Youtube from 'react-youtube';

import { Button } from '@/components/Button';

import { ITrendingList } from '@/@types';
import styles from './styles.module.scss';


type Props = {
  data: ITrendingList;
  currentIndex: number;
  setIndex: (index: number) => void;
  onOpenTrailer: (value: boolean) => void;
}


export function CarouselDesktop({ data, currentIndex, setIndex, onOpenTrailer }: Props) {

  const media = data[currentIndex];
  const image = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${media.backdrop_path}`;

  const [trailerIsOpen, setTrailerIsOpen] = useState(false);
  const mediaType = media.media_type === 'movie'
  const opts = {
    width: '100%',
    height: '551px',
    playerVars: {
      showinfo: 0,
      autoplay: 1,
    },
  };


  function openTrailer() {
    setTrailerIsOpen(true);
    onOpenTrailer(true);
  }

  function closeTrailer() {
    setTrailerIsOpen(false);
    onOpenTrailer(false);
  }



  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AnimatePresence>
          <motion.figure
            key={media.id}
            className={styles.backdrop}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={image}
              fill
              draggable={false}
              alt={mediaType ? media.title : media.name}
            />
          </motion.figure>
        </AnimatePresence>

        <div className={styles.linearGradient} />

        <motion.div
          className={styles.content}
          key={media.id}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4, }}
        >
          <div className={styles.info}>
            <Link href={`${mediaType ? 'movie' : 'tv'}/${media.id}`}>
              <h1 className={styles.title}>
                {mediaType ? media.title : media.name}
              </h1>
            </Link>
            <div className={styles.wrapperOverview}>
              <p className={styles.overview}>
                {media.overview}
              </p>
            </div>

          </div>


          <div className={styles.wrapperButton}>
            <Button
              title='Watch trailer'
              color='#9747FF'
              icon={<Play size={24} color='#fff' weight='fill' />}
              onClick={openTrailer}
            />
          </div>
        </motion.div>
        
        <div className={styles.selectIndex}>
          <span className={styles.line} />
          <ul className={styles.wrapperIndexs}>
            {[...new Array(6)].map((_, index) => (
              <motion.li
                key={index}
                className={`${styles.index} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setIndex(index)}
              >
                <AnimatePresence>
                  {index === currentIndex && (
                    <motion.span
                      className={styles.fill}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />
                  )}
                </AnimatePresence>

              </motion.li>
            ))}
          </ul>
          <span className={styles.line} />
        </div>

        {trailerIsOpen && (
          <div
            className={styles.wrapperTrailer}
          >
            <span className={styles.close} onClick={closeTrailer}>
              <X color='#fff' weight='bold' size={24} />
            </span>
            <Youtube
              videoId={media.videos[media.videos.length - 1].key}
              opts={opts}
            />
          </div>
        )}
      </div>
    </div>
  );
}