import { Dispatch, SetStateAction, useRef } from 'react';
import { BsChevronRight } from 'react-icons/bs';

interface TodoSideBarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TodoSideBar(props: TodoSideBarProps) {
  const { isOpen, setIsOpen } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="todo-side-bar animate-slipToLeft">
      <p className="text-4xl font-bold">Todo</p>
      <ul className="mx-3 my-2">
        <li>할일</li>
      </ul>
      <button
        className="absolute text-xl left-2 top-1/2 text-gray-400"
        onClick={() => {
          containerRef.current?.classList.add('animate-slipToRight');
          setTimeout(() => setIsOpen(false), 500);
        }}
      >
        <BsChevronRight />
      </button>
    </div>
  );
}
