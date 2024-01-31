import { useState, useEffect, useCallback, useRef } from 'react';

const useTimer = (initialSeconds = 0) => {
  const [time, setTime] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!isActive) {
      setTime(initialSeconds);
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  }, [isActive, initialSeconds]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
  }, []);

  const refreshTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(initialSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);

  return { formattedTime, startTimer, pauseTimer, refreshTimer };
};

export default useTimer;
