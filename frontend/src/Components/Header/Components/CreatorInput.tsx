import { Button, Stack, Typography, useTheme } from "@mui/material"

const CreatorInput = () => {
   const theme = useTheme();

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
      >
         <Typography> Enter quiz title... </Typography>
         <Button> Settings </Button>
      </Stack>
   )
}

export default CreatorInput