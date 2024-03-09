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
            alignItems="center" 
            gap={1}
            position="absolute"
            top="10px"
            right="10px"
         >
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
                  sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
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
               <S.SaveButton 
                  disabled={isLoadingMarkSaved || isLoadingUnmarkSaved} 
                  onClick={isSaved ? unmarkQuizAsSaved : markQuizAsSaved}
                  sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
               >
                  { 
                     (isLoadingMarkSaved || isLoadingUnmarkSaved) 
                        ? <Loading size={24} /> 
                        : isSaved ? <FilledSaveIcon /> : <SaveIcon /> 
                  }
               </S.SaveButton>
            </CustomTooltip>
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
}

export default QuizPreview;