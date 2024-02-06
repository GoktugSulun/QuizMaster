import { useEffect } from 'react';
import { useNotifier } from './Core/Hooks';
import { Routes } from './Core/Routes';

const App = () => {
  useNotifier();
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/test");
      const data = await res.json();
      console.log('data ', data);
    }
    fetchData();
  }, [])
  
  
  return (
    <Routes />
  );
};

export default App;