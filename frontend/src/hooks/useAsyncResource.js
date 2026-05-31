import { useEffect, useState } from 'react';

export function useAsyncResource(load, dependencies = []) {
  const [state, setState] = useState({ data: null, error: null, status: 'loading' });

  useEffect(() => {
    let isMounted = true;

    setState((current) => ({ ...current, error: null, status: 'loading' }));

    load()
      .then((data) => {
        if (isMounted) {
          setState({ data, error: null, status: 'success' });
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({ data: null, error, status: 'error' });
        }
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}
