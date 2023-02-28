import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import useErrorStore from 'store/useErrorStore';
import { MyInfo } from 'types/MyInfo';
import { getMyProfile } from '../api/profile/Api';
import QueryKey from './key';

export const useGetUserProfile = (): UseMutateAsyncFunction<
  MyInfo,
  unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => getMyProfile(id),
    onError: () => {},

    onSuccess: (data) => {
      queryClient.removeQueries([QueryKey.getUserProfile]);
      queryClient.setQueryData([QueryKey.getUserProfile], data);
    },
  });

  return mutateAsync;
};
