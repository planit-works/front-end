import { useForm } from 'react-hook-form';
import { AuthInfo } from 'types/auth';
import { EmailErrMsg, PwdCheckErrMsg, PwdErrMsg } from '../FormErrMsg';
import { JoinFormField } from 'types/auth';
import AuthSubmitBtn from 'components/auth/AuthSubmitBtn';
import Router from 'next/router';
import { InputEmailJoin, InputPwdCheckJoin, InputPwdJoin } from './InputJoin';
import { useJoinUser } from 'react-query/useJoinUser';
import AuthBtnTemplate from '../AuthBtnTemplate';

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

  const joinUSer = useJoinUser();

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
    joinUSer(authInfo);
    alert('회원가입이 완료되었습니다');
    Router.push('join/profile');
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
    <div className="animate-intro">
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
      <AuthBtnTemplate />
    </div>
  );
}
