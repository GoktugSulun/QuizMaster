import * as S from '../../Style/Creator.style';
import QuestionHeader from './Components/QuestionHeader';
import Options from './Components/Options';
import { type Theme, useMediaQuery, useTheme } from '@mui/material';

const Question = () => {
  const theme = useTheme();
  const isBelowLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
   
  return (
    <S.Question sx={{ borderLeft: isBelowLg ? "none" : `1px solid ${theme.palette.secondary.light}` }}>
      <QuestionHeader />
      <Options />
    </S.Question>
  )
}

export default Question