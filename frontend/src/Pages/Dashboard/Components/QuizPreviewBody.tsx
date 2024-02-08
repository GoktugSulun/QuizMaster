import { Box, Tooltip } from "@mui/material";
import * as S from '../Style/Dashboard.style';

type QuizPreviewBodyProps = {
   title: string;
   description: string;
   id: number;
};
 
const QuizPreviewBody = ({ title, description, id }: QuizPreviewBodyProps) => {


   return (
      <Box sx={{ padding: '0 20px', flex: 1 }} >
         <Tooltip 
            title={title} 
            placement="bottom-start"
            slotProps={{
               popper: {
                  modifiers: [
                     {
                     name: 'offset',
                     options: {
                        offset: [0, -8],
                     },
                     },
                  ],
               },
               }}
         >
            <S.EllipsisText 
               $maxRow={1} 
               fontSize={22} 
               variant="h6"
               lineHeight={1.4}
            > 
               <S.Link to={{ pathname: "rules/quiz", search: `?id=${id}` }}> {title} </S.Link> 
            </S.EllipsisText >
         </Tooltip>
         <S.EllipsisText 
            sx={{ marginTop: 2, color: '#5e5e5e' }} 
            $maxRow={3} 
            fontSize={14} 
            paragraph
         > 
            {description} 
         </S.EllipsisText>
      </Box>
   )
}

export default QuizPreviewBody