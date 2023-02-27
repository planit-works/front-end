import { UserProfile } from 'types/UserProfie';

export function SearchedList({
  UserProfile,
}: {
  UserProfile: UserProfile;
  key: number;
}) {
  return (
    <li className="flex items-center list-none bg-gray-100 rounded-md hover:bg-gray-200 ">
      <img
        alt=""
        src={
          (process.env.NEXT_PUBLIC_IMG_THUMBNAIL as string) +
          UserProfile.avatarUrl
        }
        className="w-8 h-8 rounded-[20%] pl-2"
      />
      <span className="pl-7">{UserProfile.nickname}</span>
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
