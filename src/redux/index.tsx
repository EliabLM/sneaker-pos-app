import React, { useRef } from 'react';
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import globalReducer from './slices/globalSlice';

// REDUX STORE
export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      globalReducer,
    },
  });
};

// REDUX TYPES
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// PROVIDER
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
