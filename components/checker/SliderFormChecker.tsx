import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useEffect } from 'react';
import sliderStore from 'store/sliderStore';

export default function SliderChecker() {
  const { isFormSlider, hiddenOfFormSlider, setFormSlider, setHidden } =
    sliderStore();

  useEffect(() => {
    setHidden(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${isFormSlider ? 'animate-sliderUp' : 'animate-sliderDown'}
      ${hiddenOfFormSlider && 'hidden'}
      flex justify-around items-center
       w-[25rem]
         fixed bottom-[2rem] p-3 border-2 rounded-lg opacity-0 border-orange-700 bg-orange-700
          md:w-[20rem] md:text-sm md:p-2`}
    >
      <span>바뀐 내용이 있습니다. 수정하시겠습니까?</span>

      <button type="submit" disabled={!isFormSlider}>
        <AiOutlineCheck className="text-lg md:text-sm" />
      </button>
      <button type="button" onClick={() => setFormSlider(false)}>
        <AiOutlineClose className="text-lg md:text-sm" />
      </button>
    </div>
  );
}
