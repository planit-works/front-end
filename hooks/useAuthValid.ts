import { useEffect, useState } from 'react';
import { LiteralUnion } from 'react-hook-form/dist/types/utils';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export default function useAuthValid(
  errorType: LiteralUnion<keyof RegisterOptions, string> | undefined,
) {
  const [patternErr, setPatternErr] = useState(true);
  const [LengthErr, setMinLenErr] = useState(true);

  useEffect(() => {
    if (errorType === 'matchPattern') {
      setPatternErr(true);
      if (errorType === 'checkLength') {
        setMinLenErr(false);
      } else {
        setMinLenErr(true);
      }
    } else {
      setPatternErr(false);
      if (errorType === 'checkLength') {
        setMinLenErr(true);
      } else {
        setMinLenErr(false);
      }
    }
  }, [errorType]);

  return { patternErr, LengthErr };
}
