// eslint-disable-next-line import/no-extraneous-dependencies
import { createUser } from 'api/Api';
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

export default function JoinForm() {
  const {
    register,
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
    const userData: UserData = await createUser(authInfo);
    alert('회원가입이 완료되었습니다');
    Router.push(
      {
        pathname: 'join/profile',
        query: { avatarUrl: userData.avatarUrl },
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
        <input
          type="text"
          className="animate-intro block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
          placeholder="Email을 입력해 주세요"
          {...register('email', {
            required: 'Email을 입력해 주세요',
            validate: {
              matchPattern: (value) =>
                /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value),
              checkLength: (value) => value.length >= 10 && value.length <= 40,
            },
          })}
        />

        <JoinEmailErrMsg
          error={errors}
          checkDirty={getFieldState('email').isDirty}
        />

        <input
          type="password"
          className="animate-intro block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
          placeholder="Password를 입력해 주세요"
          {...register('password', {
            required: 'Password를 입력해 주세요',
            validate: {
              matchPattern: (value) =>
                /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$@$!%*?&]).{3,}$/.test(value),
              checkLength: (value) => value.length >= 8 && value.length <= 16,
            },
          })}
        />
        <JoinPwdErrMsg
          error={errors}
          checkDirty={getFieldState('password').isDirty}
        />

        <input
          type="password"
          className="animate-intro block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
          placeholder="Password를 다시 한 번 입력해 주세요"
          {...register('pwdCheck', {
            required: 'Password를 다시 한 번 입력해 주세요',
          })}
        />
        <JoinPwdCheckErrMsg
          error={errors}
          checkDirty={getFieldState('pwdCheck').isDirty}
        />

        <AuthSubmitBtn btnName="Join" disable={false} />
      </form>
    </div>
  );
}
