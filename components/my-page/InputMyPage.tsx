import { ChangeEvent, LegacyRef, useEffect, useRef } from 'react';
import { useController, Control } from 'react-hook-form';
import { MyPageFormField } from 'types/MyInfo';
import { BsPencilSquare } from 'react-icons/bs';
import useDisabledBtn from 'hooks/useDisabledBtn';
import useDisabledStore from 'store/useDisabledStore';

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

export const InputMyNickName = ({
  control,
  defaultValue,
}: {
  control: Control<MyPageFormField>;
  defaultValue: string;
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

  const { disableBtn, setDisabledBtn } = useDisabledBtn();
  const { disabledNickName, setDisabledNickName } = useDisabledStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocusInput = () => {
    setDisabledNickName(false);
    inputRef.current?.focus();
  };

  return (
    <div className="group relative">
      <input
        ref={inputRef}
        disabled={disabledNickName}
        type="text"
        onChange={field.onChange}
        defaultValue={defaultValue}
        className="inline bg-transparent w-[25rem] h-8 mt-6 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
        placeholder="Nickname을 입력해 주세요"
      />
      <button type="button" onClick={onFocusInput}>
        <BsPencilSquare
          id="hover-opacity"
          className="group-hover:visible invisible inline text-white absolute right-2 bottom-2"
        />
      </button>
    </div>
  );
};

export const InputMyBio = ({
  control,
}: {
  control: Control<MyPageFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'bio',
  });

  return (
    <input
      type="text"
      onChange={field.onChange}
      className="block bg-transparent w-[25rem] h-8 mt-6 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
      placeholder="Bio을 입력해 주세요"
    />
  );
};
