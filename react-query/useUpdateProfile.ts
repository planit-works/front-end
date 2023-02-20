import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { updateUserProfile } from 'api/profile/Api';
import useErrorStore from 'store/useErrorStore';
import QueryKey from './key';

type PatchUserInfo = {
  nickname: string;
  AvatarUrl?: string;
  Bio?: string;
};

export const useUpdateProfile = (): UseMutateFunction<
  void,
  unknown,
  PatchUserInfo,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setErrorUpdateChecker } = useErrorStore();
  const { mutate } = useMutation({
    mutationFn: ({ nickname, AvatarUrl, Bio }: PatchUserInfo) =>
      updateUserProfile(nickname, AvatarUrl, Bio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getLoginedUser] });
      setErrorUpdateChecker(true);
      setTimeout(() => {
        setErrorUpdateChecker(false);
      }, 2000);
    },
  });

  return mutate;
};
