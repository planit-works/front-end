import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import SearchedListBar from './SearchedList';
import { useGetUserProfileList } from 'react-query/profile/useGetUserProfileList';

export default function SearchInput() {
  const [searchVal, setSearchVal] = useState('');
  const debounceVal = useDebounce(searchVal);
  const { userProfileDatas, fetchNextPage, hasNextPage, isLoading, refetch } =
    useGetUserProfileList(debounceVal);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  return (
    <div className="ml-4">
      <form action="">
        <div className="flex justify-center items-center w-[15rem]">
          <input
            onChange={handleSearch}
            type="text"
            className="w-[13rem] px-2 h-7 rounded-md focus:outline-none "
            placeholder="5자 이상 입력해 주세요"
          />

          <button type="button">
            <AiOutlineSearch className="h-6 w-[2rem] text-zinc-300" />
          </button>
          <SearchedListBar
            userProfileDatas={userProfileDatas}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </form>
    </div>
  );
}
