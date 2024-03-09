import { Stack } from '@mui/material';
import * as S from '../Style/Dashboard.style';
import QuizPreviewFooter from './QuizPreviewFooter';
import QuizPreviewBody from './QuizPreviewBody';
import defaultImage from '@/Pngs/DefaultQuizImg.png';
import { IQuizResponse } from '@/Constants/ResponseTypes';
import { Ref, forwardRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteEnums } from '@/Constants/Enums';
import AdminButtons from './AdminButtons';
import { TooltipTypes } from '../Types/DashboardTypes';
import UserButtons from './UserButtons';

type QuizPreviewType = {
   data: IQuizResponse,
}

const QuizPreview = forwardRef((props: QuizPreviewType, ref: Ref<HTMLDivElement> | null) => {
   const { id, name, description, totalTime, image, isFavorite, isSaved } = props.data;
   const location = useLocation();
   const [tooltip, setTooltip] = useState<TooltipTypes>({ delete: false, edit: false, favorite: false, save: false });
   const isInCreatedPage = location.pathname === RouteEnums.CREATED;

   return (
      <S.QuizPreview {...(ref) ? { ref } : {}}>
         <S.Image src={image || defaultImage} alt="quiz" />
         <Stack
            flexDirection="row" 
            alignItems="center" 
            justifyContent={isInCreatedPage ? "space-between" : "flex-end"}
            gap={1}
            position="absolute"
            padding="10px"
            width="100%"
         >
            { isInCreatedPage && <AdminButtons tooltipState={[tooltip, setTooltip]} id={id} /> }
            <UserButtons
               tooltipState={[tooltip, setTooltip]}
               isFavorite={isFavorite}
               isSaved={isSaved}
               id={id}
            />
         </Stack>
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