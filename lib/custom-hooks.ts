import { useEffect, useState } from 'react';

//https://codesandbox.io/s/o472n0qjlz?from-embed
export function useFetch(url) {
  const [data, setDataState] = useState(null);
  const [loading, setLoadingState] = useState(true);
  useEffect(() => {
    setLoadingState(true);
    fetch(url)
      .then(j => j.json())
      .then(data => {
        setDataState(data);
        setLoadingState(false);
      });
  }, [url]);
  return { data, loading };
}
