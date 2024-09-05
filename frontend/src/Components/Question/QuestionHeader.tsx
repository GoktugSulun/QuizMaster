import { Stack, Typography } from '@mui/material';
import * as S from './Style/Question.style';
import Time from './Components/Time';
import Icon from './Components/Icon';
import { PointEnums } from '@/Constants/Enums';

type QuestionHeaderWithTimeProps = {
  time?: string;
  questionNumber: string | number;
  name: string;
}

type QuestionHeaderWithIconProps = {
  time?: null;
  isCorrect: boolean;
  questionNumber: string | number;
  name: string;
  isBlank: boolean;
  point: PointEnums;
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
      <Stack>
        { 
          time 
            ? <Time time={time} /> 
            : (
                <Icon 
                  isBlank={'isBlank' in props ? props.isBlank : false} 
                  isCorrect={'isCorrect' in props ? props.isCorrect : false} 
                  point={'point' in props ? props.point : PointEnums.STANDART} 
                />
            )
        }
      </Stack>
    </S.QuestionHeader>
  )
}

export default QuestionHeader