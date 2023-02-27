import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { getUserProfile } from 'api/profile/Api';
import { UserProfile } from '../../types/UserProfie';
import SearchedListBar from './SearchedList';
import { useGetUserProfile } from 'react-query/useGetUserProfile';

export default function SearchInput() {
  const [searchVal, setSearchVal] = useState('');
  const debounceVal = useDebounce(searchVal);
  const { refetch, userProfileDatas } = useGetUserProfile(debounceVal);

  // const searchUser = async (id: string) => {
  //   try {
  //     const data = (await getUserProfile(id)) as UserProfile[];
  //     setUSerProfiles(data);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setUSerProfiles([]);
  //     }
  //   }
  // };
  useEffect(() => {
    if (searchVal === '') {
      return;
    } else {
      refetch();
      console.log('userProfileData', userProfileDatas);
    }
  }, [debounceVal]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  return (
    <div className="absolute top-[2rem] left-[2rem]">
      <form action="">
        <div className="flex justify-center items-center w-[15rem]">
          <input
            onChange={handleSearch}
            type="text"
            className="w-[13rem] px-2 h-7 rounded-md focus:outline-none "
            placeholder="5자 이상 입력해 주세요"
          />
          <button type="button" onClick={() => console.log(1)}>
            <AiOutlineSearch className="h-6 w-[2rem] text-zinc-300" />
          </button>
          <SearchedListBar userProfileDatas={userProfileDatas} />
        </div>
      </form>
    </div>
  );
}
