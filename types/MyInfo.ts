export interface MyProfileInfo {
  userId: number;
  email: string;
  profile: Profile;
  followerCount: number;
  followingCount: number;
  isFollowing: null | boolean;
}

export interface Profile {
  bio?: string | null;
  nickname: string;
  imageFile: Array<File>;
  avatarUrl: string;
}

export interface MyPageFormField extends Profile {
  id: number;
  email: string;
}
