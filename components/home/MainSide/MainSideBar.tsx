import { Dispatch, SetStateAction, useRef, useCallback } from 'react';
import TodoListContainer from './TodoListContainer';
import { ChevronRightButton } from '../../ChevronButton';
import CalendarContainer from './CalendarContainer';

interface MainSideBarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MainSideBar(props: MainSideBarProps) {
  const { setIsOpen } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickChevronRight = useCallback(() => {
    containerRef.current?.classList.add('animate-slipToRight');
    setTimeout(() => setIsOpen(false), 500);
  }, [setIsOpen]);

  return (
    <div ref={containerRef} className="todo-side-bar animate-slipToLeft">
      <div className="relative h-full">
        <CalendarContainer />
        <TodoListContainer />
      </div>
      <ChevronRightButton handleButtonClick={handleClickChevronRight} />
    </div>
  );
}
