import { Box } from "@mui/material";
import * as S from '../Style/Dashboard.style';
import { CustomTooltip } from "@/Components/Tooltip";

type QuizPreviewBodyProps = {
   id: string;
   name: string;
   description: string;
};

const tooltipSlotProps = {
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
};
 
const QuizPreviewBody = ({ id, name, description }: QuizPreviewBodyProps) => {
   // TODO : fix tooltip location for short title

   return (
      <Box padding="0 20px" flex={1}>
         <CustomTooltip 
            title={name} 
            placement="bottom-start"
            slotProps={tooltipSlotProps}
         >
            <S.EllipsisText 
               $maxRow={1} 
               fontSize={22} 
               variant="h6"
               lineHeight={1.4}
            > 
               <S.Link to={{ pathname: "/rules/quiz", search: `?id=${id}` }}> {name} </S.Link> 
            </S.EllipsisText >
         </CustomTooltip>
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