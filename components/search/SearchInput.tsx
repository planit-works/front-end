import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import SearchedListBar from './SearchedList';
import { useGetUserProfileList } from 'react-query/profile/useGetUserProfileList';

export default function SearchInput() {
  const [searchVal, setSearchVal] = useState('');
  const debounceVal = useDebounce(searchVal);
  const { userProfileDatas, fetchNextPage, hasNextPage } =
    useGetUserProfileList(debounceVal);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center w-[13rem] rounded-md bg-white">
        <input
          onChange={handleSearch}
          type="text"
          className="h-7 w-[10rem] focus:outline-none bg-transparent ml-2"
          placeholder="5자 이상 입력해 주세요"
        />

        <AiOutlineSearch className="relative left-1 m-[0px] h-6 w-[2rem] text-zinc-300" />
        <SearchedListBar
          userProfileDatas={userProfileDatas}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}
