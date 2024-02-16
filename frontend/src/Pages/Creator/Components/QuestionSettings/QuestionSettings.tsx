import * as S from '../../Style/Creator.style';
import QuizIcon from '@mui/icons-material/Quiz';
import RewardIcon from '@mui/icons-material/MilitaryTech';
import { useFormContext } from 'react-hook-form';
import { CorrectOptionEnums, PointEnums, QuestionEnums } from '../../Model/Creator.model';
import { Button, Divider, Stack, alpha, useTheme } from '@mui/material';
import OptionsIcon from '@mui/icons-material/Apps';
import { CustomTooltip } from '@/Components/Tooltip';
import InputGroup from './Components/InputGroup';

const QuestionSettings = () => {
   const theme = useTheme();
   const form = useFormContext();

   const activeSlide = form.watch("activeIndex");
   const questionType = form.watch(`questions.${activeSlide}.type`);

   return (
      <S.QuestionSettings 
         padding="20px" 
         width="300px"
      >
         <Stack flex={1} marginTop="20px">
            <InputGroup
               label="Question Type"
               icon={() => <QuizIcon sx={{ color: "primary.main", marginRight: "5px" }} />}
               name="type"
               options={[
                  { id: QuestionEnums.MULTIPLE_CHOICE, name: QuestionEnums.MULTIPLE_CHOICE},
                  { id: QuestionEnums.TRUE_FALSE, name: QuestionEnums.TRUE_FALSE },
                  { id: QuestionEnums.FILL_IN_THE_BLANK, name: QuestionEnums.FILL_IN_THE_BLANK },
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
               > 
                  Delete 
               </Button>
            </CustomTooltip>
            <CustomTooltip
               title="Duplicate"
               placement="top"
               arrow
            >
               <Button sx={{ flex: 2 }}> Duplicate </Button>
            </CustomTooltip>
         </Stack>
      </S.QuestionSettings>
   )
}

export default QuestionSettings;
