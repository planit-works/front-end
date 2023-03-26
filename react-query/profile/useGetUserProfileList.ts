import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserProfileList } from 'api/profile/Api';
import QueryKey from '../react-key';

export const useGetUserProfileList = (id: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [QueryKey.getUserProfileList, id],
    queryFn: async ({ pageParam = 1 }) => getUserProfileList(id, pageParam),
    getNextPageParam: (lastpage) => {
      if (lastpage.paginationInfo.hasNextPage)
        return lastpage.paginationInfo.currentPage + 1;
      else return undefined;
    },
    enabled: id === '' ? false : true,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    retry: false,
    onError: (error: Error) => {
      console.log(error.message);
    },
    onSuccess: (data) => {
      console.log(data.pages.map((data) => data.profiles));
    },
  });

  return {
    userProfileDatas: data?.pages,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
};
