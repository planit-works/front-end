import { MouseEventHandler } from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

interface ChevronButtonProps {
  handleButtonClick: MouseEventHandler<HTMLButtonElement> | undefined;
  classList?: string;
}
export function ChevronRightButton({
  handleButtonClick,
  classList,
}: ChevronButtonProps) {
  return (
    <button
      className={`absolute text-xl top-1/2 text-gray-400 ${classList}`}
      onClick={handleButtonClick}
    >
      <BsChevronRight />
    </button>
  );
}

export function ChevronLeftButton({
  handleButtonClick,
  classList,
}: ChevronButtonProps) {
  return (
    <button
      className={`absolute text-xl top-1/2 text-gray-400 ${classList}`}
      onClick={handleButtonClick}
    >
      <BsChevronLeft />
    </button>
  );
}
