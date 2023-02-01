import { loginUser } from 'api/Api';
import { useForm } from 'react-hook-form';
import { LoginFormField } from 'types/auth';
import { AuthInfo } from 'types/auth';
import { useRouter } from 'next/router';
import AushSubmitBtn from 'components/authSubmitBtn';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormField>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onValid = async (fieldValues: LoginFormField) => {
    try {
      const authInfo: AuthInfo = {
        email: fieldValues.email,
        password: fieldValues.password,
      };

      await loginUser(authInfo);
      router.push('/');
    } catch (err) {
      alert('아이디 혹은 비밀번호를 다시 확인해 주세요');
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center w-1/2 relative bottom-[4rem] ">
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
        <AushSubmitBtn btnName="Login" />
      </form>
    </div>
  );
}
