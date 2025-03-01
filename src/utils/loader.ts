import handleFetchError from "./handleFetchError";

export const fetchData = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`);
  if (!response.ok) handleFetchError(response.status);
  const data: T = await response.json();
  return data;
};
