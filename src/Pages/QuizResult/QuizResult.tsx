import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/QuizResult.style';

/*
   ? Required searchParams => id 
   * This component must be displayed when the url is like that => /result/quiz?id=1
   ! If "id" query is missing, then navigate user to dashboard.
*/

const QuizResult = () => {
   const [searchParams] = useSearchParams();
   const quizId = searchParams.get("id") as string;

   // Todo : /result/quiz?id=null ya da /result/quiz?id=aaa gibi durumlar için de kontrol yap, belki istek sonrası error ise bulunamadı gibi bir component render edilebilir.
   if (!quizId) { 
      return <Navigate to="/" replace />
   }

   return (
      <S.QuizResult>
         <S.QuizResultContent>
            Result -- some graph and data
         </S.QuizResultContent>
      </S.QuizResult>
   )
}

export default QuizResult;