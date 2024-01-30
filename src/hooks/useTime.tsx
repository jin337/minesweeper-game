import { useState, useEffect, useCallback } from 'react';

const useTimer = (initialSeconds = 0) => {
  const [time, setTime] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const refreshTimer = useCallback(() => {
    setTime(initialSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== initialSeconds) {
      setTime(initialSeconds);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, initialSeconds, time]);

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);

  return { formattedTime, startTimer, refreshTimer };
};

export default useTimer;