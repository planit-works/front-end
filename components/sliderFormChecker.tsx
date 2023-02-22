import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import useErrorStore from 'store/useErrorStore';
import { useEffect, useState } from 'react';

export default function SliderChecker() {
  const { isErrorSlider, setErrorSlider } = useErrorStore();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (isErrorSlider === undefined) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [isErrorSlider]);

  return (
    <div
      className={`${isErrorSlider ? 'animate-sliderUp' : 'animate-sliderDown'}
      ${hidden && 'hidden'}
      [&>button]:mx-1
         absolute -bottom-[17%] -right-[50%]  p-3 border-2 rounded-lg opacity-0 border-orange-700 bg-orange-700`}
    >
      <span>바뀐 내용이 있습니다. 수정하시겠습니까?</span>

      <button type="submit" disabled={!isErrorSlider}>
        <AiOutlineCheck />
      </button>
      <button type="button" onClick={() => setErrorSlider(false)}>
        <AiOutlineClose />
      </button>
    </div>
  );
}
