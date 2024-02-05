import { Stack, Typography } from '@mui/material';
import * as S from './Style/Question.style';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

type QuestionHeaderProps = {
  questionNumber: string | number,
  name: string,
  time?: string | null
}

const QuestionHeader = ({ questionNumber, name, time=null }: QuestionHeaderProps) => {
  return (
    <S.QuestionHeader flexDirection="row" alignItems="flex-start" gap={2}>
        <Stack alignSelf="center" flexDirection="row" flex={1}>
          <Typography 
              fontWeight="bold" 
              marginRight={2} 
              fontSize={20} 
              variant="body1"
          > 
              {questionNumber}) 
          </Typography>
          <Typography alignSelf="center" paragraph fontSize={20} flex={1}> {name} </Typography> 
        </Stack>
        {
          time && (
            <S.Time flexDirection="row" alignItems="center" gap={1}>
              <AccessAlarmIcon sx={{ width: 30, height: 30 }} color="primary" />
              <Typography fontWeight="bold" color="primary.main" fontSize={25}> {time} </Typography>
            </S.Time>
          )
        }
    </S.QuestionHeader>
  )
}

export default QuestionHeader