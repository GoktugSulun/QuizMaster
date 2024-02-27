import { Stack } from '@mui/material';
import * as S from '../Style/Dashboard.style';
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import FilledLikeIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/BookmarkBorder';
import FilledSaveIcon from '@mui/icons-material/Bookmark';
import QuizPreviewFooter from './QuizPreviewFooter';
import QuizPreviewBody from './QuizPreviewBody';
import { CustomTooltip } from '@/Components/Tooltip';
// import defaultImage from '@/Pngs/DefaultQuizImage.png';
import defaultImage from '@/Pngs/DefaultQuizImg.png';
import { type CreatedQuizType } from '../Store/Dashboard.slice';

const QuizPreview = (props: { data: CreatedQuizType
 }) => {
   const { id, name, description, totalTime, image } = props.data;

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
               color="#8175c0" 
               $bgColor="#EDEAFB"
               padding="5px 15px"
            > 
               {"Default category"} 
            </S.Category>
            <Stack flexDirection="row" alignItems="center" gap={1}>
               <CustomTooltip 
                  arrow 
                  placement="top" 
                  title={false ? 'Unlike' : 'Like'}
               >
                  <S.LikeButton>
                     { false ? <FilledLikeIcon /> : <LikeIcon /> }
                  </S.LikeButton>
               </CustomTooltip>
               <CustomTooltip 
                  arrow 
                  placement="top" 
                  title={false ? 'Unsave' : 'Save'}
               >
                  <S.LikeButton>
                     { false ? <FilledSaveIcon /> : <SaveIcon /> }
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