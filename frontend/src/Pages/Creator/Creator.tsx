import { Stack } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { QuizSettings } from './Components/QuizSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';

const CreateQuiz = () => {
  return (
    <S.CreateQuiz>
      <QuizSettings />
      <Stack flexDirection="row">
        <Slides />
        <Question />
        <QuestionSettings />
      </Stack>
    </S.CreateQuiz>
  )
}

export default CreateQuiz