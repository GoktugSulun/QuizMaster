import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectChangeEvent, type SelectProps } from '@mui/material';
import { type FieldValues, type UseControllerProps, useController, type Control } from 'react-hook-form';

type Option = {
   id: number;
   name: string;
   [key: string]: any;
}

type SelectInputProps<T extends FieldValues> = SelectProps 
   & UseControllerProps<T>
   & { 
      helperText?: string, 
      shrink?: boolean, 
      options: Option[], 
      emptyValue?: 
      string, 
      disabledEmptyItem?: 
      boolean,
      control: Control<T>
   };

const SelectInput = <T extends FieldValues>(props: SelectInputProps<T>) => {
   
   const { control, helperText, shrink, emptyValue, disabledEmptyItem=false, ...selectProps } = props;

   const { field, fieldState } = useController({
      name: props.name,
      control: props.control
   });

   const onChangeHandler = (event: SelectChangeEvent<unknown>) => {
      if (props.multiple){
         const value = event.target.value as (string|number)[];
         if (value.includes('')) {
            return field.onChange([]);
         }
         return field.onChange(value);
      }
      
      const value = event.target.value as (string|number);
      return field.onChange(value);
   };
   
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
         <Select
            {...selectProps}
            error={!!fieldState?.error ?? props.error}
            onChange={onChangeHandler}
            onBlur={field.onBlur} 
            value={field.value}
            name={field.name}
            id={props.name || props.id}
            notched={props.shrink}
            inputRef={field.ref} 
         >
            {
               !!emptyValue
                  && <MenuItem disabled={props.disabledEmptyItem} value=""> <em>{emptyValue}</em> </MenuItem>
            }
            {
               props.options.map((obj) => (
                  <MenuItem key={obj.id} value={obj.id}> {obj.name} </MenuItem>
               ))
            }
         </Select>
         <FormHelperText
            error={!!fieldState?.error ?? props.error} 
         >
            { fieldState?.error?.message || props.helperText }
         </FormHelperText>
      </FormControl>
   );
};

export default SelectInput;