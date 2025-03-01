import { useState, useEffect } from "react";
import handleFetchError from "../utils/handleFetchError";

export const useFetchData = <T,>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`);
        if (!response.ok) {
          throw new Error(handleFetchError(response.status));
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
};
