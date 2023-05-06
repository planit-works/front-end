import { useState } from 'react';
import { useController, Control } from 'react-hook-form';
import { ProfileFormField } from 'types/auth';

export const InputImgFile = ({
  control,
}: {
  control: Control<ProfileFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'imageFile',
  });
  const [imageFileName, setImageFileName] = useState('기존 프로필 이미지');
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.files);
    if (event.target.files?.length) {
      setImageFileName(event.target.files?.[0].name);
    } else {
      setImageFileName('기존 프로필 이미지');
    }
  };

  return (
    <div
      className="w-[30rem] rounded-lg border-[1.5px] border-solid border-gray-200 bg-transparent flex items-center
    md:w-[20rem]"
    >
      <input
        id="imageFile"
        type="file"
        accept="image/gif, image/jpeg, image/png"
        className="hidden"
        onChange={onChangeFile}
        //일부러 onChange 속성을 이용해 field value를 바꿔준다.
        //default는 string 값이 field value에 들어가기 때문.
      />
      <label
        htmlFor="imageFile"
        className="cursor-pointer text-sm rounded-md p-1 bg-gray-200 min-w-[5rem]
         "
      >
        이미지 등록
      </label>
      <span className="inline-block text-white mx-2 truncate">
        {imageFileName}
      </span>
    </div>
  );
};

export const InputNickName = ({
  control,
  defaultValue,
}: {
  control: Control<ProfileFormField>;
  defaultValue: string | number | readonly string[] | undefined;
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
      defaultValue={defaultValue}
      className="block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-3xl
      md:w-[20rem] md:text-2xl"
      placeholder="Nickname을 입력해 주세요"
    />
  );
};
