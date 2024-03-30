import { useEffect, useState } from "react";
import { makeRequest } from "../axiosSetup.tsx";

export type Tags = {
  name: string;
  count: number;
};

const useFetch = (url: string) => {
  const [data, setData] = useState<Tags[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(url);
        setData(res.data.items);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
