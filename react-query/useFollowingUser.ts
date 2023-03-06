import { useMutation, useQueryClient } from '@tanstack/react-query';
import followingStore from 'store/followingStore';
import { MyInfo } from 'types/MyInfo';
import { followUser } from '../api/profile/Api';
import QueryKey from './key';
import { useGetUserProfile } from './useGetUserProfile';

export const useFollowingUser = () => {
  const queryClient = useQueryClient();
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
