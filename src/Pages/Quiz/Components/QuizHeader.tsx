import { Stack, Typography } from '@mui/material';
import * as S from '../Style/Quiz.style';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const QuizHeader = () => {
  return (
    <S.QuizHeader flexDirection="row" alignItems="flex-start" gap={2}>
      <Stack alignSelf="center" flexDirection="row" flex={1}>
         <Typography 
            fontWeight="bold" 
            marginRight={2} 
            fontSize={20} 
            variant="body1"
         > 
            1) 
         </Typography>
         <Typography alignSelf="center" paragraph fontSize={20} flex={1}> Aşağıdakilerden hangisi asal sayı çarpanlarına bölünebilen bir sayıdır ? </Typography> 
      </Stack>
      <S.Time flexDirection="row" alignItems="center" gap={1}>
         <AccessAlarmIcon sx={{ width: 30, height: 30 }} color="primary" />
         <Typography fontWeight="bold" color="primary.main" fontSize={25}> 15:30 </Typography>
      </S.Time>
    </S.QuizHeader>
  )
}

export default QuizHeader