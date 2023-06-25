import { CSSProperties, HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useMotionValueEvent} from 'framer-motion';

import { Card } from '@/components/Card';

import { IHomeList } from '@/@types';
import styles from './styles.module.scss';


type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  title: string,
  listItems: IHomeList['items'];
  cardStyle?: CSSProperties
  card?: HtmlHTMLAttributes<HTMLDivElement>
}


export function Section({ title, listItems, card, ...rest }: Props) {

  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderMaxLimit, setSliderMaxLimit] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();


  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', () => {});
  }, []);


  useMotionValueEvent(x, "change", async (latest) => {
    if (latest < -sliderMaxLimit) {
      await controls.start({x: -sliderMaxLimit, transition: {duration: 0.7}});
    } else if (latest > 0){
      await controls.start({x: 0, transition: {duration: 0.7}});
    }
  });


  function onResize() {
    if (ref.current) {
      const widthWrapperSwiperSlider = ref.current.parentElement?.clientWidth || 0
      const swiperSlider = ref.current.clientWidth;
      setSliderMaxLimit(swiperSlider - widthWrapperSwiperSlider);
    }
  }

  function toggleDrag() {
    if(isMouseDown) {
      setIsDragging(!isDragging);
    }
  }

  function handleMouseDown() {
    setIsMouseDown(true)
  }

  function handleMouseUp() {
    setIsMouseDown(false)
  }


  return (
    <section
      {...rest}
      className={styles.container}
    >
      <h1 className={styles.title}>
        {title}
      </h1>

      <motion.div
        className={styles.wrapperSwiperSlider}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          ref={ref}
          className={styles.swiperSlider}
          drag='x'
          animate={controls}
          style={{ x }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          dragConstraints={{ right: 0, left: -sliderMaxLimit }}
          onDragStart={toggleDrag}
          onDragEnd={toggleDrag}
          onMouseLeave={toggleDrag}
        >
          {listItems.map(item => (
            <Card
              {...card}
              key={item.id}
              media={item}
              style={{
                pointerEvents: isDragging ? 'none' : 'initial', ...card?.style
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}