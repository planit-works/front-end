export type AuthInfo = {
  email: string;
  password: string;
};

export type UserData = {
  profile: any;
  nickname:
    | string
    | number
    | boolean
    | readonly string[]
    | readonly number[]
    | readonly boolean[]
    | null
    | undefined;
  userId: number;
  avatarUrl: string;
};

export interface LoginFormField {
  email: string;
  password: string;
}

export interface JoinFormField extends LoginFormField {
  pwdCheck: string;
}

export interface ProfileFormField {
  imageFile: Array<File>;
  nickname: string;
}

export interface LoginedUserInfo {
  userId: number;
  profile: Profile;
}

export interface Profile {
  nickname: string;
  avatarUrl: string;
}
