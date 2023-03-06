import { useEffect, useState } from 'react';

const useIsFollowing = (isFollowing: boolean | null) => {
  const [Following, setFollowing] = useState<boolean | null>(null);
  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  return { Following, setFollowing };
};

export default useIsFollowing;
