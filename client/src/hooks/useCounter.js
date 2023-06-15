import { useState, useEffect, useRef } from 'react';

const useCounter = (end, duration = 1000, start = 0, isVisible = false) => {
  const [count, setCount] = useState(start);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }

    const elapsed = time - previousTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    setCount(Math.floor(progress * (end - start) + start));

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setCount(start);
      previousTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setCount(start);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible, end, duration, start]);

  return count;
};

export default useCounter; 