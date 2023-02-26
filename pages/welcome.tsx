import WelcomeAnswer from 'components/welcome/welcomeAnswer';
import WelcomeQuestion from 'components/welcome/welcomeQuestion';
import useWelcomeText from 'hooks/useWelcomeText';
// import getRandomArr from 'utils/getRandomArr';
// import { InferGetStaticPropsType } from 'next';
// import { welcomeTextArr } from 'constants/welcomeTextArr';

export default function Welcome() {
  const welcomeText = useWelcomeText();

  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
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
