import { useController, Control } from 'react-hook-form';
import { LoginFormField } from 'types/Auth';

export const InputEmail = ({
  control,
}: {
  control: Control<LoginFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'email',
  });

  return (
    <input
      type="text"
      onChange={field.onChange}
      className="animate-intro block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
      placeholder="Email을 입력해 주세요"
    />
  );
};

export const InputPwd = ({ control }: { control: Control<LoginFormField> }) => {
  const { field } = useController({
    control,
    name: 'password',
  });

  return (
    <input
      type="password"
      onChange={field.onChange}
      className="animate-intro block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
      placeholder="PassWord를 입력해 주세요"
    />
  );
};
