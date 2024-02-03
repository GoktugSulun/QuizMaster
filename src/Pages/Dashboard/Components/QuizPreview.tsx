import { Stack, Tooltip } from '@mui/material';
import * as S from '../Style/Dashboard.style';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuizPreviewFooter from './QuizPreviewFooter';
import QuizPreviewBody from './QuizPreviewBody';

type QuizPreviewProps = {
   data: {
      id: number;
      title: string;
      description: string;
      created_at: Date;
      updated_at: Date;
      time: string;
      img: string;
      liked: boolean
   }
};

const QuizPreview = (props: QuizPreviewProps) => {
   const { id, title, description, time, img, liked } = props.data;

   return (
      <S.QuizPreview>
         <Tooltip title={liked ? 'Unlike' : 'Like'}>
            <S.LikeButton>
               { liked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </S.LikeButton>
         </Tooltip>
         <Stack height="100%">
            <S.Image src={img} alt={`Quiz with id ${id}`} />
            <S.Category 
               alignSelf="start" 
               color="#8175c0" 
               $bgColor="#EDEAFB"
            > 
               Mathematics 
            </S.Category>
            <Stack flex={1} gap={4}>
               <QuizPreviewBody id={id} title={title} description={description} />
               <QuizPreviewFooter id={id} time={time} />
            </Stack>
         </Stack>
      </S.QuizPreview>
   )
}

export default QuizPreview;