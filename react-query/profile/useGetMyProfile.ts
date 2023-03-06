import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import useErrorStore from 'store/useErrorStore';
import { MyInfo } from 'types/MyInfo';
import { getProfile } from '../../api/profile/Api';
import QueryKey from '../react-key';

export const useGetMyProfile = (): UseMutateAsyncFunction<
  MyInfo,
  unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setError } = useErrorStore();
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => getProfile(id),
    onError: () => {
      setError(true);
    },

    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.getMyProfile], data);
    },
  });

  return mutateAsync;
};
