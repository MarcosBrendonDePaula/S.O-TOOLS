import React, { lazy, Suspense } from 'react';

const LazyMemoria = lazy(() => import('./Memoria'));

interface MemoriaProps {
  size:number
}

const Memoria: React.FC<MemoriaProps> = (props) => (
  <Suspense fallback={null}>
    <LazyMemoria size={props.size}/>
  </Suspense>
);

export default Memoria;
