import { useState } from 'react';

export function useShowable(isDefaultShown = false) {
  const [isShown, setIsShown] = useState(isDefaultShown);

  function open() {
    setIsShown(true);
  }

  function close() {
    setIsShown(false);
  }

  return { isShown, open, close };
}
