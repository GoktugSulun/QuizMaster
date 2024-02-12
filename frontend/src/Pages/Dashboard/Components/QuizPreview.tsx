import { Stack } from '@mui/material';
import * as S from '../Style/Dashboard.style';
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import FilledLikeIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/BookmarkBorder';
import FilledSaveIcon from '@mui/icons-material/Bookmark';
import QuizPreviewFooter from './QuizPreviewFooter';
import QuizPreviewBody from './QuizPreviewBody';
import { CustomTooltip } from '@/Components/Tooltip';

type QuizPreviewProps = {
   data: {
      id: number;
      title: string;
      description: string;
      category: string;
      created_at: Date;
      updated_at: Date;
      time: string;
      img: string;
      liked: boolean;
      saved: boolean;
   }
};


const QuizPreview = (props: QuizPreviewProps) => {
   const { id, title, description, category, time, img, liked, saved } = props.data;

   return (
      <S.QuizPreview>
         <Stack 
            flexDirection="row" 
            justifyContent="space-between" 
            alignItems="center"
            padding="10px 15px"
         >
            <S.Category 
               color="#8175c0" 
               $bgColor="#EDEAFB"
               padding="5px 15px"
            > 
               {category} 
            </S.Category>
            <Stack flexDirection="row" alignItems="center" gap={1}>
               <CustomTooltip arrow placement="top" title={liked ? 'Unlike' : 'Like'}>
                  <S.LikeButton>
                     { liked ? <FilledLikeIcon /> : <LikeIcon /> }
                  </S.LikeButton>
               </CustomTooltip>
               <CustomTooltip arrow placement="top" title={saved ? 'Unsave' : 'Save'}>
                  <S.LikeButton>
                     { saved ? <FilledSaveIcon /> : <SaveIcon /> }
                  </S.LikeButton>
               </CustomTooltip>
            </Stack>
         </Stack>
         <Stack flex={1} gap={4}>
            <QuizPreviewBody id={id} title={title} description={description} />
            <QuizPreviewFooter id={id} time={time} />
         </Stack>
      </S.QuizPreview>
   )
}

export default QuizPreview;