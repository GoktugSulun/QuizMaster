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
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { RouteEnums } from "@/Constants/Enums";

type UserButtonsProps = {
   tooltipState: [TooltipTypes, React.Dispatch<React.SetStateAction<TooltipTypes>>];
   isFavorite: boolean;
   isSaved: boolean;
   id: string;
}

const UserButtons = (props: UserButtonsProps) => {
   const { tooltipState, isFavorite, isSaved, id } = props;
   const [tooltip, setTooltip] = tooltipState;
   const navigate = useNavigate();
   const location = useLocation();
   const { isAuthorized } = useAuth();

   const { payload: markQuizAsFavoritePayload } = useThunk("markQuizAsFavorite");
   const { payload: unmarkQuizAsFavoritePayload } = useThunk("unmarkQuizAsFavorite");
   const { payload: markQuizAsSavedPayload } = useThunk("markQuizAsSaved");
   const { payload: unmarkQuizAsSavedPayload } = useThunk("unmarkQuizAsSaved");

   const isLoadingLikeIcon = (markQuizAsFavoritePayload?.some((item) => item?.data?.quizId === id)) 
      || (unmarkQuizAsFavoritePayload?.some((item) => item?.value?.quizId === id))
   const isLoadingSavedIcon = (markQuizAsSavedPayload?.some((item) => item?.data?.quizId === id)) 
      || (unmarkQuizAsSavedPayload?.some((item) => item?.value?.quizId === id))

   const onClickFavoriteButton = () => {
      if (!isAuthorized){
         navigate("/auth/login", { state: { authLocation: location }});
         return;
      }
      const updateStore = location.pathname === RouteEnums.FAVORITES;
      if (isFavorite) {
         DashboardThunks.unmarkQuizAsFavorite({ quizId: id, updateStore });
      } else {
         DashboardThunks.markQuizAsFavorite({ quizId: id });
      }
      setTooltip((prev) => ({ ...prev, favorite: false }));
   }

   const onClickSaveButton = () => {
      if (!isAuthorized){
         navigate("/auth/login", { state: { authLocation: location }});
         return;
      }
      const updateStore = location.pathname === RouteEnums.SAVED;
      if (isSaved) {
         DashboardThunks.unmarkQuizAsSaved({ quizId: id, updateStore });
      } else {
         DashboardThunks.markQuizAsSaved({ quizId: id });
      }
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
               disabled={isLoadingLikeIcon} 
               onClick={onClickFavoriteButton}
               sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
            >
               { 
                  isLoadingLikeIcon
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
               disabled={isLoadingSavedIcon} 
               onClick={onClickSaveButton}
               sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
            >
               { 
                  isLoadingSavedIcon
                     ? <Loading size={24} /> 
                     : isSaved ? <FilledSaveIcon /> : <SaveIcon /> 
               }
            </S.SaveButton>
         </CustomTooltip>
      </Stack>
   )
}

export default UserButtons