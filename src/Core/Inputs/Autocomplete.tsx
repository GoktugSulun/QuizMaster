import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';
import { useState } from 'react';
import { useController, type FieldValues, FieldPath } from 'react-hook-form';
import { AutocompleteData, AutocompleteType } from '../Models';

type AutocompleteInputProps<T extends FieldValues, U extends FieldPath<T>> = AutocompleteType<T, U>;

// TODO : This input should be also work correctly without react-hook-form
const AutocompleteInput = <T extends FieldValues, U extends FieldPath<T>>(props: AutocompleteInputProps<T, U>) => {
   const [showPlaceholder, setShowPlaceholder] = useState(true);
   const { control, helperText, shrink, options, error=false, ...autocompleteInputProps } = props; 

   const { field, fieldState } = useController({
      name: props.name,
      control: props.control
   });

   const onChange = (event: React.SyntheticEvent, newValue: AutocompleteData | AutocompleteData[] | null) => {
      if (props.multiple) {
         const value = newValue as AutocompleteData[];
         setShowPlaceholder(!value.length);
      }
      return field.onChange(newValue);
   }

   return (
      <FormControl 
         fullWidth={props.fullWidth}
         error={!!fieldState?.error ?? props.error} 
      >
         <Autocomplete
            {...autocompleteInputProps}
            onChange={onChange}
            onBlur={field.onBlur} 
            value={field.value}
            id={props.name || props.id}
            ref={field.ref}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => 
               <TextField 
                  {...params}
                  placeholder={showPlaceholder ? props.placeholder : ''}
                  InputLabelProps={{ shrink: props.shrink }}
                  error={!!fieldState?.error ?? props.error} 
                  label={props.label} 
               />
            }
            options={options}
         />
         <FormHelperText
            error={!!fieldState?.error ?? props.error} 
         >
            { fieldState?.error?.message || props.helperText }
         </FormHelperText>
      </FormControl>
   );
};

export default AutocompleteInput;

