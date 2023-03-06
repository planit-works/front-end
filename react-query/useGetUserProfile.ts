import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import followingStore from 'store/followingStore';
import { MyInfo } from 'types/MyInfo';
import { getMyProfile } from '../api/profile/Api';
import QueryKey from './key';

export const useGetUserProfile = (): UseMutateAsyncFunction<
  MyInfo,
  unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setIsFollowing, setFollower } = followingStore();
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => getMyProfile(id),
    onError: () => {},

    onSuccess: (data) => {
      queryClient.removeQueries([QueryKey.getUserProfile]);
      queryClient.setQueryData([QueryKey.getUserProfile], data);

      setIsFollowing(data.isFollowing);
      setFollower(data.followerCount);
    },
  });

  return mutateAsync;
};
