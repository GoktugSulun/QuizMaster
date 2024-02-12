import { Stack, Typography } from "@mui/material";
import * as S from '../Style/QuizRules.style';

type QuizRuleHeaderProps = {
   img: string;
   title: string;
   description: string;
   category: string;
};

const QuizRuleHeader = ({ img, title, description, category }: QuizRuleHeaderProps) => {
   return (
      <Stack flexDirection="row" alignItems="center" gap={3}>
         <Stack flex={1}>
            <Stack gap={1} marginTop={4}>
               <Typography color="primary" lineHeight={1.5} fontWeight="bold" variant="h6"> Title: </Typography>
               <Typography alignSelf="stretch" display="flex" alignItems="center" flex={1} paragraph> {title} </Typography>
            </Stack>
            <Stack gap={1} marginTop={3}>
               <Typography color="primary" lineHeight={1.5} fontWeight="bold" variant="h6"> Description: </Typography>
               <Typography alignSelf="stretch" display="flex" alignItems="center" flex={1} paragraph> {description} </Typography>
            </Stack>
            <Stack gap={1} marginTop={3}>
               <Typography color="primary" lineHeight={1.5} fontWeight="bold" variant="h6"> Category: </Typography>
               <Typography alignSelf="stretch" display="flex" alignItems="center" flex={1} paragraph> {category} </Typography>
            </Stack>
         </Stack>
         <Stack width={400} height={250}>
            <S.Image src={img} alt="Quiz" />
         </Stack>
      </Stack>
   )
}

export default QuizRuleHeader