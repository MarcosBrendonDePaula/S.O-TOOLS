import React, { FC } from 'react';
import styles from './Bit.module.css';

interface BitProps {
  color:number[],
  name:string
}

const Bit: FC<BitProps> = ({ name = "", color = [0, 0, 0, 0.5] }) => {
  const rgbaColor = `rgba(${color.join(", ")})`;
  return <div className={styles.Bit} style={{ backgroundColor: rgbaColor }}></div>;
};

export default Bit;
