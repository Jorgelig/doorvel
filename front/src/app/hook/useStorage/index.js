// app/hooks/useStorage.js
import { useEffect, useState } from 'react';
import { getItem, setItem, removeItem } from '@/app/services/storage';

export const UserNameKey = 'UserName';


export const useStorage = (key) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const storedValue = getItem(key);
    if (storedValue) {
      setValue(storedValue);
    }
  }, [key]);

  const saveValue = (newValue) => {
    setValue(newValue);
    setItem(key, newValue);
  };

  const removeValue = () => {
    setValue(null);
    removeItem(key);
  };

  return [value, saveValue, removeValue];
};

export default useStorage;
