import { useState } from 'react';

export type UseCustomStateReturnType<T> = [T, (value: T) => void];

export const useCustomState = <T>(
  initialState: T
): UseCustomStateReturnType<T> => {
  const [state, setState] = useState<T>(initialState);

  const updateState = (value: T) => {
    setState(value);
  };

  return [state, updateState];
};
