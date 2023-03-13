import { useState } from 'react';

export default function useDisabledBtn(disable: boolean) {
  const [disableBtn, setDisabledBtn] = useState(disable);

  return { disableBtn, setDisabledBtn };
}
