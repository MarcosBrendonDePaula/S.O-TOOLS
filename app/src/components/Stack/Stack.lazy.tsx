import React, { lazy, Suspense } from 'react';

const LazyStack = lazy(() => import('./Stack'));

const Stack = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyStack {...props} />
  </Suspense>
);

export default Stack;
