import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from 'react-query/key';
import { MyInfo } from 'types/MyInfo';
import SliderChecker from 'components/sliderFormChecker';
import { useUpdateProfile } from 'react-query/useUpdateProfile';
import SliderUpdateChecker from 'components/sliderUpdateChecker';
import { UserBio, UserNickName } from './InputUserPage';
import FollowList from './UserFollow';
import { useGetUserProfile } from 'react-query/useGetUserProfile';

export default function UserProfileForm({ id }: { id: number }) {
  const mutate = useUpdateProfile();
  const queryClient = useQueryClient();
  const mutateAsync = useGetUserProfile();
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
  let queryClientFollower = queryClient.getQueryData<MyInfo>([
    QueryKey.getUserProfile,
  ])?.followerCount as number;
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

        <FollowList
          follow={queryClientFollower}
          follower={queryClientFollowing}
        />
        <UserNickName defaultValue={queryClientNickName} />
        <UserBio defaultValue={queryClientBio} />

        <SliderChecker />
      </div>
      <SliderUpdateChecker />
    </div>
  );
}
