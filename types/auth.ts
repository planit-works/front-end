export type AuthInfo = {
  email: string;
  password: string;
};

export type UserData = {
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
