import { AiOutlineHeart } from 'react-icons/ai';

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

export const FollowingBtn = () => {
  return (
    <button>
      <AiOutlineHeart />
    </button>
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
