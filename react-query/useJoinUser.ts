import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createUser } from 'api/auth/Api';
import useErrorStore from 'store/useErrorStore';
import { AuthInfo } from 'types/auth';
import QueryKey from './react-key';

export const useJoinUser = (): UseMutateFunction<
  void,
  unknown,
  AuthInfo,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setError } = useErrorStore();
  const { mutate } = useMutation({
    mutationFn: (authInfo: AuthInfo) => createUser(authInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getLoginedUser] });
      setError(false);
    },
  });

  return mutate;
};
