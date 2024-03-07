import * as S from '../../Style/Creator.style';
import QuizIcon from '@mui/icons-material/Quiz';
import RewardIcon from '@mui/icons-material/MilitaryTech';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CorrectOptionEnums, PointEnums, QuestionEnums, type QuestionType } from '../../Types/CreatorTypes';
import { Button, Divider, IconButton, Stack, alpha, useTheme } from '@mui/material';
import OptionsIcon from '@mui/icons-material/Apps';
import { CustomTooltip } from '@/Components/Tooltip';
import InputGroup from './Components/InputGroup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';

const QuestionSettings = () => {
   const theme = useTheme();
   const form = useFormContext();
   const [isOpen, setIsOpen] = useState(true);
   
   const questions = useFieldArray({ name: "questions", control: form.control });
   const watchedQuestions = form.watch("questions") as QuestionType[];

   const activeIndex = form.watch("activeIndex") as number;
   const questionType = form.watch(`questions.${activeIndex}.type`);

   const setIsOpenHandler = () => {
      setIsOpen(!isOpen);
   };

   const duplicateQuestionHandler = () => {
      const field = form.getValues(`questions.${activeIndex}`)
      const { id, ...fieldData } = field;
      const duplicatedQuestion = { ...fieldData };
      questions.insert(activeIndex + 1, duplicatedQuestion);
      form.setValue("activeIndex", activeIndex + 1);
   };

   const removeQuestionHandler = () => {
      if (watchedQuestions.length === 1) {
         return alert("Cannot delete!");
      }
      if (watchedQuestions.length - 1 === activeIndex) {
         form.setValue("activeIndex", activeIndex - 1);
      }
      questions.remove(activeIndex);
   };

   return (
      <S.QuestionSettings 
         width={isOpen ? 300 : 0}
         sx={{ transition: "width 500ms" }}
      >
         <CustomTooltip 
            title={isOpen ? "Close Question Settings" : "Open Question Settings"}
            arrow
            placement="left"
         >
            <IconButton className="toggle" onClick={setIsOpenHandler}>
               { isOpen ? <ArrowForwardIcon /> : <ArrowBackIcon /> }
            </IconButton>
         </CustomTooltip>
         <Stack 
            width="100%" 
            height="100%"
            overflow="hidden" 
            padding="20px"
            {...(isOpen 
               ? { borderRight: `1px solid ${theme.palette.secondary.light}`, opacity: 1, visibility: "visible" }
               : { opacity: 0, visibility: "hidden" }
            )}
         >
            <Stack 
               flex={1} 
               marginTop="20px"
            >
               <InputGroup
                  label="Question Type"
                  icon={() => <QuizIcon sx={{ color: "primary.main", marginRight: "5px" }} />}
                  name="type"
                  options={[
                     { id: QuestionEnums.MULTIPLE_CHOICE, name: QuestionEnums.MULTIPLE_CHOICE},
                     { id: QuestionEnums.TRUE_FALSE, name: QuestionEnums.TRUE_FALSE },
                     { id: QuestionEnums.SHORT_ANSWER, name: QuestionEnums.SHORT_ANSWER },
                  ]}
               />
               <Divider sx={{ margin: "30px 0" }} />
               <Stack gap="30px">
                  <InputGroup
                     label="Point"
                     icon={() => <RewardIcon sx={{ color: "primary.main", marginRight: "5px" }} />}
                     name="point"
                     options={[
                        { id: PointEnums.STANDART, name: PointEnums.STANDART },
                        { id: PointEnums.DOUBLE_UP, name: PointEnums.DOUBLE_UP },
                     ]}
                  />
                  <InputGroup
                     label="Options"
                     icon={() => <OptionsIcon sx={{ color: "primary.main", marginRight: "5px" }} />}
                     name="optionType"
                     options={[
                        { id: CorrectOptionEnums.SINGLE_OPTION, name: CorrectOptionEnums.SINGLE_OPTION },
                        { id: CorrectOptionEnums.MULTIPLE_OPTIONS, name: CorrectOptionEnums.MULTIPLE_OPTIONS },
                     ]}
                     condition={questionType === QuestionEnums.MULTIPLE_CHOICE}
                  />
               </Stack>
            </Stack>
            <Divider sx={{ margin: "20px 0" }} />
            <Stack 
               flexDirection="row" 
               justifyItems="center" 
               alignItems="center"
               gap="10px"
            >
               <CustomTooltip 
                  title="Delete"
                  placement="top"
                  arrow
                  $bgColor={alpha(theme.palette.error.light, .3)}
                  $color={theme.palette.error.main}
               >
                  <Button 
                     sx={{ 
                        background: "transparent",
                        border: `1px solid ${theme.palette.primary.main}`,
                        color: "primary.main",
                        flex: 1,
                        '&:hover': {
                           background: theme.palette.error.main,
                           color: theme.palette.common.white,
                           borderColor: theme.palette.error.main, 
                        }
                     }}
                     onClick={removeQuestionHandler}
                  > 
                     Delete 
                  </Button>
               </CustomTooltip>
               <CustomTooltip
                  title="Duplicate"
                  placement="top"
                  arrow
               >
                  <Button onClick={duplicateQuestionHandler} sx={{ flex: 2 }}> Duplicate </Button>
               </CustomTooltip>
            </Stack>
         </Stack>
      </S.QuestionSettings>
   )
}

export default QuestionSettings;
