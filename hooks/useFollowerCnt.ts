import { useState } from 'react';

export const useFollowerCnt = (follower: number) => {
  const [followerCnt, setFollowerCnt] = useState(follower);

  return { followerCnt, setFollowerCnt };
};
