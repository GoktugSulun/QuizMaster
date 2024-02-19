import { useNotifier } from './Core/Hooks';
import { Routes } from './Core/Routes';

const App = () => {
  useNotifier();

  console.log('render');
  
  
  return (
    <Routes />
  );
};

export default App;