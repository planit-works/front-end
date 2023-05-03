import { useMutation, useQueryClient } from '@tanstack/react-query';
import followingStore from 'store/followingStore';
import { getProfile } from '../../api/profile/Api';
import QueryKey from '../react-key';

export const useGetUserProfile = () => {
  const queryClient = useQueryClient();
  const { setIsFollowing, setFollower } = followingStore();
  const useGetUserProfile = useMutation({
    mutationFn: (id: number) => getProfile(id),
    onError: () => {},

    onSuccess: (data) => {
      queryClient.removeQueries([QueryKey.getUserProfile]);
      queryClient.setQueryData([QueryKey.getUserProfile], data);

      setIsFollowing(data.isFollowing);
      setFollower(data.followerCount);
    },
  });

  return useGetUserProfile;
};
