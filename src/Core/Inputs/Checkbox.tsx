import { Checkbox, type CheckboxProps, FormControlLabel, type FormControlLabelProps, FormHelperText, FormControl } from '@mui/material';
import { type FieldValues, useController, type UseControllerProps, type Control } from 'react-hook-form';

type CheckboxInputTypes<T extends FieldValues> = Omit<FormControlLabelProps, 'control'> 
   & UseControllerProps<T> 
   & { 
      defaultChecked?: boolean, 
      helperText?: string, 
      error?: boolean,
      control: Control<T>
   };

const CheckboxInput = <T extends FieldValues>(props: CheckboxInputTypes<T>) => {
   const { control, defaultChecked=false, error=false, ...checkboxProps } = props;

   const { field, fieldState } = useController({
      name: props.name,
      control: props.control
   });

   return (
      <FormControl
         error={!!fieldState?.error || props.error}
      >
         <FormControlLabel 
            control={
               <Checkbox
                  required={props.required}
                  defaultChecked={props.defaultChecked}
               />} 
            label={props.label}
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            labelPlacement={props.labelPlacement}
            disabled={props.disabled}
            required={props.required}
         />
         <FormHelperText  
            error={!!fieldState?.error || props.error}
         >
            { fieldState?.error?.message || props.helperText }
         </FormHelperText>
      </FormControl>
   );
};

export default CheckboxInput;