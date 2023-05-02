import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from 'react-query/react-key';
import { MyProfileInfo } from 'types/MyInfo';
import { UserBio, UserNickName } from './InputUserPage';
import FollowList, { FollowingBtn } from './UserFollow';
import { useGetUserProfile } from 'react-query/profile/useGetUserProfile';
import followingStore from 'store/followingStore';
import ImageFilled from 'components/ImageFilled';

export default function UserProfileForm({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const {
    data: userProfile,
    mutate: getUserProfileData,
    isSuccess,
  } = useGetUserProfile();
  const { isFollowing, follower } = followingStore();

  useEffect(() => {
    getUserProfileData(id);
  }, [id]);

  if (isSuccess) {
    return (
      <div className="">
        <div className="relative">
          <ImageFilled
            containerClass={
              'relative w-[25rem] h-[20rem] my-2 md:w-[20rem] md:h-[15rem]'
            }
            imageClass={'rounded-[8%]'}
            src={
              process.env.NEXT_PUBLIC_IMG_ORIGIN + userProfile.profile.avatarUrl
            }
            alt={'기본 프로필'}
          />
          <FollowingBtn id={id} isFollowing={isFollowing} />
          <FollowList follow={userProfile.followingCount} follower={follower} />
          <UserNickName defaultValue={userProfile.profile.nickname} />
          <UserBio defaultValue={userProfile.profile.bio} />
        </div>
      </div>
    );
  }
}
