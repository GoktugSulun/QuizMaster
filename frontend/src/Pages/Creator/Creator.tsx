import { Stack, useTheme } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';
import { FormProvider, useForm } from 'react-hook-form';
import { VisibilityEnums, CorrectOptionEnums, PointEnums, QuestionEnums, type QuestionType } from './Model/Creator.model';
import { Header } from '@/Components/Header';
import { useEffect } from 'react';
import { QuizSettings } from './Components/QuizSettings';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/Core/Hooks';
import { CreatorActions } from './Store/Creator.slice';

type DefaultValuesType = {
  name: string;
  description: string;
  visibility: VisibilityEnums,
  quizId: number;
  activeIndex: number;
  questions: QuestionType[];
}

const defaultValues: DefaultValuesType = (
  {
    name: "",
    description: "",
    visibility: VisibilityEnums.PUBLIC,
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

/*
   ? Optional param => quizId
   * Firstly, 
      * if there is no quizId and quizSettings modal will be opened to create a quiz and get its id.
      * if there is a quizId, dont open quizSettings modal.
   ! If "id" or "question" query is missing, then navigate user to dashboard.
*/

const Creator = () => {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useAppDispatch();
  const form = useForm({ defaultValues });

  // const formValues = useWatch({ control: form.control });
  // console.log(formValues, ' formValues');

  useEffect(() => {
    if (!params.quizId) {
      console.log('open => ', params);
      
       dispatch(CreatorActions.setIsOpenQuizSettingsModal('OPEN'));
    }
 }, [params.quizId]);

  //* Navigate slides using keyboard
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
      <QuizSettings />
    </FormProvider>
  )
}

export default Creator;
