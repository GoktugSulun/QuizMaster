import { useMaterialForm } from "@/Core/Hooks";
import { SelectInput, TextInput } from "@/Core/Inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as S from "./Test.style";
import { Button, Chip, Grid } from "@mui/material";
import CheckboxInput from "@/Core/Inputs/Checkbox";
import AutocompleteInput from "@/Core/Inputs/Autocomplete";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().min(3, ' Min 3 character').required("Email Required!"),
  password: yup.string().required("Password Required!"),
  optionId: yup.mixed()
    .test(
      'is-string-or-number',
      'OptionId Required!',
      value => (typeof value === 'string' && value !== "") || typeof value === 'number'
    )
    .required("OptionId Required!"),
  optionIds: yup.array().min(1, "Must be selected at least one!"),
  read: yup.bool().test('must be selected', 'Must be selected!', value => value),
  autocomplete: yup
    .object({ id: yup.number(), name: yup.string()})
    .nullable()
    .test('null-check', 'Autocomplete Required!', value => value !== null),
  multiAutocomplete: yup.array().min(2, 'Must be selected at least two!')
});

type DefaultValuesType = {
  email: string;
  password: string;
  optionId: number | string;
  optionIds: number[];
  read: boolean;
  autocomplete: { id: number, name: string } | null,
  multiAutocomplete: { id: number, name: string }[]
}

const defaultValues: DefaultValuesType = {
  email: '',
  password: '',
  optionId: '',
  optionIds: [],
  read: false,
  autocomplete: null,
  multiAutocomplete: []
}

type Dummy = { id: number, name: string }[]
const dummyData: Dummy = [{ id: 1, name: 'Option-1' }, { id: 2, name: 'Option-2' }, { id: 3, name: 'Option-3' }, { id: 4, name: 'Option-4' }, { id: 5, name: 'Option-5' }];

const Test = () => {
  const { form, registerHandler } = useMaterialForm({ defaultValues, resolver: yupResolver(schema) });

  const validate = async () => {
    const isValid = await form.trigger();
    console.log(form.getValues(), ' data');
    console.log(isValid, ' isValid');
  };

  return (
    <S.Test>
      Dashboard Inputs:
      Dashboard Inputs:
      Dashboard Inputs:
      Dashboard Inputs:
      <br />
      <br />
      <br />
      <br />
      <Grid 
        container
        spacing={5}
      >
        <Grid item xs={12} md={3}>
          <TextInput 
            error 
            fullWidth 
            shrink 
            placeholder="deneme" 
            label="Label" 
            {...registerHandler("email")} 
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInput 
            fullWidth 
            placeholder="deneme-2" 
            label="Label-2" 
            {...registerHandler("password")} 
            type="password" 
            helperText="string" 
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SelectInput 
            fullWidth
            label="Option"
            emptyValue="Select an option"
            {...registerHandler("optionId")}
            options={dummyData}
            // renderValue={(selectedValue) => {
            //   const value = selectedValue as number;
            //   return <Chip label={dummyData.find((obj) => obj.id === value)?.name} /> 
            // }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SelectInput 
            shrink
            fullWidth
            label="Option"
            emptyValue="Select an option"
            placeholder="Select an option"
            {...registerHandler("optionIds")}
            options={dummyData}
            multiple
            renderValue={(selectedValues) => {
              const values = selectedValues as number[];
              return values.map((value) => (<Chip sx={{ marginRight: 1 }} key={value} label={dummyData.find((obj) => obj.id === value)?.name} />))
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckboxInput 
            label="I read and accept all the conditions"
            {...registerHandler("read")}
            required
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <AutocompleteInput 
            fullWidth
            shrink
            label="Autocomplete"
            {...registerHandler("autocomplete")}
            options={dummyData}
            placeholder="Lütfen bir seçim yapınız!"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <AutocompleteInput 
            multiple
            fullWidth
            shrink
            label="Multiple Autocomplete"
            {...registerHandler("multiAutocomplete")}
            options={dummyData}
            placeholder="Lütfen en az bir seçim yapınız!"
            disableCloseOnSelect
          />
        </Grid>
      </Grid>
      <Button 
        fullWidth
        onClick={validate}
        sx={{ marginTop: 5 }}
      > 
        Validate 
      </Button>
      <p style={{ height: 500 }} >denem</p>
    </S.Test>
  );
};

export default Test;