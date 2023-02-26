/* eslint-disable semi */
import { useState } from 'react';
import MainSideBar from '../components/home/MainSide/MainSideBar';
import { BsChevronLeft } from 'react-icons/bs';
import Clock from '../components/home/Clock';
export default function Home() {
  const [isOpenTodo, setIsOpenTodo] = useState<boolean>(false);

  return (
    <div className="w-screen flex flex-col justify-center items-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-center">
      <div className="">
        <Clock />
      </div>
      <button
        className="absolute right-2 top-1/2 text-xl text-gray-200 flex items-center hover:animate-bounceLeft"
        onClick={() => setIsOpenTodo(true)}
      >
        <BsChevronLeft /> <span>todo</span>
      </button>
      {isOpenTodo && (
        <MainSideBar isOpen={isOpenTodo} setIsOpen={setIsOpenTodo} />
      )}
      <img
        src="/planit-small.png"
        alt="planit"
        className="absolute w-20 left-6 bottom-6 opacity-70"
      />
    </div>
  );
}
