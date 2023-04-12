import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import followingStore from 'store/followingStore';
import { MyProfileInfo } from 'types/MyInfo';
import { getProfile } from '../../api/profile/Api';
import QueryKey from '../react-key';

export const useGetUserProfile = (): UseMutateAsyncFunction<
  MyProfileInfo,
  unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setIsFollowing, setFollower } = followingStore();
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => getProfile(id),
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
