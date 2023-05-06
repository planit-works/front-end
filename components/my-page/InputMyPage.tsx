import { useRef, useState } from 'react';
import { useController, Control } from 'react-hook-form';
import { MyPageFormField } from 'types/MyInfo';
import { BsPencilSquare } from 'react-icons/bs';
import myPageFormStore from 'store/myPageFormStore';
import MarkDownPreview from './MarkDownPreview';
import sliderStore from 'store/sliderStore';
import myProfileInfoStore from 'store/myProfileInfoStore';
import useBioValue from 'hooks/useBioValue';

export const InputMyImgFile = ({
  control,
}: {
  control: Control<MyPageFormField>;
}) => {
  const { field } = useController({
    control,
    name: 'imageFile',
  });

  const { hiddenOfFormSlider, setHidden, setFormSlider } = sliderStore();
  const [imageFileName, setImageFileName] = useState('기존 프로필 이미지');

  const checkInputWithImgFile = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files?.length)
      setFormSlider(false); //파일을 등록하지 않은 경우(기본 이미지 사용)
    else if (!event.target.files[0].type.includes('image'))
      setFormSlider(false); //등록한 파일이 이미지 형식이 아닐 경우
    else setFormSlider(true);
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.files);
    checkInputWithImgFile(event);
    hiddenOfFormSlider && setHidden(false);
    if (event.target.files?.length) {
      setImageFileName(event.target.files?.[0].name);
    } else {
      setImageFileName('기존 프로필 이미지');
    }
  };

  return (
    <div
      className="w-[25rem] rounded-lg border-[1.5px] border-solid border-gray-200 bg-transparent flex items-center
      md:w-[20rem]"
    >
      <input
        id="imageFile"
        type="file"
        spellCheck="false"
        accept="image/*"
        className="hidden"
        onChange={onChangeFile}
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

export const InputMyEmail = ({
  defaultValue,
}: {
  defaultValue: string | number | readonly string[] | undefined;
}) => {
  return (
    <input
      disabled
      type="text"
      defaultValue={defaultValue}
      className="block bg-transparent w-[25rem] h-8 mt-6 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl
      md:w-[20rem] md:text-xl"
    />
  );
};

export const InputMyNickName = ({
  control,
  defaultValue,
}: {
  control: Control<MyPageFormField>;
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

  const { disabledNickName, setDisabledNickName } = myPageFormStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { hiddenOfFormSlider, setHidden, setFormSlider } = sliderStore();
  const { myProfile } = myProfileInfoStore();

  const onFocusInput = () => {
    setDisabledNickName(false);
    inputRef.current?.focus();
  };

  const checkInputWithMyProfile = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value === myProfile.profile.nickname) setFormSlider(false);
    else setFormSlider(true);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);
    hiddenOfFormSlider && setHidden(false);
    checkInputWithMyProfile(event);
  };

  return (
    <div className="group relative">
      <input
        ref={inputRef}
        disabled={disabledNickName}
        type="text"
        spellCheck="false"
        onChange={onChangeInput}
        defaultValue={defaultValue}
        className="inline bg-transparent w-[25rem] h-8 mt-6 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl
        md:w-[20rem] md:text-xl"
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
  defaultValue,
}: {
  control: Control<MyPageFormField>;
  defaultValue: string | null | undefined;
}) => {
  const { field } = useController({
    control,
    name: 'bio',
  });
  const { usefulBioVal, setUsefulBioVal } = useBioValue(defaultValue);
  const { tabBio, setTabBio } = myPageFormStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { hiddenOfFormSlider, setHidden, setFormSlider } = sliderStore();
  const { myProfile } = myProfileInfoStore();

  const onChangeTab = () => {
    if (textAreaRef.current?.value) {
      setUsefulBioVal(textAreaRef.current.value);
    } else {
      //textarea 내용이 없으면 빈 값 저장
      //markdown렌더 -> textarea로 전환할 때, textAreaRef.current.value는 항상 undefined다.
      if (!tabBio) {
        //tabBio를 통해 textarea -> markdown렌더로 전환할 때만 감지하여 빈 값을 저장하도록 한다.
        setUsefulBioVal('');
      }
    }
    setTabBio();
  };

  const checkTextAreaWithMyProfile = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (event.target.value === myProfile.profile.bio) setFormSlider(false);
    else setFormSlider(true);
  };

  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(event);
    hiddenOfFormSlider && setHidden(false);
    checkTextAreaWithMyProfile(event);
  };

  return (
    <div className="group relative">
      {tabBio ? (
        <div
          className="max-w-[23rem] break-all
        md:max-w-[18rem]"
        >
          <MarkDownPreview textBio={usefulBioVal} />
        </div>
      ) : (
        <textarea
          ref={textAreaRef}
          defaultValue={usefulBioVal}
          onChange={onChangeTextArea}
          spellCheck="false"
          className="block bg-transparent resize-none w-[23rem] h-[7.5rem] border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white
          md:w-[18rem]"
          placeholder="Bio을 입력해 주세요"
        />
      )}

      <button type="button" onClick={onChangeTab}>
        <BsPencilSquare
          id="hover-opacity"
          className="group-hover:visible invisible inline text-white absolute right-2 top-2"
        />
      </button>
    </div>
  );
};
