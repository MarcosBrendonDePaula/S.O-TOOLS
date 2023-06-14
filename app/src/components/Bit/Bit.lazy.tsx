import React, { lazy, Suspense } from 'react';

const LazyBit = lazy(() => import('./Bit'));

interface BitProps {
  color: number[];
  name: string;
}

const Bit: React.FC<BitProps> = (props) => (
  <Suspense fallback={null}>
    <LazyBit color={props.color} name={props.name} />
  </Suspense>
);

export default Bit;
