import { Stack } from '@mui/material';
import * as S from '../Style/Dashboard.style';
import QuizPreviewFooter from './QuizPreviewFooter';
import QuizPreviewBody from './QuizPreviewBody';
import { IQuizResponse } from '@/Constants/ResponseTypes';
import { Ref, forwardRef } from 'react';
import QuizPreviewHeader from './QuizPreviewHeader';

type QuizPreviewType = {
   data: IQuizResponse,
}

const QuizPreview = forwardRef((props: QuizPreviewType, ref: Ref<HTMLDivElement> | null) => {
   const { id, name, description, totalTime, image, isFavorite, isSaved } = props.data;

   return (
      <S.QuizPreview {...(ref) ? { ref } : {}}>
         <QuizPreviewHeader
            image={image}
            isFavorite={isFavorite}
            isSaved={isSaved}
            id={id}
         />
         <Stack 
            paddingTop="10px"
            flex={1} 
            gap={4}
         >
            <QuizPreviewBody 
               id={id} 
               name={name} 
               description={description} 
            />
            <QuizPreviewFooter 
               id={id} 
               totalTime={totalTime} 
            />
         </Stack>
      </S.QuizPreview>
   )
});

export default QuizPreview;