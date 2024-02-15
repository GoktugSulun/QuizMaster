import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { type FieldValues, useController, FieldPath } from 'react-hook-form';
import { SelectType } from '../Models';

type SelectInputProps<T extends FieldValues, U extends FieldPath<T>> = SelectType<T, U>;

// TODO : This input should be also work correctly without react-hook-form
const SelectInput = <T extends FieldValues, U extends FieldPath<T>>(props: SelectInputProps<T, U>) => {
   
   const { control, helperText, shrink=false, emptyValue, disabledEmptyItem=false, ...selectProps } = props;

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
            shrink={shrink}
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
            inputRef={field.ref} 
            id={props.name || props.id}
            notched={shrink}
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