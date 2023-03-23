import Link from 'next/link';
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
        <div className="flex items-center list-none bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
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
}: {
  userProfileDatas: UserProfileList | undefined;
}) {
  return (
    <ul className="absolute top-[1.75rem] right-[2rem] w-[13rem]">
      {userProfileDatas?.profiles &&
        userProfileDatas.profiles.map((item) => {
          return <SearchedList key={item.profileId} UserProfile={item} />;
        })}
    </ul>
  );
}
