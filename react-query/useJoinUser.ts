import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createUser } from 'api/auth/Api';
import useErrorStore from 'store/useErrorStore';
import { AuthInfo } from 'types/auth';
import QueryKey from './react-key';
import Router from 'next/router';

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
    onSuccess: (profile) => {
      setError(false);
    },
  });

  return mutate;
};
