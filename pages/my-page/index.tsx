import { verifyLogin } from 'api/auth/Api';
import { Profile } from 'types/auth';
import { InferGetStaticPropsType } from 'next';
import userStore from 'store/userStore';

export default function MyPage({
  userProfile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div>{userProfile.avatarUrl}</div>
      <div>{userProfile.nickname}</div>
    </>
  );
}

export async function getStaticProps() {
  const userProfile = {
    nickname: '12',
    avatarUrl: 'sd',
  };

  if (!userProfile) {
    return { notFound: true };
  }

  return {
    props: {
      userProfile,
    },
  };
}
