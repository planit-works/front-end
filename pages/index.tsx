/* eslint-disable semi */
import { useState } from 'react';
import TodoSideBar from '../components/home/Todo/TodoSideBar';
import { BsChevronLeft } from 'react-icons/bs';
import Clock from '../components/home/Clock';
import UserNavBar from 'components/UserNavBar';
export default function Home() {
  const [isOpenTodo, setIsOpenTodo] = useState<boolean>(false);

  return (
    <div className="w-screen flex flex-col justify-center items-center relative h-screen overflow-x-hidden bg-[url('../assets/background1.webp')] bg-cover">
      <div className="">
        <Clock />
      </div>
      <button
        className="absolute right-2 top-1/2 text-xl text-gray-200 flex items-center hover:animate-bounceLeft"
        onClick={() => setIsOpenTodo(true)}
      >
        <BsChevronLeft /> <span>todo</span>
      </button>
      <UserNavBar />
      {isOpenTodo && (
        <TodoSideBar isOpen={isOpenTodo} setIsOpen={setIsOpenTodo} />
      )}
    </div>
  );
}
