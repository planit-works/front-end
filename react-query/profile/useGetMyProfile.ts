import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import myProfileInfoStore from 'store/myProfileInfoStore';
import useErrorStore from 'store/useErrorStore';
import { MyProfileInfo } from 'types/MyInfo';
import { getProfile } from '../../api/profile/Api';
import QueryKey from '../react-key';

export const useGetMyProfile = (): UseMutationResult<
  MyProfileInfo,
  unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setErrorLogined } = useErrorStore();
  const { setMyProfileAllAtOnce } = myProfileInfoStore();
  const mutateGetProfile = useMutation({
    mutationFn: (id: number) => getProfile(id),
    onError: () => {
      setErrorLogined(true);
    },

    onSuccess: (data) => {
      queryClient.removeQueries([QueryKey.getMyProfile]);
      queryClient.removeQueries([QueryKey.getMyProfile]);
      queryClient.setQueryData([QueryKey.getMyProfile], data);
      setMyProfileAllAtOnce(data);
    },
  });

  return mutateGetProfile;
};
