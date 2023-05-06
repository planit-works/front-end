import { AiOutlineCheck } from 'react-icons/ai';
import sliderStore from 'store/sliderStore';

export default function SliderUpdateChecker() {
  const { isUpdateCheckerSlider } = sliderStore();

  return (
    <div
      className={`${isUpdateCheckerSlider ? 'animate-sliderMove' : 'hidden'}
      animate-sliderMove fixed bottom-[4rem] w-[12rem] p-2 border-2 rounded-lg border-green-600 bg-green-600
      md:w-[10.5rem]`}
    >
      <AiOutlineCheck className="inline mx-1" />
      <span className="mx-2 md:text-sm">Update Success!</span>
    </div>
  );
}
