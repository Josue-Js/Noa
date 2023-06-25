import { X } from 'phosphor-react';
import { MouseEvent } from 'react';

import styles from './styles.module.scss';


type Props = {
  embedId: string;
  isOpen: boolean;
  onRequestClose: () => void;
}


export function Trailer({embedId, isOpen, onRequestClose }: Props) {

  function handleClickOutTrailer(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onRequestClose()
    }
  }



  return (
    <>
      {isOpen && (
        <div className={styles.container} onClick={handleClickOutTrailer}>


          <div className={styles.wrapperTrailer}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${embedId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <span className={styles.close} onClick={onRequestClose}>
              <X color='#fff' weight='fill' size={24} />
            </span>
          </div>
        </div>
      )}
    </>
  );
}