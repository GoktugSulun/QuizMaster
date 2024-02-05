import { FormControlLabel, Grid, Radio, Stack } from "@mui/material";
import * as S from './Style/Question.style';
import { type Option } from "@/Pages/Quiz/Models/Quiz.model";

type DisabledProps = {
  disabled?: true;
  options: Option[];
  checked?: (option: Option) => boolean | boolean;
}

type DefaultProps = {
  disabled?: false; 
  options: Option[];
  checked?: (option: Option) => boolean | boolean;
  onClick: (option: Option) => void;
}

type MultipleChoiceProps = DefaultProps | DisabledProps;

const MultipleChoice = (props: MultipleChoiceProps) => {
  const { options, disabled=false, checked=false } = props;

  return (
    <Stack 
      flex={1} 
      justifyContent="center" 
      alignItems="center"
      padding="0 50px"
    >
      <Grid 
        container 
        rowSpacing={{ xs: 2, md: 5 }} 
        columnSpacing={3}
      >
        {
          options.map((option) => {
            const isChecked = typeof checked === 'function' ? checked(option) : checked;
            return (
              <Grid key={option.id} item xs={12} md={6}>
                <S.OptionBox $isChecked={isChecked}>
                  <FormControlLabel 
                    value={option.id} 
                    label={option.name}
                    disabled={disabled}
                    control={
                      <Radio
                        checked={isChecked}
                        {...('onClick' in props ? { onClick: () => props.onClick(option) } : {})}
                        value={option.id}
                      />
                    } 
                  />
                </S.OptionBox>
              </Grid>
            )
          })
        }
      </Grid>
    </Stack>
  )
}

export default MultipleChoice