import { useController, Control } from 'react-hook-form';
import { JoinFormField } from 'types/auth';

export const InputEmailJoin = ({
  control,
}: {
  control: Control<JoinFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'email',
    rules: {
      validate: {
        matchPattern: (value) =>
          /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value),
        checkLength: (value) => value.length >= 10 && value.length <= 40,
      },
    },
  });

  return (
    <input
      type="text"
      onChange={field.onChange}
      className="block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-3xl
      md:w-[20rem] md:text-2xl"
      placeholder="Email을 입력해 주세요"
    />
  );
};

export const InputPwdJoin = ({
  control,
}: {
  control: Control<JoinFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'password',
    rules: {
      required: 'Password를 입력해 주세요',
      validate: {
        matchPattern: (value) =>
          /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$@$!%*?&]).{3,}$/.test(value),
        checkLength: (value) => value.length >= 8 && value.length <= 16,
      },
    },
  });

  return (
    <input
      type="password"
      onChange={field.onChange}
      className="block bg-transparent w-[30rem] h-12 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-3xl
      md:w-[20rem] md:text-2xl"
      placeholder="Password를 입력해 주세요"
    />
  );
};

export const InputPwdCheckJoin = ({
  control,
}: {
  control: Control<JoinFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'pwdCheck',
    rules: {
      required: 'Password를 다시 한 번 입력해 주세요',
    },
  });

  return (
    <input
      type="password"
      onChange={field.onChange}
      className="block bg-transparent w-[30rem] h-12 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-3xl
      md:w-[20rem] md:text-2xl"
      placeholder="Password를 다시 한 번 입력해 주세요"
    />
  );
};
