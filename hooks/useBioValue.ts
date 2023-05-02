import { useState, useEffect } from 'react';

const useBioValue = (defaultValue: string | null | undefined) => {
  const [usefulBioVal, setUsefulBioVal] = useState('');

  useEffect(() => {
    if (defaultValue) setUsefulBioVal(defaultValue);
    else setUsefulBioVal('');
  }, [defaultValue]);

  return { usefulBioVal, setUsefulBioVal };
};

export default useBioValue;
