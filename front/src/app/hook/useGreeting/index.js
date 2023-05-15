import { useState, useEffect } from 'react';

function useGreeting() {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();

    let newGreeting = '';
    if (hour >= 5 && hour < 12) {
      newGreeting = '¡Buenos días!';
    } else if (hour >= 12 && hour < 19) {
      newGreeting = '¡Buenas tardes!';
    } else {
      newGreeting = '¡Buenas noches!';
    }
    setGreeting(newGreeting);
  }, []);

  return greeting;
}

export default useGreeting;
