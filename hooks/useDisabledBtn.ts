import { useState } from 'react';

export default function useDisabledBtn() {
  const [disableBtn, setDisabledBtn] = useState(true);

  return { disableBtn, setDisabledBtn };
}
