import { loginUser } from 'api/auth/Api';
import { useForm } from 'react-hook-form';
import { LoginFormField } from 'types/auth';
import { AuthInfo } from 'types/auth';
import { useRouter } from 'next/router';
import AuthSubmitBtn from 'components/auth/AuthSubmitBtn';
import { useState } from 'react';
import { InputEmail, InputPwd } from './InputLogin';
import AuthBtnTemplate from '../AuthBtnTemplate';

export default function LoginForm() {
  const [disableBtn, setDisable] = useState(false);
  const { handleSubmit, control } = useForm<LoginFormField>({
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
    <div className="animate-intro">
      <form onSubmit={handleSubmit(onValid)}>
        <InputEmail control={control} />
        <InputPwd control={control} />

        <AuthSubmitBtn btnName="Login" disable={disableBtn} />
      </form>
      <AuthBtnTemplate />
    </div>
  );
}
