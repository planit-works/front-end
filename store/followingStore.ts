import { create } from 'zustand';

interface FollowingState {
  isFollowing: boolean | null;
  follower: number;
  setIsFollowing: (value: boolean | null) => void;
  setFollower: (value: number) => void;
  Following: () => void;
  UnFollow: () => void;
}

const followingStore = create<FollowingState>()((set) => ({
  isFollowing: true,
  follower: 0,
  setIsFollowing: (value) =>
    set({
      isFollowing: value,
    }),
  setFollower: (value) =>
    set({
      follower: value,
    }),
  Following: () =>
    set((state) => ({
      isFollowing: !state.isFollowing,
      follower: state.follower + 1,
    })),
  UnFollow: () =>
    set((state) => ({
      isFollowing: !state.isFollowing,
      follower: state.follower - 1,
    })),
}));
export default followingStore;
