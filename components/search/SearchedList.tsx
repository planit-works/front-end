import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Profile, UserProfileList } from 'types/SearchedList';

export function SearchedList({
  UserProfile,
}: {
  UserProfile: Profile;
  key: number;
}) {
  return (
    <li>
      <Link
        href={`/user/${UserProfile.nickname}/${UserProfile.userId}`}
        legacyBehavior
      >
        <div className="flex items-center list-none bg-gray-100 hover:bg-gray-200 cursor-pointer">
          <img
            alt=""
            src={
              (process.env.NEXT_PUBLIC_IMG_THUMBNAIL as string) +
              UserProfile.avatarUrl
            }
            className="w-8 h-8 rounded-[20%] ml-4"
          />
          <span className="pl-7">{UserProfile.nickname}</span>
        </div>
      </Link>
    </li>
  );
}

export default function SearchedListBar({
  userProfileDatas,
  fetchNextPage,
  hasNextPage,
}: {
  userProfileDatas: UserProfileList[] | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<UserProfileList, Error>>;
  hasNextPage: boolean | undefined;
}) {
  const [ref, inView] = useInView({ threshold: 1 });
  useEffect(() => {
    if (inView) {
      //ref가 달린 div가 화면에 보여지면 fetchNextPage() 실행
      fetchNextPage();
    }
  }, [inView]);

  return (
    <ul className="absolute top-[1.75rem] right-[2rem] w-[13rem] max-h-32 overflow-auto">
      {userProfileDatas &&
        userProfileDatas.map((result) => {
          return result.profiles?.map((item, i) => {
            return <SearchedList key={i} UserProfile={item} />;
          });
        })}
      {hasNextPage && (
        <div ref={ref}></div> //검색 결과 다음 페이지가 존재할 경우에만 ref가 붙은 div 생성
      )}
    </ul>
  );
}
