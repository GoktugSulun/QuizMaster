import CorrectIcon from '@mui/icons-material/CheckCircle';
import WrongIcon from '@mui/icons-material/Cancel';
import BlankIcon from '@mui/icons-material/Help';
import DoubleUpIcon from '@mui/icons-material/MilitaryTech';
import { CustomTooltip } from "@/Components/Tooltip";
import { Stack } from '@mui/material';
import { PointEnums } from '@/Constants/Enums';

type IconProps = {
   isBlank: boolean;
   isCorrect: boolean;
   point: PointEnums;
}

const Icon = (props: IconProps) => {
   const { isBlank, isCorrect, point } = props;

   const getAnswerStatusIcon = () => {
      if (isBlank) {
         return (
            <CustomTooltip arrow title="You didn't answer this question">
              <BlankIcon color="warning" />
            </CustomTooltip>
          )
      }
   
      if (isCorrect) {
         return (
            <CustomTooltip arrow title="You answered this question correctly"> 
               <CorrectIcon color="success" /> 
            </CustomTooltip> 
         )
      }

      return (
         <CustomTooltip arrow title="You answered this question wrong"> 
            <WrongIcon color="error" /> 
         </CustomTooltip>
      )
   };

   return (
      <Stack 
         flexDirection={"row"}
         alignItems={"center"}
         gap={"10px"}
      >
         {
            point === PointEnums.DOUBLE_UP
               && (
                  <CustomTooltip arrow title="This question is worth twice as much">
                     <DoubleUpIcon color="primary" />
                  </CustomTooltip>
               )
         }
         {getAnswerStatusIcon()}
      </Stack>
   )
}

export default Icon