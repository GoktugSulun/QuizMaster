import { Checkbox, FormControlLabel, FormHelperText, FormControl } from '@mui/material';
import { type FieldValues, type FieldPath, useController } from 'react-hook-form';
import { type CheckboxInputType } from '../Models';

const CheckboxInput = <T extends FieldValues, U extends FieldPath<T>>(props: CheckboxInputType<T, U>) => {
   const { name, control, checkbox, ...otherProps } = props;

   const { field, fieldState } = control 
      ? useController({ name, control }) 
      : { 
         field: {
            value: props.checked,
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
   const error = !!fieldState.error;
   const helperText = (typeof fieldState.error === 'object' && 'message' in fieldState.error) 
      ? fieldState.error.message 
      : props.helperText
   
   return (
      <FormControl
         error={!!error}
      >
         <FormControlLabel 
            {...otherProps}
            control={ <Checkbox {...checkbox} /> } 
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name || props.id}
            disabled={field.disabled}
            ref={field.ref}
         />
         <FormHelperText  
            error={!!error}
         >
            { helperText }
         </FormHelperText>
      </FormControl>
   );
};

export default CheckboxInput;