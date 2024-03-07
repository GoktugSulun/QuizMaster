import { Stack, alpha, useTheme } from '@mui/material';
import * as S from '../Style/Dashboard.style';
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import FilledLikeIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/BookmarkBorder';
import FilledSaveIcon from '@mui/icons-material/Bookmark';
import QuizPreviewFooter from './QuizPreviewFooter';
import QuizPreviewBody from './QuizPreviewBody';
import { CustomTooltip } from '@/Components/Tooltip';
import defaultImage from '@/Pngs/DefaultQuizImg.png';
import DashboardThunks from '../Store/Dashboard.thunk';
import { Loading } from '@/Core/Components';
import { useThunk } from '@/Core/Hooks';
import { IQuizResponse } from '@/Constants/ResponseTypes';
import { useState } from 'react';

const QuizPreview = (props: { data: IQuizResponse }) => {
   const { id, name, description, totalTime, image, isFavorite, isSaved } = props.data;
   const theme = useTheme();
   const [showFavoriteTooltip, setShowFavoriteTooltip] = useState(false);
   const [showSaveTooltip, setShowSaveTooltip] = useState(false);

   const { isLoading: isLoadingMarkFavorite } = useThunk("markQuizAsFavorite");
   const { isLoading: isLoadingUnmarkFavorite } = useThunk("unmarkQuizAsFavorite");
   const { isLoading: isLoadingMarkSaved } = useThunk("markQuizAsSaved");
   const { isLoading: isLoadingUnmarkSaved } = useThunk("unmarkQuizAsSaved");

   const markQuizAsFavorite = () => {
      DashboardThunks.markQuizAsFavorite({ quizId: id });
      setShowFavoriteTooltip(false);
   }

   const unmarkQuizAsFavorite = () => {
      DashboardThunks.unmarkQuizAsFavorite(id);
      setShowFavoriteTooltip(false);
   }

   const markQuizAsSaved = () => {
      DashboardThunks.markQuizAsSaved({ quizId: id });
      setShowSaveTooltip(false);
   }

   const unmarkQuizAsSaved = () => {
      DashboardThunks.unmarkQuizAsSaved(id);
      setShowSaveTooltip(false);
   }

   return (
      <S.QuizPreview>
         <S.Image src={image || defaultImage} alt="quiz" />
         <Stack 
            flexDirection="row" 
            justifyContent="space-between" 
            alignItems="center"
            padding="10px 15px"
         >
            <S.Category 
               color={alpha(theme.palette.primary.main, .6)} 
               $bgColor={theme.palette.custom.light}
               padding="5px 15px"
            > 
               {"Default category"} 
            </S.Category>
            <Stack flexDirection="row" alignItems="center" gap={1}>
               <CustomTooltip 
                  arrow 
                  placement="top" 
                  open={showFavoriteTooltip} 
                  onOpen={() => setShowFavoriteTooltip(true)}
                  onClose={() => setShowFavoriteTooltip(false)}
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
               >
                  <S.LikeButton 
                     disabled={isLoadingMarkFavorite || isLoadingUnmarkFavorite} 
                     onClick={isFavorite ? unmarkQuizAsFavorite : markQuizAsFavorite}
                  >
                     { 
                        (isLoadingMarkFavorite || isLoadingUnmarkFavorite) 
                           ? <Loading size={24} /> 
                           : isFavorite ? <FilledLikeIcon /> : <LikeIcon /> 
                     }
                  </S.LikeButton>
               </CustomTooltip>
               <CustomTooltip 
                  arrow 
                  placement="top" 
                  open={showSaveTooltip} 
                  onOpen={() => setShowSaveTooltip(true)}
                  onClose={() => setShowSaveTooltip(false)}
                  title={isSaved ? 'Remove from saved' : 'Add to saved'}
               >
                  <S.LikeButton 
                     disabled={isLoadingMarkSaved || isLoadingUnmarkSaved} 
                     onClick={isSaved ? unmarkQuizAsSaved : markQuizAsSaved}
                  >
                     { 
                        (isLoadingMarkSaved || isLoadingUnmarkSaved) 
                           ? <Loading size={24} /> 
                           : isSaved ? <FilledSaveIcon /> : <SaveIcon /> 
                     }
                  </S.LikeButton>
               </CustomTooltip>
            </Stack>
         </Stack>
         <Stack flex={1} gap={4}>
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
}

export default QuizPreview;