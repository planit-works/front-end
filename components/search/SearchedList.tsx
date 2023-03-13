import { UserProfile } from 'types/UserProfie';
import Link from 'next/link';

export function SearchedList({
  UserProfile,
}: {
  UserProfile: UserProfile;
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
            className="w-8 h-8 rounded-[20%] pl-2"
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
  userProfileDatas: UserProfile[] | undefined;
}) {
  return (
    <ul className="absolute top-[1.75rem] right-[2rem] w-[13rem]">
      {userProfileDatas &&
        userProfileDatas.map((item) => {
          return <SearchedList key={item.id} UserProfile={item} />;
        })}
    </ul>
  );
}
