import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { DownloadSimple, X } from 'phosphor-react';

import { IMovieDetails } from '@/@types';
import styles from './styles.module.scss';


type Props = {
  title: string;
  images: IMovieDetails['images'];
  isOpen: boolean;
  onRequestClose: () => void;
}


export function Gallery({ isOpen, images, title, onRequestClose }: Props) {

  const ref = useRef<HTMLCanvasElement>(null);
  const allImages = [...images.backdrops, ...images.posters].sort((a, b) => b.vote_average - a.vote_average);


  useEffect(() => {
    if (isOpen) {
      window.document.body.classList.add('modalOpen')
    } else {
      window.document.body.classList.remove('modalOpen')
    }
  }, [isOpen])


  async function download(file_path: string) {

    if (!ref.current) return;
    
    const url = `https://image.tmdb.org/t/p/original${file_path}`;
    const ctx = ref.current?.getContext('2d');
    const a = document.createElement('a');
    const image = new window.Image();

    image.crossOrigin = 'anonymous';
    image.addEventListener('load', function () {
      console.log('load')
      ref.current!.width = image.width;
      ref.current!.height = image.height;
      ctx?.drawImage(image, 0, 0);

      a.download = `${title}.jpg`;
      a.href = ref.current!.toDataURL();
      a.click();
    });
    image.src = url
  }



  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <canvas ref={ref} style={{ display: 'none' }} />
          <header className={styles.header}>
            <span onClick={onRequestClose}>
              <X size={24} color='#fff' weight='fill' />
            </span>

            <h2>Gallery</h2>

            <span />
          </header>
          <div className={styles.wrapper}>
            {allImages.map(image => (
              <div
                key={image.file_path}
                className={styles.image}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                  width={300}
                  height={Math.floor(image.aspect_ratio) == 0 ? 450 : 210}
                  alt='poster'
                  unoptimized
                />

                <div className={styles.display}>
                  <button
                    type='button'
                    onClick={(e) => download(image.file_path)}
                  >
                    <DownloadSimple
                      color='#fff'
                      weight='fill'
                      size={32}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>

  );
}