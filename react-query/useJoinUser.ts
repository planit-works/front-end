import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { createUser } from 'api/auth/Api';
import useErrorStore from 'store/useErrorStore';
import { AuthInfo } from 'types/auth';

export const useJoinUser = (): UseMutateFunction<
  void,
  unknown,
  AuthInfo,
  unknown
> => {
  const { setError } = useErrorStore();
  const { mutate } = useMutation({
    mutationFn: (authInfo: AuthInfo) => createUser(authInfo),
    onSuccess: (profile) => {
      setError(false);
    },
  });

  return mutate;
};
