import { CustomTooltip } from "@/Components/Tooltip";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import * as S from '../Style/Dashboard.style';
import { type TooltipTypes } from "../Types/DashboardTypes";
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardThunks from "../Store/Dashboard.thunk";

type AdminButtonsProps = {
   tooltipState: [TooltipTypes, React.Dispatch<React.SetStateAction<TooltipTypes>>];
   id: string;
}

const AdminButtons = (props: AdminButtonsProps) => {
   const navigate = useNavigate();
   const [tooltip, setTooltip] = props.tooltipState;

   const editHandler = () => {
      navigate(`/creator/${props.id}`);
   }

   const deleteHandler = () => {
      DashboardThunks.deleteQuiz(props.id);
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
            open={tooltip.delete} 
            onOpen={() => setTooltip((prev) => ({ ...prev, delete: true }))}
            onClose={() => setTooltip((prev) => ({ ...prev, delete: false }))}
            title={"Delete"}
         >
            <S.DeleteButton 
               onClick={deleteHandler}
               sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
            >
               <DeleteIcon />
            </S.DeleteButton>
         </CustomTooltip>
         <CustomTooltip 
            arrow 
            placement="top" 
            open={tooltip.edit} 
            onOpen={() => setTooltip((prev) => ({ ...prev, edit: true }))}
            onClose={() => setTooltip((prev) => ({ ...prev, edit: false }))}
            title={"Edit"}
         >
            <S.EditButton 
               onClick={editHandler}
               sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
            >
               <EditIcon />
            </S.EditButton>
         </CustomTooltip>
      </Stack>
   )
}

export default AdminButtons