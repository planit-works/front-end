import { Dispatch, SetStateAction, useRef, useCallback } from 'react';
import TodoListContainer from './TodoListContainer';
import { ChevronRightButton } from '../../ChevronButton';

interface TodoSideBarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TodoSideBar(props: TodoSideBarProps) {
  const { setIsOpen } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickChevronRight = useCallback(() => {
    containerRef.current?.classList.add('animate-slipToRight');
    setTimeout(() => setIsOpen(false), 500);
  }, [setIsOpen]);

  return (
    <div ref={containerRef} className="todo-side-bar animate-slipToLeft">
      <TodoListContainer />
      <ChevronRightButton handleButtonClick={handleClickChevronRight} />
    </div>
  );
}
