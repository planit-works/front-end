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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getLoginedUser] });
      console.log(data);
      setErrorUpdateChecker(true);
      setErrorSlider(false); //업데이트하고 업데이트 여부 묻는 슬라이더 꺼준다
      setDisabledAll(); //업데이트하고 input disabled로 만든다
      setTimeout(() => {
        //업데이트하고 슬라이더 애니메이션을 꺼준다
        setErrorUpdateChecker(false);
      }, 2000);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return mutate;
};
