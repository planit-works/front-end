import { useMutation } from '@tanstack/react-query';
import followingStore from 'store/followingStore';
import { followUser } from '../../api/profile/Api';

export const useFollowingUser = () => {
  const { Following } = followingStore();
  const mutation = useMutation({
    mutationFn: (id: number) => followUser(id),

    onError: () => {},

    onSuccess: () => {
      Following();
    },
  });

  return mutation;
};
