import { useController, Control } from 'react-hook-form';
import { ProfileFormField } from 'types/Auth';

export const InputImgFile = ({
  control,
}: {
  control: Control<ProfileFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'imageFile',
  });

  return (
    <input
      type="file"
      accept="image/gif, image/jpeg, image/png"
      className="w-[30rem]"
      onChange={(event) => field.onChange(event.target.files)}
      //일부러 onChange 속성을 이용해 field value를 바꿔준다.
      //default는 string 값이 field value에 들어가기 때문.
    />
  );
};

export const InputNickName = ({
  control,
}: {
  control: Control<ProfileFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'nickname',
    rules: {
      validate: {
        checkLength: (value) => value.length >= 2 && value.length <= 10,
      },
    },
  });

  return (
    <input
      type="text"
      onChange={field.onChange}
      className="block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
      placeholder="Nickname을 입력해 주세요"
    />
  );
};
