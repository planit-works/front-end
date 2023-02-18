import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createUser, updateUserProfile } from 'api/auth/Api';
import useErrorStore from 'store/useErrorStore';
import { AuthInfo } from 'types/auth';
import QueryKey from './key';

type PatchUserInfo = {
  nickName: string;
  AvatarUrl?: string;
};

export const useUpdateProfile = (): UseMutateFunction<
  void,
  unknown,
  PatchUserInfo,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ nickName, AvatarUrl }: PatchUserInfo) =>
      updateUserProfile(nickName, AvatarUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getLoginedUser] });
      alert('Update Success!');
    },
  });

  return mutate;
};
