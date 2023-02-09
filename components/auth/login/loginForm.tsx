import { loginUser } from 'api/auth/Api';
import { useForm } from 'react-hook-form';
import { LoginFormField } from 'types/auth';
import { AuthInfo } from 'types/auth';
import { useRouter } from 'next/router';
import AuthSubmitBtn from 'components/auth/authSubmitBtn';
import { useState } from 'react';

export default function LoginForm() {
  const [disableBtn, setDisable] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormField>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const handleLogin = async (authInfo: AuthInfo) => {
    setDisable(true);
    await loginUser(authInfo);
    router.push('/');
  };

  const handleError = (error: Error) => {
    setDisable(false);
    alert(error.message);
  };

  const onValid = async (fieldValues: LoginFormField) => {
    try {
      const authInfo: AuthInfo = {
        email: fieldValues.email,
        password: fieldValues.password,
      };
      await handleLogin(authInfo);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          className="animate-intro block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
          placeholder="Email을 입력해 주세요"
          {...register('email', {
            required: 'Email을 입력해 주세요',
          })}
        />
        <input
          type="password"
          className="animate-intro block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
          placeholder="Password를 입력해 주세요"
          {...register('password', {
            required: 'Password를 입력해 주세요',
          })}
        />

        <AuthSubmitBtn btnName="Login" disable={disableBtn} />
      </form>
    </div>
  );
}
