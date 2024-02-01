import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import * as S from './Style/Quiz.style';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type QuizProps = {
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

const Quiz = (props: QuizProps) => {
   const { id, title, description, time, img, liked } = props.data;

   return (
      <S.Quiz>
         <Tooltip title={liked ? 'Unlike' : 'Like'}>
            <S.LikeButton>
               { liked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </S.LikeButton>
         </Tooltip>
         <Stack height="100%">
            <S.Image src={img} alt={`Quiz with id ${id}`} />
            <S.Category 
               alignSelf="start" 
               color="#938CB5" 
               $bgColor="#EDEAFB"
            > 
               Mathematics 
            </S.Category>
            <Stack flex={1}>
               <Box sx={{ padding: '0 20px', flex: 1 }} >
                  <S.EllipsisText 
                     maxRow={2} 
                     fontSize={22} 
                     variant="h6"
                     lineHeight={1.4}
                  > 
                     <S.Link to="/saves"> {title} </S.Link> 
                  </S.EllipsisText >
                  <S.EllipsisText 
                     sx={{ marginTop: 2, color: '#5e5e5e' }} 
                     maxRow={3} 
                     fontSize={14} 
                     paragraph
                  > 
                     {description} 
                  </S.EllipsisText>
               </Box>
               <Stack 
                  padding="0 20px 15px" 
                  flexDirection="row" 
                  justifyContent="space-between"
               > 
                  <Box sx={{ color: '#5e5e5e', background: '#e0e0e0', borderRadius: 2, padding: '5px 10px' }}> 
                     <Stack 
                        height="100%" 
                        flexDirection="row" 
                        alignItems="center" 
                        gap={1}
                     >
                        <AccessAlarmsIcon />
                        {time}
                     </Stack>
                  </Box>
                  <Button sx={{ padding: "5px 30px" }} > START </Button> 
               </Stack>
            </Stack>
         </Stack>
      </S.Quiz>
   )
}

export default Quiz