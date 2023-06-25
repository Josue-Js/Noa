import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { motion, MotionProps, useAnimation, useMotionValue } from 'framer-motion';

import { Card } from '@/components/Card';

import styles from './styles.module.scss';
import { ITrendingList } from '@/@types';


type Props = HTMLAttributes<HTMLDivElement> & MotionProps & {
  data: ITrendingList;
  currentIndex: number;
  setIndex: (index: number) => void;
}


export function CarouselMobile({ data, currentIndex, setIndex, ...rest }: Props) {

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [widthCarousel, setWidthCarousel] = useState(0);
  const [startCarousel, setStartCarousel] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);



  useEffect(() => {
    function getWidth() {
      if (ref.current) {
        const widthCarouselSwiperSlider = ref.current.parentElement?.clientWidth || 0

        const swiperSlider = ref.current.clientWidth;
        const cardSize = (widthCarouselSwiperSlider * 40) / 100;
        const initialCarousel = (widthCarouselSwiperSlider / 2) - (cardSize / 2);

        setCardWidth(cardSize);
        setStartCarousel(initialCarousel);
        setWidthCarousel(swiperSlider - widthCarouselSwiperSlider + (cardSize - 16));
        setPosition();
      }
    }
    getWidth()
    window.addEventListener('resize', getWidth)
  }, [startCarousel]);

  useEffect(() => {
    if (cardWidth === 0 || !isDragging) {
      return
    }

    return x.on('change', (lastValue) => {

      let index = Math.floor(
        (lastValue - startCarousel) / cardWidth
      ) * -1

      if (index >= 0 && index <= (data.length - 1)) {
        setIndex(index)
      }
    });
  }, [cardWidth, startCarousel, isDragging])

  useEffect(() => {
    if (!isDragging) {
      setPosition()
    }
  }, [currentIndex])


  function setPosition() {
    const space = currentIndex * 16;
    const position = ((currentIndex * cardWidth) + space) - startCarousel;
    controls.start({ x: -position, transition: { duration: 0.7 } });
  }

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
    setPosition();
  }



  return (
    <div
      className={styles.container}
      {...rest}
    >
      <motion.div
        ref={ref}
        className={styles.swiperSlider}
        drag='x'
        dragConstraints={{ right: startCarousel, left: -widthCarousel }}
        animate={controls}
        style={{ x }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {data.map((item, index) => (
          <Card
            key={item.id}
            media={item}
            style={{
              width: '40vw',
              height: '60vw',
              pointerEvents: isDragging ? 'none' : 'initial'
            }}

            active={currentIndex === index}
          />
        ))}
      </motion.div>


      <div className={styles.selectIndexs}>
        <ul className={styles.wrapperIndexs}>
          {data.map((_, index) => (
            <li
              key={index}
              className={`${styles.index} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => setIndex(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}


