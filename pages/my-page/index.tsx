import MyProfileForm from 'components/my-page/MyPageForm';
import Head from 'next/head';

export default function MyPage() {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.webp')] bg-cover bg-top bg-center bg-fixed">
      <Head>
        <title>My Page</title>
        <meta name="plain-it" content="Plan-it My Page" />
      </Head>
      <MyProfileForm />
    </div>
  );
}
