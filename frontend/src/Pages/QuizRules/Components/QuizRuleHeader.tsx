import { Stack, Typography } from "@mui/material";
import * as S from '../Style/QuizRules.style';
import defaultQuizImage from "@/Pngs/default.png";

type QuizRuleHeaderProps = {
   img: string;
   name: string;
   description: string;
};

const QuizRuleHeader = ({ img, name, description }: QuizRuleHeaderProps) => {
   console.log(img, " img");

   return (
      <Stack flexDirection="row" alignItems="center" gap={3}>
         <Stack flex={1}>
            <Stack gap={1} marginTop={4}>
               <Typography color="primary" lineHeight={1.5} fontWeight="bold" variant="h6"> Name: </Typography>
               <Typography alignSelf="stretch" display="flex" alignItems="center" flex={1} paragraph> {name} </Typography>
            </Stack>
            <Stack gap={1} marginTop={3}>
               <Typography color="primary" lineHeight={1.5} fontWeight="bold" variant="h6"> Description: </Typography>
               <Typography alignSelf="stretch" display="flex" alignItems="center" flex={1} paragraph> {description} </Typography>
            </Stack>
         </Stack>
         <Stack width={400} height={250}>
            <S.Image src={img || defaultQuizImage} alt="Quiz" />
         </Stack>
      </Stack>
   )
}

export default QuizRuleHeader