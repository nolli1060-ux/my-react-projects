import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: ctrl.signal });

        if (!response.ok) {
          throw new Error(`Could not load dishes (HTTP ${response.status}).`);
        }

        const result = await response.json();
        setData(result);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Could not load dishes.");
        }
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => ctrl.abort();
  }, [url]);

  return { data, loading, error };
}
