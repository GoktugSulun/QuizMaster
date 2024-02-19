import { useAppDispatch } from "@/Core/Hooks";
import { CreatorActions } from "@/Pages/Creator/Store/Creator.slice";
import { Button, Stack, Typography, useTheme } from "@mui/material"
import { useFormContext } from "react-hook-form";

const CreatorInput = () => {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const form = useFormContext();

   // const name = form.watch("name");
   const name = form.getValues("name");

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
         <Typography> { name.trim() || "Enter quiz title..." } </Typography>
         <Button> Settings </Button>
      </Stack>
   )
}

export default CreatorInput