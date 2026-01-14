import { useEffect, useState } from 'react';

const useDetectKeyboardOpen = (minKeyboardHeight = 300, defaultValue) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const listener = (event) => {
      console.log(event?.target.height)
      const newState = window.screen.height - minKeyboardHeight > (window.visualViewport?.height || window.screen.height)
      if (isKeyboardOpen !== newState) {
        setIsKeyboardOpen(newState);
      }
    };
    if (typeof visualViewport !== 'undefined') {
      window.visualViewport?.addEventListener('resize', listener);
    }
    return () => {
      if (typeof visualViewport !== 'undefined') {
        window.visualViewport?.removeEventListener('resize', listener);
      }
    };
  }, []);

  return isKeyboardOpen;
};

export default useDetectKeyboardOpen;
