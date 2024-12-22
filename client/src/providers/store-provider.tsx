'use client';

import {ReactNode, useRef} from 'react';
import {Provider} from 'react-redux';
import {AppStore, makeStore} from '../lib/store';
// import { initializeCount } from "../lib/features/counter/counterSlice"; //if needed initialize the store with data from the parent component

export default function StoreProvider({
    //count, //if needed initialize the store with data from the parent component
    children
  }: {
    children: ReactNode;
  }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(initializeCount(count)); //if needed initialize the store with data from the parent component
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
