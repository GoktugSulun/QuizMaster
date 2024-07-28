import usePagination from '@mui/material/usePagination';
import * as S from '../Style/Quiz.style';
import { Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/Core/Hooks';
import { MutableRefObject } from 'react';
import { QuizThunks } from '../Store/Quiz.thunk';

/*
   TODO : 100 tane soru olduğunda aradaki sorulara ulaşmak çok zor
   * bir prop al ya da limit belirle (20 ve üstü gibi)
   * bu limitten yüksek olduğunda prev ve next buttonlarını paginationButton gibi yap
   * paginationButtonları en sağa ya da sola al, diğer tarafa da Autocomplete ekle, kullanıcı istediği soruya yazarak erişsin
*/

type QuizPaginationProps = {
   intervalRef: MutableRefObject<ReturnType<typeof setInterval> | null>;
}

const QuizPagination = ({ intervalRef }: QuizPaginationProps) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { quiz, answers, quizSession } = useAppSelector((state) => state.Quiz);
   
   const page = +(searchParams.get("question") as string);
   const { items } = usePagination({ page, count: quiz.questions.length });
   const isLastPage = page === items.filter((item) => item.type === 'page').length
   
   const changePageHandler = (newPage: number) => {
      const id = searchParams.get("id") as string;
      
      if (newPage !== +page) {
         setSearchParams({ id, question: `${newPage}` });
      }
   };  

   const changePageByDotsHandler = (type: 'start-ellipsis' | 'end-ellipsis', index: number) => {
      if (type === "start-ellipsis") {
         const newPage = (items[index + 1].page as number) - 1;
         changePageHandler(newPage);
      }

      if (type === "end-ellipsis") {
         const newPage = (items[index - 1].page as number) + 1;
         changePageHandler(newPage);
      }
   };

   // Time interval will be reseted because of cleanup function in QuizHeader component
   const completeQuizHandler = () => {
      if (intervalRef.current) {
         clearInterval(intervalRef.current);
      }
      QuizThunks.completeQuizSession({ 
         quizId: quiz.id, 
         quizSessionId: quizSession.id, 
         answers, 
         completeTime: new Date().getTime()
      })
   };
   
   return (
      <Stack flexDirection="row" justifyContent="space-between" gap={1} margin="30px 20px">
         <S.PaginationDirectionButton 
            startIcon={<ArrowBackIcon />}
            onClick={() => changePageHandler(page - 1)}
            disabled={page === 1}
         > 
            Prev 
         </S.PaginationDirectionButton>
         <Stack flex={1} gap={1} justifyContent="center" flexDirection="row">
            {
               items.map(({ page, type, selected, ...item }, index) => (
                  type === 'page' || type === 'start-ellipsis' || type === 'end-ellipsis'
                     ? <S.PaginationButton 
                        key={index}
                        $isSelected={selected}
                        {...item}
                        onClick={() => type === 'page' ? changePageHandler(page as number) : changePageByDotsHandler(type, index)}
                     > 
                        {type === 'page' ? page : '...'} 
                     </S.PaginationButton>
                     : null
               ))
            }
         </Stack>
         <S.PaginationDirectionButton 
            endIcon={isLastPage ? <DoneIcon /> : <ArrowForwardIcon />}
            onClick={() => isLastPage ? completeQuizHandler() : changePageHandler(page + 1)}
         > 
            { isLastPage ? 'Complete' : 'Next' } 
         </S.PaginationDirectionButton>
      </Stack>
   )
}

export default QuizPagination;