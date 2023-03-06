import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { updateUserProfile } from 'api/profile/Api';
import QueryKey from '../react-key';
import useDisabledStore from 'store/myPageFormStore';
import sliderStore from 'store/sliderStore';

type PatchUserInfo = {
  nickname: string;
  avatarUrl?: string;
  bio?: string;
};

export const useUpdateProfile = (): UseMutateFunction<
  void,
  unknown,
  PatchUserInfo,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setUpdateCheckerSlider, setFormSlider } = sliderStore();

  const { setDisabledAll } = useDisabledStore();
  const { mutate } = useMutation({
    mutationFn: ({ nickname, avatarUrl, bio }: PatchUserInfo) =>
      updateUserProfile(nickname, 'avatars/' + avatarUrl, bio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getLoginedUser] });
      setUpdateCheckerSlider(true); //업데이트 하고 슬라이더 애니메이션 켜준다
      setFormSlider(false); //업데이트하고 업데이트 여부 묻는 슬라이더 꺼준다
      setDisabledAll(); //업데이트하고 input disabled로 만든다
      setTimeout(() => {
        //일정 시간 후 슬라이더 애니메이션을 꺼준다
        setUpdateCheckerSlider(false);
      }, 2000);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return mutate;
};
