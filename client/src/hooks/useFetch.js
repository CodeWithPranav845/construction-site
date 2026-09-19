import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/helpers.js';

/**
 * Runs an async function and tracks { data, loading, error }.
 *
 *   const { data, loading, error, refetch } = useFetch(() => getServices({ page }), [page]);
 *
 * It re-runs whenever a value in `deps` changes, and ignores results from
 * outdated requests (e.g. when the user clicks filters quickly).
 */
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { data, loading, error, refetch };
}
