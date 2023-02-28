import { useRef, useState } from 'react';
import { useController, Control } from 'react-hook-form';
import { MyPageFormField } from 'types/MyInfo';
import { BsPencilSquare } from 'react-icons/bs';
import myPageFormStore from 'store/myPageFormStore';
import MarkDownPreview from 'components/my-page/MarkDownPreview';

export const InputMyImgFile = ({
  control,
}: {
  control: Control<MyPageFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'imageFile',
  });

  return (
    <input
      type="file"
      spellCheck="false"
      accept="image/*"
      className="w-[25rem] my-4"
      onChange={(event) => field.onChange(event.target.files)}
      //일부러 onChange 속성을 이용해 field value를 바꿔준다.
      //default는 string 값이 field value에 들어가기 때문.
    />
  );
};

export const InputMyEmail = ({ defaultValue }: { defaultValue: string }) => {
  return (
    <input
      disabled
      type="text"
      defaultValue={defaultValue}
      className="block bg-transparent w-[25rem] h-8 mt-6 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
      placeholder="Email을 입력해 주세요"
    />
  );
};

export const UserNickName = ({ defaultValue }: { defaultValue: string }) => {
  return (
    <span className="block mt-[3rem] bg-transparent w-[25rem] h-8 mt-6 border-solid border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl">
      {defaultValue}
    </span>
  );
};

export const UserBio = ({ defaultValue }: { defaultValue: string }) => {
  return (
    <div className="mt-[4rem]">
      <MarkDownPreview child={defaultValue} />
    </div>
  );
};
