import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../../Style/Creator.style';
import Slide from './Components/Slide';

const Slides = () => {
   const { control } = useFormContext();
   const questions = useFieldArray({ name: "questions", control });

   return (
      <S.Slides>
         {questions.fields.map((field, index) => (
            <Slide key={field.id} index={index} />
         ))}
      </S.Slides>
   )
}

export default Slides