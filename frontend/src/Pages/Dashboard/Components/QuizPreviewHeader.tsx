import * as S from '../Style/Dashboard.style';
import defaultImage from '@/Pngs/DefaultQuizImg.png';
import AdminButtons from './AdminButtons';
import UserButtons from './UserButtons';
import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { TooltipTypes } from '../Types/DashboardTypes';
import { RouteEnums } from '@/Constants/Enums';
import CompletedQuizButtons from './CompletedQuizButtons';

type QuizPreviewHeaderProps = {
   image: string | null;
   isFavorite: boolean;
   isSaved: boolean;
   id: string;
}

const QuizPreviewHeader = (props: QuizPreviewHeaderProps) => {
   const { image, isFavorite, isSaved, id } = props;
   const location = useLocation();
   const [tooltip, setTooltip] = useState<TooltipTypes>({ delete: false, edit: false, favorite: false, save: false, result: false });
   const isInCreatedPage = location.pathname === RouteEnums.CREATED;
   const isInCompletedPage = location.pathname === RouteEnums.COMPLETED;

   return (
      <>
         <S.Image src={image || defaultImage} alt="quiz" />
         <Stack
            flexDirection="row" 
            alignItems="center" 
            justifyContent={(isInCreatedPage || isInCompletedPage) ? "space-between" : "flex-end"}
            gap={1}
            position="absolute"
            padding="10px"
            width="100%"
         >
            { isInCreatedPage && <AdminButtons tooltipState={[tooltip, setTooltip]} id={id} /> }
            { isInCompletedPage && <CompletedQuizButtons tooltipState={[tooltip, setTooltip]} id={id} /> }
            <UserButtons
               tooltipState={[tooltip, setTooltip]}
               isFavorite={isFavorite}
               isSaved={isSaved}
               id={id}
            />
         </Stack>
      </>
   )
}

export default QuizPreviewHeader