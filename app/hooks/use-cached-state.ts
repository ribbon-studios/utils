import { DependencyList, Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useCachedState<T>(supplier: () => T, deps: DependencyList): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => supplier());

  useEffect(() => setValue(() => supplier()), deps);

  return [value, setValue];
}

export function useReadOnlyCachedState<T>(supplier: () => T, deps: DependencyList): T {
  const [value] = useCachedState(supplier, deps);

  return value;
}
