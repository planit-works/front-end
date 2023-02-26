import { AiOutlineCheck } from 'react-icons/ai';
import useErrorStore from 'store/useErrorStore';

export default function SliderUpdateChecker() {
  const { isErrorUpdateChecker } = useErrorStore();
  //   useEffect(() => {
  //     if (isErrorUpdateChecker) {
  //       setTimeout(() => {
  //         setErrorUpdateChecker(false);
  //       }, 1000);
  //     }
  //   }, [isErrorUpdateChecker]);

  return (
    <div
      className={`${isErrorUpdateChecker ? 'animate-sliderMove' : 'hidden'}
      animate-sliderMove absolute -bottom-[20%] p-2 border-2 rounded-lg border-green-600 bg-green-600`}
    >
      <AiOutlineCheck className="inline mx-1" />
      <span className="mx-2">Update Success!</span>
    </div>
  );
}
