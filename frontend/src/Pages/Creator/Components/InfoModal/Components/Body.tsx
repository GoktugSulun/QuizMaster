import { Loading } from "@/Core/Components";
import { Stack, Typography, useTheme } from "@mui/material";
import CompletedIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useAppSelector, useThunk } from "@/Core/Hooks";
import { HttpResponseEnums } from "@/Core/Constants/Enums";

const iconProps = {
   fontSize: "150px",
   animation: "zoom 500ms ease",
   "@keyframes zoom": {
      "0%": { scale: "0" },
      "50%": { scale: "1.3" },
      "100%": { scale: "1" }
   },
}

const Body = () => {
   const theme = useTheme();
   const { id, name } = useAppSelector((state) => state.Creator.quiz);
   
   const { requestStatus: requestStatusCreate, error: errorCreate } = useThunk("createQuestions");
   const { requestStatus: requestStatusEdit, error: errorEdit } = useThunk("editQuestions");
   const isEditing = useAppSelector((state) => state.Creator.isEditing);
   const requestStatus = isEditing ? requestStatusEdit : requestStatusCreate;
   const error = isEditing ? errorEdit : errorCreate;

   const valueMap = {
      [HttpResponseEnums.IDLE]: {
         icon: <Loading size={130} />,
         text: `Questions are saving for ${name} quiz with id "${id}", please wait.`,
         textColor: theme.palette.primary.main,
      },
      [HttpResponseEnums.LOADING]: {
         icon: <Loading size={130} />,
         text: `Questions are saving for ${name} quiz with id "${id}", please wait.`,
         textColor: theme.palette.primary.main
      },
      [HttpResponseEnums.SUCCESS]: {
         icon: <CompletedIcon sx={{ ...iconProps, color: theme.palette.success.light }} />,
         text: `The questions have been saved for the "${name}" quiz under the ID "${id}". You can either continue editing your quiz now or access it later from the 'Created' page.`,
         textColor: theme.palette.success.main
      },
      [HttpResponseEnums.FAILURE]: {
         icon: <ErrorIcon sx={{ ...iconProps, color: theme.palette.error.light }} />,
         text: `An error occurs, please close this window and try again!`,
         textColor: theme.palette.error.main,
         error: error ? `Error detail: ${error}` : null
      }
   }

   return (
      <Stack padding="50px 0" gap="30px">
         <Stack alignItems="center"> { valueMap[requestStatus].icon } </Stack>
         <Typography 
            paragraph 
            textAlign="center"
            color={valueMap[requestStatus].textColor}
         >
            { valueMap[requestStatus].text }
            <br />
            { valueMap[HttpResponseEnums.FAILURE].error }
         </Typography>
      </Stack>
   )
}

export default Body