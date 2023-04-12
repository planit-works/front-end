export interface UserProfileList {
  profiles: Profile[];
  paginationInfo: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Profile {
  profileId: number;
  userId: number;
  nickname: string;
  avatarUrl: string;
  bio: null | string;
  isFollowing: boolean;
}
