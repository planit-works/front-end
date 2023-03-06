import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from 'api/profile/Api';
import useErrorStore from 'store/useErrorStore';
import QueryKey from '../react-key';

export const useGetUserProfileList = (id: string) => {
  const { data, refetch, isError, isLoading } = useQuery({
    queryKey: [QueryKey.getUserProfileList, id],
    queryFn: async () => {
      try {
        const data = await getUserProfile(id);

        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw Error('sd');
        }
      }
    },
    enabled: id === '' ? false : true,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    retry: false,
    onError: (error: Error) => {
      console.log(error.message);
    },
    onSuccess: (data) => {},
  });

  return {
    userProfileDatas: data,
    isError,
    isLoading,
    refetch,
  };
};
