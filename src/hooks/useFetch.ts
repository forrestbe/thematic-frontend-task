import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';
import { fetchWithToken } from '../utils/fetchWithToken';

interface UseFetchHook<T> {
  data: T | undefined;
  isLoading: boolean;
  error: any;
}

const useFetch = <T>(url: string): UseFetchHook<T> => {
  const [token, setToken] = useState<string>('');
  const { getAccessTokenSilently }  = useAuth0();
  const { data, error, isLoading } = useSWR<T>(token ? [url, token] : null, ([url, token]: string[]) => fetchWithToken(url, token));

  useEffect(() => {
    let isSubscribed = true;

    const getToken = async () => {
      const token = await getAccessTokenSilently();

      if (isSubscribed) {
        setToken(token);
      }
    };

    getToken();

    return () => {
      isSubscribed = false;
    }
  }, [getAccessTokenSilently, setToken]);

  return { data, error, isLoading };
}

export { useFetch };