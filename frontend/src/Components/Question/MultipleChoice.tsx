import { FormControlLabel, Grid, Radio, alpha, useTheme } from "@mui/material";
import * as S from './Style/Question.style';
import { type Option } from "@/Pages/Quiz/Models/Quiz.model";

type DisabledProps = {
  readOnly?: true;
  options: Option[];
  checked: (option: Option) => boolean | boolean;
}

type DefaultProps = {
  readOnly?: false; 
  options: Option[];
  checked?: (option: Option) => boolean | boolean;
  onClick: (option: Option) => void;
}

type MultipleChoiceProps = DefaultProps | DisabledProps;

const MultipleChoice = (props: MultipleChoiceProps) => {
  const { options, readOnly=false, checked=false } = props;
  const theme = useTheme();

  return (
    <Grid 
      container 
      rowSpacing={{ xs: 2, md: 5 }} 
      columnSpacing={3}
    >
      {
        options.map((option) => {
          const isChecked = typeof checked === 'function' ? checked(option) : checked;
          const isCorrect = option.isCorrect;
          const isWrong = !option.isCorrect && isChecked;
          const bgColor = () => {
            if (readOnly) {
              if (isCorrect) return alpha(theme.palette.success.light, 0.3)
              if (isWrong) return alpha(theme.palette.error.light, 0.3)
              return 'initial'
            }
            return isChecked ? theme.palette.custom.light : 'initial';
          }
          const color = () => {
            if (readOnly) {
              if (isCorrect) return alpha(theme.palette.success.main, 1)
              if (isWrong) return alpha(theme.palette.error.main, 1)
              return 'initial'
            }
            return isChecked ? theme.palette.primary.main : theme.palette.common.black;
          }
          const fontWeight = ((readOnly && isCorrect) || (readOnly && isWrong)) ? 'bold' : 'initial';
          const cursor = readOnly ? 'initial' : 'pointer';
          return (
            <Grid 
              key={option.id} 
              item 
              xs={12} 
              md={6}
            >
              <S.OptionBox 
                $bgColor={bgColor()} 
                $color={color()} 
                $fontWeight={fontWeight}
                cursor={cursor}
                $readOnly={readOnly}
              >
                <FormControlLabel 
                  value={option.id} 
                  label={option.name}
                  control={
                    <Radio
                      checked={isChecked}
                      readOnly={readOnly}
                      {...('onClick' in props ? { onClick: () => props.onClick(option) } : {})}
                      value={option.id}
                      disableTouchRipple={readOnly}
                      disableFocusRipple={readOnly}
                      disableRipple={readOnly}
                    />
                  } 
                />
              </S.OptionBox>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default MultipleChoice