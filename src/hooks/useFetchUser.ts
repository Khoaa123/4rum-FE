import { useEffect, useState } from "react";

const fetchUser = async (userId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Account/GetUser?userId=${userId}`
  );
  const data = await res.json();
  return data.data;
};

const useFetchUser = (userId: string) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const getUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUser(userId);
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  return { user, loading, error };
};

export default useFetchUser;
