import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [confirmedValue, setConfirmedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return confirmedValue;
};

export default useDebounce;
