import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import sliderStore from 'store/sliderStore';

export default function SliderChecker() {
  const { isFormSlider, setFormSlider } = sliderStore();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(false);
  }, []);

  return (
    <div
      className={`${isFormSlider ? 'animate-sliderUp' : 'animate-sliderDown'}
      ${hidden && 'hidden'}
      [&>button]:mx-1
         absolute -bottom-[17%] -right-[50%]  p-3 border-2 rounded-lg opacity-0 border-orange-700 bg-orange-700`}
    >
      <span>바뀐 내용이 있습니다. 수정하시겠습니까?</span>

      <button type="submit" disabled={!isFormSlider}>
        <AiOutlineCheck />
      </button>
      <button type="button" onClick={() => setFormSlider(false)}>
        <AiOutlineClose />
      </button>
    </div>
  );
}
