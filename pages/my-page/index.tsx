import SliderChecker from 'components/sliderFormChecker';
import MyProfileForm from 'components/my-page/MyPageForm';
import { verifyLogin } from 'api/auth/Api';
import { InferGetServerSidePropsType } from 'next/types';

export default function MyPage() {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.webp')] bg-cover bg-top bg-center bg-fixed">
      <MyProfileForm />
    </div>
  );
}

// export async function getServerSideProps() {
//   const { userId } = await verifyLogin();

//   return {
//     props: {
//       id: userId,
//     },
//   };
// }
