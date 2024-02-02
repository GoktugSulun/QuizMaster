import usePagination from '@mui/material/usePagination';
import * as S from '../Style/Quiz.style';
import { Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSearchParams } from 'react-router-dom';

type QuizPagination = {
   siblingCount?: number;
   count: number;
}

const QuizPagination = ({ siblingCount=1, count }: QuizPagination) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const page = +(searchParams.get("question") as string);

   const { items } = usePagination({ page, siblingCount, count });

   const handleClick = (newPage: number) => {
      const id = searchParams.get("id") as string;
      setSearchParams({ id, question: `${newPage}` });
   };  

   const handleClickDots = (type: 'start-ellipsis' | 'end-ellipsis', index: number) => {
      if (type === "start-ellipsis") {
         const newPage = (items[index + 1].page as number) - 1;
         handleClick(newPage);
      }

      if (type === "end-ellipsis") {
         const newPage = (items[index - 1].page as number) + 1;
         handleClick(newPage);
      }
   };
   
   return (
      <Stack flexDirection="row" justifyContent="space-between" gap={1} margin="30px 20px">
         <S.PaginationDirectionButton 
            startIcon={<ArrowBackIcon />}
            onClick={() => handleClick(page - 1)}
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
                        onClick={() => type === 'page' ? handleClick(page as number) : handleClickDots(type, index)}
                     > 
                        {type === 'page' ? page : '...'} 
                     </S.PaginationButton>
                     : null
               ))
            }
         </Stack>
         <S.PaginationDirectionButton 
            endIcon={<ArrowForwardIcon />}
            onClick={() => handleClick(page + 1)}
            disabled={page === items.length + 1}
         > 
            Next 
         </S.PaginationDirectionButton>
      </Stack>
   )
}

export default QuizPagination;