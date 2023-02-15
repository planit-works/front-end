import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'api/query-key';

import { verifyLogin } from './Api';

export const useGetLoginedUser = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [queryKey.getLoginedUser],
    queryFn: verifyLogin,
    staleTime: 500 * 20,
    retry: 0,
  });

  return {
    profile: data,
    isError,
    isLoading,
  };
};
