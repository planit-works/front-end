import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useFollowingUser } from 'react-query/follow/useFollowingUser';
import { useUnFollowUser } from 'react-query/follow/useUnFollowUser';
import useDisabledBtn from './../../hooks/useDisabledBtn';

type IsFollwoing = {
  id: number;
  isFollowing: boolean | null;
};

export const Following = ({ follow }: { follow: number | null }) => {
  return (
    <p className="text-white text-2xl md:text-xl">
      팔로우: <button type="button">{follow}</button>
    </p>
  );
};

export const Follower = ({ follower }: { follower: number | null }) => {
  return (
    <p className="text-white text-2xl md:text-xl">
      팔로워: <button type="button">{follower}</button>
    </p>
  );
};

export const FollowingBtn = ({ id, isFollowing }: IsFollwoing) => {
  const followingUser = useFollowingUser();
  const unFollowUser = useUnFollowUser();
  const { disableBtn, setDisabledBtn } = useDisabledBtn(false);
  const handleFollow = async (id: number) => {
    setDisabledBtn(true);
    await followingUser.mutateAsync(id);
    setDisabledBtn(false);
  };

  const handleUnFollow = async (id: number) => {
    setDisabledBtn(true);
    await unFollowUser.mutateAsync(id);
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
          <AiFillHeart
            className="text-3xl text-white 
          md:text-xl"
          />
        </button>
      ) : (
        <button
          disabled={disableBtn}
          className="absolute top-[-2rem] right-[1rem]"
          onClick={() => handleFollow(id)}
        >
          <AiOutlineHeart
            className="text-3xl text-white
            md:text-xl"
          />
        </button>
      )}
    </div>
  );
};

export default function FollowList({
  follow,
  follower,
}: {
  follow: number | null;
  follower: number | null;
}) {
  return (
    <div className="flex justify-center items-center my-8 [&>p]:mx-8">
      <Following follow={follow} />
      <Follower follower={follower} />
    </div>
  );
}
