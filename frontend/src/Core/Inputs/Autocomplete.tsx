import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, FormControl, FormHelperText, TextField } from '@mui/material';
import { useState } from 'react';
import { useController, type FieldValues, FieldPath } from 'react-hook-form';
import { AutocompleteData, AutocompleteType } from '../Models';

type AutocompleteInputProps<T extends FieldValues, U extends FieldPath<T>> = AutocompleteType<T, U>;

// TODO : This input should be also work correctly without react-hook-form
// TODO : Fix problems
const AutocompleteInput = <T extends FieldValues, U extends FieldPath<T>>(props: AutocompleteInputProps<T, U>) => {
   const [showPlaceholder, setShowPlaceholder] = useState(true);
   const { control, helperText, shrink=false, options, error=false, ...autocompleteInputProps } = props; 

   const { field, fieldState } = useController({
      name: props.name,
      control: props.control
   });

   const onChangeHandler = (event: React.SyntheticEvent, newValue: (string | AutocompleteData)[], reasons: AutocompleteChangeReason, details?: AutocompleteChangeDetails<AutocompleteData>) => {
      if (props.multiple) {
         const value = newValue as AutocompleteData[];
         setShowPlaceholder(!value.length);
      }
      field.onChange(newValue);
      props?.onChange?.(event, newValue, reasons, details);
   }

   return (
      <FormControl 
         fullWidth={props.fullWidth}
         error={props.error ?? !fieldState?.error} 
      >
         <Autocomplete
            {...autocompleteInputProps}
            onChange={onChangeHandler}
            onBlur={field.onBlur} 
            value={field.value}
            id={props.name || props.id}
            ref={field.ref}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => typeof option === "string" ? option : option.name}
            renderInput={(params) => 
               <TextField 
                  {...params}
                  placeholder={showPlaceholder ? props.placeholder : ''}
                  InputLabelProps={{ shrink }}
                  error={props.error ?? !!fieldState?.error} 
                  label={props.label} 
               />
            }
            options={options}
         />
         <FormHelperText
            error={props.error ?? !!fieldState?.error} 
         >
            {  (fieldState?.error?.message) || props.helperText }
         </FormHelperText>
      </FormControl>
   );
};

export default AutocompleteInput;

