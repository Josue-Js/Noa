import { HTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';


type Props = HTMLAttributes<HTMLButtonElement> & {
  title?: string;
  icon?: ReactNode;
  color?: string;
}


export function Button({ title, icon, color, ...rest }: Props) {
  return (
    <button
      className={styles.container}
      style={{ background: color ? color : 'white'}}
      {...rest}
    >
      {icon && icon}
      <span className={styles.title}>{title}</span>
    </button>
  );
}