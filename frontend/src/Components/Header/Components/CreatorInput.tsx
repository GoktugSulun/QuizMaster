import { useAppDispatch, useAppSelector } from "@/Core/Hooks";
import { CreatorActions } from "@/Pages/Creator/Store/Creator.slice";
import { Button, Stack, Typography, useTheme } from "@mui/material";


const CreatorInput = () => {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const name = useAppSelector((state) => state.Creator.quiz.name);

   const openQuizSettingsModal = () => {
      dispatch(CreatorActions.setIsOpenQuizSettingsModal("OPEN"));
   };

   return (
      <Stack
         flexDirection="row"
         alignItems="center"
         justifyContent="space-between"
         gap={5}
         border={`1px solid ${theme.palette.secondary.light}`}
         borderRadius="5px"   
         padding="8px 10px"
         sx={{ cursor: "pointer" }}
         minWidth={300}
         onClick={openQuizSettingsModal}
      >
         <Typography> { name || "Enter quiz title..." } </Typography>
         <Button> Settings </Button>
      </Stack>
   )
}

export default CreatorInput