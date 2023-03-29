export interface MyProfileInfo {
  userId: number;
  email: string;
  profile: ProfileReal;
  followerCount: number | null;
  followingCount: number | null;
  isFollowing: null | boolean;
}

export interface Profile {
  bio?: string | null;
  nickname: string;
  imageFile: Array<File>;
  avatarUrl: string;
}

export interface ProfileReal {
  bio?: string | null;
  nickname: string;
  avatarUrl: string;
}

export interface MyPageFormField extends Profile {
  id: number;
  email: string;
}
