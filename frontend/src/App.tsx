import { useNotifier } from './Core/Hooks';
import { Routes } from './Core/Routes';

const App = () => {
  useNotifier();
  
  return (
    <Routes />
  );
};

export default App;