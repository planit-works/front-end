import { useQuery } from '@tanstack/react-query';
import useErrorStore from 'store/useErrorStore';
import { Profile } from 'types/auth';
import { verifyLogin } from '../api/auth/Api';
import QueryKey from './key';

export const useGetLoginedUser = (enable: boolean = true) => {
  const { setError } = useErrorStore();
  const { data, refetch, isError, isLoading } = useQuery({
    queryKey: [QueryKey.getLoginedUser],
    queryFn: verifyLogin,
    staleTime: 500 * 20,
    retry: false,
    enabled: enable,
    onError: () => {
      setError(true);
    },
    onSuccess: (data) => {
      setError(false);
    },
  });

  return {
    profile: data as Profile,
    verifyErr: isError,
    isLoading,
    refetch,
  };
};
