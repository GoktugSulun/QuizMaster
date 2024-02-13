import { Stack, useTheme } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { QuizSettings } from './Components/QuizSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';
import { CreatorHeader } from './Components/CreatorHeader';

const CreateQuiz = () => {
  const theme = useTheme();

  return (
    <S.CreateQuiz>
      <CreatorHeader />
      <Stack 
        flexDirection="row" 
        flex={1}
        borderTop={`1px solid ${theme.palette.secondary.light}`}
        borderBottom={`1px solid ${theme.palette.secondary.light}`}
        borderRadius="5px"
        bgcolor={theme.palette.common.white}
      >
        <Slides />
        <Question />
        <QuestionSettings />
      </Stack>
      {/* <QuizSettings /> => MODAL */}
    </S.CreateQuiz>
  )
}

export default CreateQuiz