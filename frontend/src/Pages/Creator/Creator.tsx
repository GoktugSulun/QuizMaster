import { Stack } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { QuizSettings } from './Components/QuizSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';
import { CreatorHeader } from './Components/CreatorHeader';

const CreateQuiz = () => {
  return (
    <S.CreateQuiz>
      <CreatorHeader />
      <Stack flexDirection="row">
        <Slides />
        <Question />
        <QuestionSettings />
      </Stack>
      {/* <QuizSettings /> => MODAL */}
    </S.CreateQuiz>
  )
}

export default CreateQuiz