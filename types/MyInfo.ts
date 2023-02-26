export interface MyInfo {
  id: number;
  email: string;
  profile: Profile;
  followerCount: number;
  followingCount: number;
}

export interface Profile {
  bio: string;
  nickname: string;
  imageFile: Array<File>;
  avatarUrl: string;
}

export interface MyPageFormField extends Profile {
  id: number;
  email: string;
}
