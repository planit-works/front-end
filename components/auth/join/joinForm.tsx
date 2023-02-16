// eslint-disable-next-line import/no-extraneous-dependencies
import { createUser } from 'api/auth/Api';
import { useForm } from 'react-hook-form';
import { AuthInfo, UserData } from 'types/auth';
import {
  JoinEmailErrMsg,
  JoinPwdCheckErrMsg,
  JoinPwdErrMsg,
} from './joinErrMsg';
import { JoinFormField } from '../../../types/auth';
import AuthSubmitBtn from 'components/auth/authSubmitBtn';
import Router from 'next/router';
import userStore from 'store/userStore';
import {
  InputEmailJoin,
  InputPwdCheckJoin,
  InputPwdJoin,
} from 'components/inputText';

export default function JoinForm() {
  const {
    register,
    control,
    getFieldState,
    handleSubmit,
    setError,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<JoinFormField>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      pwdCheck: '',
    },
  });
  const { setProfile } = userStore();

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
    const { profile } = (await createUser(authInfo)) as UserData;
    alert('회원가입이 완료되었습니다');
    setProfile(profile);
    Router.push(
      {
        pathname: 'join/profile',
        query: {
          nickname: profile.nickname,
          avatarUrl: profile.avatarUrl,
        },
      },
      'join/profile',
    );
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
        <JoinEmailErrMsg
          error={errors}
          checkDirty={getFieldState('email').isDirty}
        />

        <InputPwdJoin control={control} />
        <JoinPwdErrMsg
          error={errors}
          checkDirty={getFieldState('password').isDirty}
        />

        <InputPwdCheckJoin control={control} />
        <JoinPwdCheckErrMsg
          error={errors}
          checkDirty={getFieldState('pwdCheck').isDirty}
        />

        <AuthSubmitBtn btnName="Join" disable={false} />
      </form>
    </div>
  );
}
