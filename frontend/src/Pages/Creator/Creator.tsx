import { Stack, useTheme } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';
import { CreatorHeader } from './Components/CreatorHeader';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { type QuestionType } from './Model/Creator.model';

type DefaultValuesType = {
  quizId: number;
  questions: QuestionType[];
}

const defaultValues: DefaultValuesType = (
  {
    quizId: 1,
    questions: [
      { name: "", options: [1,2,3,4].map(() => ({ name: "", isCorrect: false })) }
    ]
  }
);

const CreateQuiz = () => {
  const theme = useTheme();
  const form = useForm({ defaultValues });

  const formValues = useWatch({ control: form.control });
  console.log(formValues, ' formValues');
  
  
  return (
    <FormProvider {...form}>
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
      </S.CreateQuiz>
    </FormProvider>
  )
}

export default CreateQuiz;
