import { useMutation } from '@tanstack/react-query';
import followingStore from 'store/followingStore';
import { unfollowUser } from '../api/profile/Api';

export const useUnFollowUser = () => {
  const { UnFollow } = followingStore();
  const mutation = useMutation({
    mutationFn: (id: number) => unfollowUser(id),

    onError: () => {},

    onSuccess: () => {
      UnFollow();
    },
  });

  return mutation;
};
