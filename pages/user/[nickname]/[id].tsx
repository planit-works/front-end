import UserProfileForm from 'components/user-page/UserForm';
import { useRouter } from 'next/router';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next/types';

export default function UserPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.webp')] bg-cover bg-top bg-center bg-fixed">
      <UserProfileForm id={id} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const id = parseInt(query.id as string);

  return { props: { id } };
}
