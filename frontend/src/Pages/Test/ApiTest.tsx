
const ApiTest = () => {

   const getAll = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/app/quizzes`);
      const data = await response.json();
      console.log('All Data:');
      console.log(data);
      console.log('');
   }

   const create = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/app/quizzes`, { method: 'POST' });
      const data = await response.json();
      console.log('Created Data:');
      console.log(data);
      console.log('');
   }

   return (
      <div style={{ display: 'flex', gap: 10 }}>
         <button onClick={getAll}> Get All </button>
         <button onClick={create}> Create </button>
      </div>
   )
}

export default ApiTest