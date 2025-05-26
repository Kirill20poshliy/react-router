import { useState, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

export const useFetch = <T>(fetchFn: () => Promise<AxiosResponse<T>>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const response = await fetchFn();
                setData(response.data);
            } catch (error) {
                setIsError(true);
                if (error instanceof AxiosError) {
                    console.error('Axios error:', error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [fetchFn]);

    return { isLoading, isError, data };
};