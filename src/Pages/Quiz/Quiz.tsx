import { useSearchParams } from 'react-router-dom';
import * as S from './Style/Quiz.style';
import { useEffect } from 'react';

const Quiz = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   useEffect(() => {
      console.log(searchParams, 'searchParams');
      
   }, [searchParams]);

   return (
      <S.Quiz>Quiz detayııı </S.Quiz>
   )
}

export default Quiz