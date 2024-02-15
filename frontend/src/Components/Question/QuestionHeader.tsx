import { Stack, Typography } from '@mui/material';
import * as S from './Style/Question.style';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CorrectIcon from '@mui/icons-material/CheckCircle';
import WrongIcon from '@mui/icons-material/Cancel';

type QuestionHeaderWithTimeProps = {
  time?: string;
  questionNumber: string | number,
  name: string,
}

type QuestionHeaderWithIconProps = {
  time?: null;
  isCorrect: boolean;
  questionNumber: string | number,
  name: string,
}

type QuestionHeaderProps = QuestionHeaderWithTimeProps | QuestionHeaderWithIconProps;

const QuestionHeader = (props: QuestionHeaderProps) => {
  const { questionNumber, name, time=null } = props;
  
  return (
    <S.QuestionHeader 
      flexDirection="row" 
      alignItems="flex-start" 
      gap={2}
    >
      <Stack 
        alignSelf="center" 
        flexDirection="row"
        flex={1}
      >
        <Typography 
          fontWeight="bold" 
          marginRight={2} 
          fontSize={20} 
          variant="body1"
        > 
          {questionNumber}) 
        </Typography>
        <Typography 
          alignSelf="center" 
          paragraph 
          fontSize={20} 
          flex={1}
        > 
          {name} 
        </Typography> 
      </Stack>
      {
        time 
          ? (
            <S.Time 
              flexDirection="row" 
              alignItems="center" 
              gap={1}
            >
              <AccessAlarmIcon sx={{ width: 30, height: 30 }} color="primary" />
              <Typography 
                fontWeight="bold" 
                color="primary.main" 
                fontSize={25}
              > 
                {time} 
              </Typography>
            </S.Time>
          )
          : (
            <Stack>
              {('isCorrect' in props && props.isCorrect) ? <CorrectIcon color="success" /> : <WrongIcon color="error" />}
            </Stack>
          )
      }
    </S.QuestionHeader>
  )
}

export default QuestionHeader