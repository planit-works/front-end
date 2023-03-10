import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from 'react-query/react-key';
import { MyInfo } from 'types/MyInfo';
import SliderChecker from 'components/sliderFormChecker';
import { UserBio, UserNickName } from './InputUserPage';
import FollowList, { FollowingBtn } from './UserFollow';
import { useGetUserProfile } from 'react-query/profile/useGetUserProfile';
import followingStore from 'store/followingStore';

export default function UserProfileForm({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutateAsync = useGetUserProfile();
  const { isFollowing, follower } = followingStore();

  useEffect(() => {
    mutateAsync(id);
  }, [id, mutateAsync]);

  let queryClientNickName = queryClient.getQueryData<MyInfo>([
    QueryKey.getUserProfile,
  ])?.profile.nickname as string;
  const queryClientBio = queryClient.getQueryData<MyInfo>([
    QueryKey.getUserProfile,
  ])?.profile.bio as string;
  let queryClientAvatarUrl = queryClient.getQueryData<MyInfo>([
    QueryKey.getUserProfile,
  ])?.profile.avatarUrl as string;
  let queryClientFollowing = queryClient.getQueryData<MyInfo>([
    QueryKey.getUserProfile,
  ])?.followingCount as number;

  return (
    <div className="flex relative right-64 flex-col justify-center items-center">
      <div className="relative">
        <img
          src={process.env.NEXT_PUBLIC_IMG_ORIGIN + queryClientAvatarUrl}
          alt="기본 프로필"
          className="w-[25rem] h-[20rem] my-2 rounded-[8%]"
        />
        <FollowingBtn id={id} isFollowing={isFollowing} />
        <FollowList follow={queryClientFollowing} follower={follower} />
        <UserNickName defaultValue={queryClientNickName} />
        <UserBio defaultValue={queryClientBio} />

        <SliderChecker />
      </div>
    </div>
  );
}
