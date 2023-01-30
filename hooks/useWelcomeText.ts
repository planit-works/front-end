import { welcomeTextArr } from 'constants/welcomeTextArr';
import getRandomArr from 'utils/getRandomArr';
import { useEffect, useState } from 'react';

export default function useWelcomeText() {
  const [welcomeText, setWelcomeText] = useState('');
  useEffect(() => {
    setWelcomeText(getRandomArr(welcomeTextArr));
  }, []);

  return welcomeText;
}
