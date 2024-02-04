import { Box, Stack, Typography } from "@mui/material";

type Item = {
   id: number;
   key: string; 
   value: string;
}

type ResultBoxProps = {
   title: string;
   text: string | number;
   items: Item[]
};

const ResultBox = (props: ResultBoxProps) => {

   return (
      <Stack flexDirection="row" columnGap={4}>
         <Box 
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            padding="15px 50px"
            borderRadius={2}
            flex={1}
         >  
            <Stack justifyContent="center" gap={1}>
               <Typography 
                  fontWeight="bold" 
                  color="primary.main" 
                  textAlign="center" 
                  fontSize="25px"
               > 
                  {props.title}
               </Typography> 
               <Stack 
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px" 
                  fontSize="35px"
                  padding="5px 15px"
                  borderRadius={2}
                  bgcolor="primary.light"
                  alignItems="center"
               > 
                  <Typography 
                     fontWeight="bold" 
                     color="primary.main" 
                     fontSize="35px"
                  > 
                     {props.text} 
                  </Typography> 
               </Stack> 
            </Stack>
         </Box> 
         <Stack justifyContent="center" rowGap={1} flex={2}>
            {
               props.items.map((item) => (
                  <Stack 
                     key={item.id}
                     flexDirection="row" 
                     alignItems="center" 
                     columnGap={2} 
                     flexWrap="wrap"
                  >
                     <Typography 
                        fontSize="22px" 
                        color="primary.main" 
                        fontWeight="bold"
                     > 
                        {item.key} 
                     </Typography>
                     <Typography fontSize="20px"> {item.value} </Typography>
                  </Stack>
               ))
            }
         </Stack>
      </Stack>
   )
}

export default ResultBox;