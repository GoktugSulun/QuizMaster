import { CustomTooltip } from "@/Components/Tooltip"
import { Stack } from "@mui/material"
import { type TooltipTypes } from "../Types/DashboardTypes";
import DashboardThunks from "../Store/Dashboard.thunk";
import { useThunk } from "@/Core/Hooks";
import { Loading } from "@/Core/Components";
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import FilledLikeIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/BookmarkBorder';
import FilledSaveIcon from '@mui/icons-material/Bookmark';
import * as S from '../Style/Dashboard.style';

type UserButtonsProps = {
   tooltipState: [TooltipTypes, React.Dispatch<React.SetStateAction<TooltipTypes>>];
   isFavorite: boolean;
   isSaved: boolean;
   id: string;
}

const UserButtons = (props: UserButtonsProps) => {
   const { tooltipState, isFavorite, isSaved, id } = props;
   const [tooltip, setTooltip] = tooltipState;

   const { isLoading: isLoadingMarkFavorite } = useThunk("markQuizAsFavorite");
   const { isLoading: isLoadingUnmarkFavorite } = useThunk("unmarkQuizAsFavorite");
   const { isLoading: isLoadingMarkSaved } = useThunk("markQuizAsSaved");
   const { isLoading: isLoadingUnmarkSaved } = useThunk("unmarkQuizAsSaved");

   const markQuizAsFavorite = () => {
      DashboardThunks.markQuizAsFavorite({ quizId: id });
      setTooltip((prev) => ({ ...prev, favorite: false }));
   }

   const unmarkQuizAsFavorite = () => {
      DashboardThunks.unmarkQuizAsFavorite(id);
      setTooltip((prev) => ({ ...prev, favorite: false }));
   }

   const markQuizAsSaved = () => {
      DashboardThunks.markQuizAsSaved({ quizId: id });
      setTooltip((prev) => ({ ...prev, save: false }));
   }

   const unmarkQuizAsSaved = () => {
      DashboardThunks.unmarkQuizAsSaved(id);
      setTooltip((prev) => ({ ...prev, save: false }));
   }

   return (
      <Stack 
         flexDirection="row" 
         alignItems="center" 
         gap={1}
      >
         <CustomTooltip 
            arrow 
            placement="top" 
            open={tooltip.favorite} 
            onOpen={() => setTooltip((prev) => ({ ...prev, favorite: true }))}
            onClose={() => setTooltip((prev) => ({ ...prev, favorite: false }))}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
         >
            <S.LikeButton 
               disabled={isLoadingMarkFavorite || isLoadingUnmarkFavorite} 
               onClick={isFavorite ? unmarkQuizAsFavorite : markQuizAsFavorite}
               sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
            >
               { 
                  (isLoadingMarkFavorite || isLoadingUnmarkFavorite) 
                     ? <Loading size={24} /> 
                     : isFavorite ? <FilledLikeIcon /> : <LikeIcon /> 
               }
            </S.LikeButton>
         </CustomTooltip>
         <CustomTooltip 
            arrow 
            placement="top" 
            open={tooltip.save} 
            onOpen={() => setTooltip((prev) => ({ ...prev, save: true }))}
            onClose={() => setTooltip((prev) => ({ ...prev, save: false }))}
            title={isSaved ? 'Remove from saved' : 'Add to saved'}
         >
            <S.SaveButton 
               disabled={isLoadingMarkSaved || isLoadingUnmarkSaved} 
               onClick={isSaved ? unmarkQuizAsSaved : markQuizAsSaved}
               sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
            >
               { 
                  (isLoadingMarkSaved || isLoadingUnmarkSaved) 
                     ? <Loading size={24} /> 
                     : isSaved ? <FilledSaveIcon /> : <SaveIcon /> 
               }
            </S.SaveButton>
         </CustomTooltip>
      </Stack>
   )
}

export default UserButtons