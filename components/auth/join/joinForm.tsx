// eslint-disable-next-line import/no-extraneous-dependencies
import { createUser } from 'api/auth/Api';
import { useForm } from 'react-hook-form';
import { AuthInfo, UserData } from 'types/auth';
import { EmailErrMsg, PwdCheckErrMsg, PwdErrMsg } from '../FormErrMsg';
import { JoinFormField } from 'types/auth';
import AuthSubmitBtn from 'components/auth/AuthSubmitBtn';
import Router from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from 'react-query/key';
import useErrorStore from 'store/useErrorStore';
import { InputEmailJoin, InputPwdCheckJoin, InputPwdJoin } from './InputJoin';

export default function JoinForm() {
  const {
    control,
    getFieldState,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<JoinFormField>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      pwdCheck: '',
    },
  });

  const queryClient = useQueryClient();
  const { setError: SetError } = useErrorStore();

  type CheckPwd = {
    password: string;
    pwdCheck: string;
  };

  const handlePwd = (pwdValues: CheckPwd) => {
    if (pwdValues.password !== pwdValues.pwdCheck) {
      throw new Error('pwdCheck');
    }
  };

  const handleJoin = async (authInfo: AuthInfo) => {
    const profile = (await createUser(authInfo)) as UserData;
    alert('회원가입이 완료되었습니다');
    Router.push('join/profile');
    queryClient.setQueryData([QueryKey.getLoginedUser], profile);
    SetError(false);
  };

  const handleError = (errorType: string) => {
    if (errorType === 'pwdCheck') {
      setError(`${errorType}`, { type: `${errorType}` }, { shouldFocus: true });
    } else {
      alert(errorType);
    }
  };

  const onValid = async (fieldValues: JoinFormField) => {
    try {
      handlePwd({
        password: fieldValues.password,
        pwdCheck: fieldValues.pwdCheck,
      });
      const authInfo: AuthInfo = {
        email: fieldValues.email,
        password: fieldValues.password,
      };

      await handleJoin(authInfo);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error.message);
      }
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center w-3/4 relative bottom-[4rem] ">
      <form onSubmit={handleSubmit(onValid)}>
        <InputEmailJoin control={control} />
        <EmailErrMsg
          error={errors}
          checkDirty={getFieldState('email').isDirty}
        />

        <InputPwdJoin control={control} />
        <PwdErrMsg
          error={errors}
          checkDirty={getFieldState('password').isDirty}
        />

        <InputPwdCheckJoin control={control} />
        <PwdCheckErrMsg
          error={errors}
          checkDirty={getFieldState('pwdCheck').isDirty}
        />

        <AuthSubmitBtn btnName="Join" disable={false} />
      </form>
    </div>
  );
}
