import AnswerLink from '@/components/welcome/answerLink';
import WelcomeAnswer from '@/components/welcome/welcomeAnswer';
import WelcomeQuestion from '@/components/welcome/welcomeQuestion';
import { welcomeTextArr } from '@/constants/welcomeTextArr';
import { useEffect, useState } from 'react';
import getRandomArr from './../utils/getRandomArr';
import useWelcomeText from './../hooks/useWelcomeText';

export default function welcome() {
  const welcomeText = useWelcomeText();

  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
      <WelcomeQuestion welcomeText={welcomeText} />
      <WelcomeAnswer />
    </div>
  );
}
