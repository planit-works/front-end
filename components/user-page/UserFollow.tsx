import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useFollowingUser } from 'react-query/follow/useFollowingUser';
import { useUnFollowUser } from 'react-query/follow/useUnFollowUser';
import useDisabledBtn from './../../hooks/useDisabledBtn';

type IsFollwoing = {
  id: number;
  isFollowing: boolean | null;
};

export const Following = ({ follow }: { follow: number }) => {
  return (
    <p className="text-white text-2xl">
      팔로우: <button>{follow}</button>
    </p>
  );
};

export const Follower = ({ follower }: { follower: number }) => {
  return (
    <p className="text-white text-2xl">
      팔로워: <button>{follower}</button>
    </p>
  );
};

export const FollowingBtn = ({ id, isFollowing }: IsFollwoing) => {
  const followingUser = useFollowingUser();
  const unFollowUser = useUnFollowUser();
  const { disableBtn, setDisabledBtn } = useDisabledBtn(false);
  const handleFollow = (id: number) => {
    setDisabledBtn(true);
    followingUser.mutate(id);
    setDisabledBtn(false);
  };

  const handleUnFollow = (id: number) => {
    setDisabledBtn(true);
    unFollowUser.mutate(id);
    setDisabledBtn(false);
  };

  return (
    <div>
      {isFollowing ? (
        <button
          disabled={disableBtn}
          className="absolute top-[-2rem] right-[1rem]"
          onClick={() => handleUnFollow(id)}
        >
          <AiFillHeart className="text-2xl text-white" />
        </button>
      ) : (
        isFollowing !== null && (
          <button
            disabled={disableBtn}
            className="absolute top-[-2rem] right-[1rem]"
            onClick={() => handleFollow(id)}
          >
            <AiOutlineHeart className="text-2xl text-white" />
          </button>
        )
      )}
    </div>
  );
};

export default function FollowList({
  follow,
  follower,
}: {
  follow: number;
  follower: number;
}) {
  return (
    <div className="flex mt-[3rem] justify-center items-center [&>p]:mx-8">
      <Following follow={follow} />
      <Follower follower={follower} />
    </div>
  );
}
