import { useQuery } from '@tanstack/react-query';
import useErrorStore from 'store/useErrorStore';
import { verifyLogin } from '../api/auth/Api';
import QueryKey from './react-key';

export const useGetLoginedUser = (enable: boolean = true) => {
  const { setError } = useErrorStore();
  const { data, refetch, isError, isLoading } = useQuery({
    queryKey: [QueryKey.getLoginedUser],
    queryFn: verifyLogin,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    retry: false,
    enabled: enable,
    onError: () => {
      setError(true);
    },
    onSuccess: () => {
      setError(false);
    },
  });

  return {
    userInfo: data,
    userId: data?.userId as number,
    verifyErr: isError,
    isLoading,
    refetch,
  };
};
