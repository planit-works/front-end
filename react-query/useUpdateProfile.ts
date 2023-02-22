import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { updateUserProfile } from 'api/profile/Api';
import useErrorStore from 'store/useErrorStore';
import QueryKey from './key';
import useDisabledStore from 'store/useDisabledStore';

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
  const { setErrorUpdateChecker, setErrorSlider } = useErrorStore();
  const { setDisabledAll } = useDisabledStore();
  const { mutate } = useMutation({
    mutationFn: ({ nickname, AvatarUrl, Bio }: PatchUserInfo) =>
      updateUserProfile(nickname, AvatarUrl, Bio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getLoginedUser] });
      setErrorUpdateChecker(true);
      setErrorSlider(false);
      setDisabledAll();
      setTimeout(() => {
        setErrorUpdateChecker(false);
      }, 2000);
    },
  });

  return mutate;
};
