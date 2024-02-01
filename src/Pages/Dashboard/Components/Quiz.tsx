import { Box, Button, Stack, Tooltip } from '@mui/material';
import * as S from '../Style/Dashboard.style';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

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
   const navigate = useNavigate();

   const navigateHandler = () => {
      navigate(`/quiz/${id}`);
   };

   return (
      <S.Quiz onClick={navigateHandler}>
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
            <Stack flex={1}>
               <Box sx={{ padding: '0 20px', flex: 1 }} >
                  <Tooltip 
                     title={title} 
                     placement="bottom-start"
                     slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [0, -8],
                              },
                            },
                          ],
                        },
                      }}
                  >
                     <S.EllipsisText 
                        $maxRow={1} 
                        fontSize={22} 
                        variant="h6"
                        lineHeight={1.4}
                     > 
                        <S.Link to=""> {title} </S.Link> 
                     </S.EllipsisText >
                  </Tooltip>
                  <S.EllipsisText 
                     sx={{ marginTop: 2, color: '#5e5e5e' }} 
                     $maxRow={3} 
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
                  gap={1}
                  flexWrap="wrap"
               > 
                  <Box sx={{ color: '#5e5e5e', background: '#ececec', borderRadius: 2, padding: '5px 10px' }}> 
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
                  <Button sx={{ padding: "5px 30px", ":hover": { padding: "5px 40px" } }} > START </Button> 
               </Stack>
            </Stack>
         </Stack>
      </S.Quiz>
   )
}

export default Quiz