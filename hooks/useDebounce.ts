import { useEffect, useState } from 'react';
//인자로 들어가는 value는 useEffect에서 deps가 되는 요소. time은 기본적으로 200ms
const useDebounce = (value: string, time = 150) => {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    if (value.length >= 5) {
      const timer = setTimeout(() => {
        setDebounceVal(value);
      }, time);

      return () => clearTimeout(timer);
    } else {
      setDebounceVal('');
    }
    // 200ms가 되기 전에 value가 바뀌면, (기존)마운트-(기존)언마운트-(New)마운트 가 된다.
    //언마운트가 됐을 때 clearTimeout()가 실행되어 setTimeout을 취소한다.
    //그러다 마지막 지점에서 200ms가 경과하면 setTimeout이 실행. state에 값이 올라간다.
  }, [value, time]);

  return debounceVal; //state에 올라간 값을 반환. 이 값은 useEffect을 deps로 쓰면 된다.
};

export default useDebounce;
