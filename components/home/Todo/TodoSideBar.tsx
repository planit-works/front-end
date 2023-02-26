import { Dispatch, SetStateAction, useRef, useCallback } from 'react';
import TodoListContainer from './TodoListContainer';
import { ChevronRightButton } from '../../ChevronButton';
<<<<<<<< HEAD:components/home/MainSide/MainSideBar.tsx
import CalendarContainer from './CalendarContainer';
========
>>>>>>>> db19e7460ab61f5998f3b6de3b410438529836de:components/home/Todo/TodoSideBar.tsx

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
