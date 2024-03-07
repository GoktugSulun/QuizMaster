import { Stack, useTheme } from '@mui/material';
import { Question } from './Components/Question';
import { QuestionSettings } from './Components/QuestionSettings';
import { Slides } from './Components/Slides';
import * as S from './Style/Creator.style';
import { FormProvider, useForm } from 'react-hook-form';
import { VisibilityEnums, CorrectOptionEnums, PointEnums, QuestionEnums, type QuestionType } from './Types/CreatorTypes';
import { Header } from '@/Components/Header';
import { useEffect } from 'react';
import { QuizSettings } from './Components/QuizSettings';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useThunk } from '@/Core/Hooks';
import { CreatorActions } from './Store/Creator.slice';
import CreatorThunks from './Store/Creator.thunk';
import { Loading } from '@/Core/Components';

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
      * (CREATE): if there is no "quizId" param, quizSettings modal will be opened to create a quiz and get its id.
      * (EDIT): if "quizId" param exists, dont open quizSettings modal.
      * (EDIT): if "quizId" param exists but quiz object in redux is empty, then fetch quiz info using "quizId" param.
   ! If fetching status is failure, then display an "failure" message
   ! If quiz doesnt exist with that id, then display an "no-data" message
*/

const Creator = () => {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useAppDispatch();
  const form = useForm({ defaultValues });
  const quizId = useAppSelector((state) => state.Creator.quiz.id);

  // const formValues = useWatch({ control: form.control });
  // console.log(formValues, ' formValues');

  const { isLoading } = useThunk("getQuizByIdWithQuestions");

  useEffect(() => {
    //* Create a new quiz
    if (!params.quizId) {
       dispatch(CreatorActions.setIsOpenQuizSettingsModal('OPEN'));
    }

    //* Edit an existing quiz whether it has questions or not.
    if (params.quizId && !quizId) {
      CreatorThunks.getQuizById(params.quizId);
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
      dispatch(CreatorActions.reset());
    };
  }, []);
  
  return (
    <FormProvider {...form}>
      <Header />
      <S.Creator>
        <Stack 
          flexDirection="row" 
          height="100%"
          borderTop={isLoading ? "none" : `1px solid ${theme.palette.secondary.light}`}
          borderBottom={isLoading ? "none" : `1px solid ${theme.palette.secondary.light}`}
          borderRadius="5px"
          bgcolor={theme.palette.common.white}
          position="relative"
        >
          { isLoading && <Loading fullWidth blur={2} size={60} /> }
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
