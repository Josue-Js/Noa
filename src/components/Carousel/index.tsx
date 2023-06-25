import { useEffect, useState } from 'react';

import { CarouselDesktop } from './Desktop';
import { CarouselMobile } from './Mobile';

import styles from './styles.module.scss';
import { ITrendingList } from '@/@types';



type Props = {
  data: ITrendingList;
}

let timer: NodeJS.Timeout;

export function Carousel({ data }: Props) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSize()
    window.addEventListener('resize', getSize);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    timer = setTimer();
    return () => clearTimeout(timer);
  }, [currentIndex, data]);



  function setTimer() {
    return setTimeout(() => {
      const nextIndex = currentIndex + 1;
      const hasNextIndex = nextIndex < data.length;
      setCurrentIndex(hasNextIndex ? nextIndex : 0);
    }, 7000);
  }

  function stopTimer() {
    clearTimeout(timer)
  }

  function handlerOpenTrailer(isOpen: boolean) {
    if (isOpen) {
      stopTimer()
    } else {
      timer = setTimer();
    }
  }

  function getSize() {
    const screenWidth = window.document.body.clientWidth;

    if (screenWidth >= 768) {
      setIsMobile(false)
    } else if (screenWidth < 768) {
      setIsMobile(true)
    }
  }

  function setIndex(index: number) {
    setCurrentIndex(index);
  }


  return (
    <div className={styles.carouselSwiperSlider}>
      <h1 className={styles.title}>
        Top high
      </h1>
      {!isLoading && (
        <>
          {isMobile ? (
            <CarouselMobile
              data={data}
              currentIndex={currentIndex}
              setIndex={setIndex}
            />
          ) : (
            <CarouselDesktop
              data={data}
              currentIndex={currentIndex}
              setIndex={setIndex}
              onOpenTrailer={handlerOpenTrailer}
            />
          )}
        </>
      )}
    </div>
  );
}