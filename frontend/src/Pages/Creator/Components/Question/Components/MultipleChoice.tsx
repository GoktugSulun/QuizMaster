import * as QuestionStyle from "@/Components/Question/Style/Question.style";
import { type Option } from "@/Pages/Quiz/Models/Quiz.model";
import { FormControlLabel, Grid, Radio } from "@mui/material";

type MultipleChoiceProps = {
   options: Option[]
}

const MultipleChoice = (props: MultipleChoiceProps) => {
   const { options } = props;

   return (
      <Grid 
         container
         rowSpacing={{ xs: 2, md: 5 }} 
         columnSpacing={3}
      >
         {
            options.map((option) => (
               <Grid 
                  key={option.id} 
                  item 
                  xs={12} 
                  lg={6}
               >
                  <QuestionStyle.OptionBox>
                     <FormControlLabel 
                        value={option.id} 
                        label={option.name}
                        control={
                        <Radio
                           checked={false}
                           {...('onClick' in props ? { onClick: () => props.onClick(option) } : {})}
                           value={option.id}
                        />
                        } 
                     />
                  </QuestionStyle.OptionBox>
               </Grid>
            ))
         }
      </Grid>
   )
}

export default MultipleChoice