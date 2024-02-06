import { Stack, styled, Tooltip, tooltipClasses, Typography, type TooltipProps } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

const InfoTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} placement="top" arrow classes={{ popper: className }} />
 ))(({ theme }) => ({
   [`& .${tooltipClasses.arrow}`]: {
      color: '#dadde9'
    },
   [`& .${tooltipClasses.tooltip}`]: {
     backgroundColor: '#f5f5f9',
     color: 'rgba(0, 0, 0, 0.87)',
     maxWidth: 220,
     fontSize: theme.typography.pxToRem(12),
     border: '1px solid #dadde9',
     lineHeight: '18px'
   }
 }))

const QuizRuleInfos = () => {
   return (
      <Stack gap={1}>
         <QuizRuleInfo 
            keyValue="Number of Questions" 
            value="20" 
            description="There are 20 questions in this quiz."
         />
         <QuizRuleInfo 
            keyValue="Question Time" 
            value="-" 
            description="There is no time limit for a question."
         />
         <QuizRuleInfo 
            keyValue="Total Time" 
            value="20:00 min" 
            description="You have 20:00 minutes to complete this quiz."
         />
         <QuizRuleInfo 
            keyValue="Repeat" 
            value="1" 
            description="You have only 1 chance to complete this quiz. If you quit before you complete it, you cannot access it again."
         />
      </Stack>
   )
}

export default QuizRuleInfos;

type QuizRuleInfoProps = {
   keyValue: string;
   value: string;
   description: string;
};

const QuizRuleInfo = ({ keyValue, value, description }: QuizRuleInfoProps) => (
   <Stack flexDirection="row" alignItems="center" gap={2}>
      <InfoTooltip arrow title={description}> 
         <InfoIcon color="primary" sx={{ cursor: "pointer" }} /> 
      </InfoTooltip>
      <Typography color="primary" lineHeight={1.5} fontWeight="bold" fontSize="1.1rem" variant="h6"> {keyValue}: </Typography>
      <Typography alignSelf="stretch" display="flex" alignItems="center" flex={1} fontSize={20} paragraph> {value} </Typography>
   </Stack>
);