import { useEffect } from 'react';
import { UserBio, UserNickName } from './InputUserPage';
import FollowList, { FollowingBtn } from './UserFollow';
import { useGetUserProfile } from 'react-query/profile/useGetUserProfile';
import followingStore from 'store/followingStore';
import ImageFilled from 'components/ImageFilled';
import LoadingSpinner from 'components/checker/LoadingSpinner';

export default function UserProfileForm({ id }: { id: number }) {
  const {
    data: userProfile,
    mutate: getUserProfileData,
    isSuccess,
    isLoading,
  } = useGetUserProfile();
  const { isFollowing, follower } = followingStore();

  useEffect(() => {
    getUserProfileData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
