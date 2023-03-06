import { AiOutlineCheck } from 'react-icons/ai';
import sliderStore from 'store/sliderStore';

export default function SliderUpdateChecker() {
  const { isUpdateCheckerSlider } = sliderStore();

  return (
    <div
      className={`${isUpdateCheckerSlider ? 'animate-sliderMove' : 'hidden'}
      animate-sliderMove absolute -bottom-[17%] p-2 border-2 rounded-lg border-green-600 bg-green-600`}
    >
      <AiOutlineCheck className="inline mx-1" />
      <span className="mx-2">Update Success!</span>
    </div>
  );
}
