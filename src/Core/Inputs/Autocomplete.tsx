import { Autocomplete, type AutocompleteProps, FormControl, FormHelperText, TextField } from '@mui/material';
import { useState } from 'react';
import { useController, type UseControllerProps, type FieldValues, type Control } from 'react-hook-form';

type Data = { id: number, name: string };

type AutocompleteInputProps<T extends FieldValues> = Omit<AutocompleteProps<Data, true, false, false>, 'renderInput'>
  & UseControllerProps<T> 
  & { 
      helperText?: string, 
      shrink?: boolean, 
      label?: string, 
      error?: boolean, 
      control: Control<T>,
      placeholder?: string 
   };

const AutocompleteInput = <T extends FieldValues>(props: AutocompleteInputProps<T>) => {
   const [showPlaceholder, setShowPlaceholder] = useState(true);
   const { control, helperText, shrink, options, error=false, ...autocompleteInputProps } = props; 

   const { field, fieldState } = useController({
      name: props.name,
      control: props.control
   });

   const onChange = (event: React.SyntheticEvent, newValue: Data | Data[] | null) => {
      if (props.multiple) {
         const value = newValue as Data[];
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

