import WelcomeAnswer from 'components/welcome/WelcomeAnswer';
import WelcomeQuestion from 'components/welcome/WelcomeQuestion';
import useWelcomeText from 'hooks/useWelcomeText';
import Head from 'next/head';

export default function Welcome() {
  const welcomeText = useWelcomeText();

  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
      <Head>
        <title>Welcome!</title>
        <meta name="plain-it" content="Plan-it에 오신 여러분을 환영합니다" />
      </Head>
      <WelcomeQuestion welcomeText={welcomeText} />
      <WelcomeAnswer />
    </div>
  );
}

//빌드 대비
// export default function Welcome({
//   welcomeText,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   // const welcomeText = useWelcomeText();

//   return (
//     <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
//       <WelcomeQuestion welcomeText={welcomeText} />
//       <WelcomeAnswer />
//     </div>
//   );
// }

// export async function getStaticProps() {
//   const welcomeText = getRandomArr(welcomeTextArr);

//   return {
//     props: {
//       welcomeText,
//     },
//     revalidate: 1,
//   };
// }
