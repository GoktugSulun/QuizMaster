import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { type FieldValues, type FieldPath, useController } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import { TextInputType } from '../Models';

const TextInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: TextInputType<TFieldValues, TName>) => {
  const { name, control, shrink=false, ...otherProps } = props;
  
  const { field, fieldState } = control 
    ? useController({ name, control }) 
    : { 
        field: {
          value: props.value,
          onChange: props.onChange,
          onBlur: props.onBlur,
          name: props.name || props.id,
          ref: props.ref,
          disabled: props.disabled
        }, 
        fieldState: {
          error: props.error
        } 
    };
  const error = props.error || !!fieldState.error;
  const helperText = (typeof fieldState.error === 'object' && 'message' in fieldState.error) 
    ? fieldState.error.message 
    : props.helperText

  return (
    <FormControl 
      fullWidth={props.fullWidth}
    >
      <InputLabel 
        shrink={shrink}
        error={error} 
        htmlFor={name || props.id}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        {...otherProps}
        error={error}
        value={props.value ?? field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
        disabled={props.disabled ?? field.disabled}
        notched={shrink}
        endAdornment={<> {props.endAdornment} {error && <ErrorIcon color="error" />} </>}
      />
      <FormHelperText
        error={error} 
      >
        { helperText }
      </FormHelperText>
    </FormControl>
  );
};

export default TextInput;

