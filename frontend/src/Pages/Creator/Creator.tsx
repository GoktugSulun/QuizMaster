import { Stack, useTheme } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { type QuestionType } from './Model/Creator.model';

type DefaultValuesType = {
  quizId: number;
  activeIndex: number;
  questions: QuestionType[];
}

const defaultValues: DefaultValuesType = (
  {
    quizId: 1,
    activeIndex: 0,
    questions: [
      { name: "", options: [1,2,3,4].map(() => ({ name: "", isCorrect: false })) }
    ]
  }
);

const Creator = () => {
  const theme = useTheme();
  const form = useForm({ defaultValues });

  const formValues = useWatch({ control: form.control });
  console.log(formValues, ' formValues');
  
  console.log('creator top render');
  
  
  return (
    <FormProvider {...form}>
      <S.Creator>
        <Stack 
          flexDirection="row" 
          height="100%"
          borderTop={`1px solid ${theme.palette.secondary.light}`}
          borderBottom={`1px solid ${theme.palette.secondary.light}`}
          borderRadius="5px"
          bgcolor={theme.palette.common.white}
        >
          <Slides />
          <Question />
          <QuestionSettings />
        </Stack>
      </S.Creator>
    </FormProvider>
  )
}

export default Creator;
