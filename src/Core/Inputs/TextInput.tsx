import { FormControl, FormHelperText, InputLabel, OutlinedInput, type OutlinedInputProps } from '@mui/material';
import { useController, type UseControllerProps, type FieldValues, type Control } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

type TextInputProps<T extends FieldValues> = OutlinedInputProps 
  & UseControllerProps<T> 
  & { helperText?: string, shrink?: boolean, control: Control<T>, };

const TextInput = <T extends FieldValues>(props: TextInputProps<T>) => {

  const { control, helperText, shrink, ...outlinedInputProps } = props;

  const { field, fieldState } = useController({
    name: props.name,
    control: props.control
  });

  return (
    <FormControl 
      fullWidth={props.fullWidth}
    >
      <InputLabel 
        shrink={props.shrink}
        error={!!fieldState?.error ?? props.error} 
        htmlFor={props.name || props.id}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        {...outlinedInputProps}
        error={!!fieldState?.error ?? props.error}
        onChange={field.onChange}
        onBlur={field.onBlur} 
        value={field.value}
        name={field.name}
        id={props.name || props.id}
        notched={props.shrink}
        inputRef={field.ref} 
        endAdornment={props.endAdornment || (!!fieldState?.error && <ErrorIcon color="error" />)}
      />
      <FormHelperText
        error={!!fieldState?.error ?? props.error} 
      >
        { fieldState?.error?.message || props.helperText }
      </FormHelperText>
    </FormControl>
  );
};

export default TextInput;

