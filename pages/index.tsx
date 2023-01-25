/* eslint-disable semi */
import { useState } from 'react';
import TodoSideBar from '../components/TodoSideBar';
import { BsChevronLeft } from 'react-icons/bs';
export default function Home() {
  const [isOpenTodo, setIsOpenTodo] = useState<boolean>(false);

  return (
    <div className="w-screen flex flex-col items-center">
      <h1 className="text-sky-600 text-6xl font-bold mt-20">Hello world!</h1>
      <button
        className="absolute right-2 top-1/2 text-xl text-gray-400 flex items-center hover:animate-bounceLeft"
        onClick={() => setIsOpenTodo(true)}
      >
        <BsChevronLeft /> <span>todo</span>
      </button>
      {isOpenTodo && (
        <TodoSideBar isOpen={isOpenTodo} setIsOpen={setIsOpenTodo} />
      )}
    </div>
  );
}
