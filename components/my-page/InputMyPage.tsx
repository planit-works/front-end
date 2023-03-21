import { useRef, useState } from 'react';
import { useController, Control } from 'react-hook-form';
import { MyPageFormField } from 'types/MyInfo';
import { BsPencilSquare } from 'react-icons/bs';
import myPageFormStore from 'store/myPageFormStore';
import MarkDownPreview from './MarkDownPreview';
import styled from 'styled-components';

const DetailDiv = styled.div`
  line-height: 1.5;
  & h1 {
    font-size: 2em;
    font-weight: bolder;
  }
  & h2 {
    font-size: 1.5em;
    font-weight: bolder;
  }
  & h3 {
    font-size: 1.17em;
    font-weight: bolder;
  }
  & h4 {
    font-size: 1em;
    font-weight: bolder;
  }
  & h5 {
    font-size: 0.83em;
    font-weight: bolder;
  }
  & h6 {
    font-size: 0.67em;
    font-weight: bolder;
  }
  & strong {
    font-weight: bold;
  }
  & p {
    display: block;
    /* margin-top: 1em;
    margin-bottom: 1em; */
    margin-left: 0;
    margin-right: 0;
  }
  i {
    font-style: italic;
  }
  li {
    display: list-item;
  }

  ul {
    display: block;
    list-style-type: disc;
    /* margin-top: 1em;
    margin-bottom: 1 em; */
    margin-left: 0;
    margin-right: 0;
    padding-left: 20px;
  }
  ol {
    display: block;
    /* margin-top: 1em;
    margin-bottom: 1 em; */
    margin-left: 0;
    margin-right: 0;
    padding-left: 20px;
  }
  a:link,
  a:visited {
    color: (internal value);
    text-decoration: underline;
    cursor: auto;
  }
  a:link:active,
  a:visited:active {
    color: (internal value);
  }
`;

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

  const { disabledNickName, setDisabledNickName } = myPageFormStore();
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
        spellCheck="false"
        onChange={field.onChange}
        defaultValue={defaultValue}
        className="inline bg-transparent w-[25rem] h-8 mt-6 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
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
  defaultValue: string;
}) => {
  const { field } = useController({
    control,
    name: 'bio',
    // rules: {
    //   validate: {
    //     checkLength: (value) => value.length <= 300,
    //   },
    // },
  });
  const { tabBio, setTabBio } = myPageFormStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textBio, setTextBio] = useState<string>('');

  const onChangeTab = () => {
    if (textAreaRef.current?.value) {
      setTextBio(textAreaRef.current.value);
    }
    setTabBio();
  };

  return (
    <div className="group relative">
      {tabBio ? (
        <div className="max-w-[23rem] break-all">
          <DetailDiv>
            <MarkDownPreview child={!textBio ? defaultValue : textBio} />
          </DetailDiv>
        </div>
      ) : (
        <textarea
          ref={textAreaRef}
          defaultValue={!textBio ? defaultValue : textBio} //최초 렌더링 시 textBio는 undefined이므로
          onChange={field.onChange}
          spellCheck="false"
          className="block bg-transparent resize-none min-w-[23rem] min-h-[5rem] border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white"
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
