import { Stack, useTheme } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { CorrectOptionEnums, PointEnums, QuestionEnums, type QuestionType } from './Model/Creator.model';
import { Header } from '@/Components/Header';
import { useEffect } from 'react';

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
      { 
        name: "", 
        options: [1,2,3,4].map(() => ({ name: "", isCorrect: false })), 
        type: QuestionEnums.MULTIPLE_CHOICE,
        point: PointEnums.STANDART,
        optionType: CorrectOptionEnums.SINGLE_OPTION
      }
    ]
  }
);

const Creator = () => {
  const theme = useTheme();
  const form = useForm({ defaultValues });

  const formValues = useWatch({ control: form.control });
  console.log(formValues, ' formValues');

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.code === "ArrowUp") {
        const activeIndex = form.getValues("activeIndex") as number;
        if (activeIndex !== 0) {
          form.setValue("activeIndex", activeIndex - 1);
        }
        return;
      }
      if (event.code === "ArrowDown") {
        const [activeIndex, questions] = form.getValues(["activeIndex", "questions"]) as [number, QuestionType[]];
        if (activeIndex !== questions.length - 1) {
          form.setValue("activeIndex", activeIndex + 1);
        }
        return;
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);
  
  return (
    <FormProvider {...form}>
      <Header />
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
