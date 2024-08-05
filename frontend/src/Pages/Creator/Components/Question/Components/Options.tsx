import { Stack } from "@mui/material"
import MultipleChoice from "./MultipleChoice"
import { QuestionEnums } from "@/Pages/Creator/Types/CreatorTypes"
import { useFormContext } from "react-hook-form"
import OpenEnded from "./ShortAnswer"

export const OptionsMap = {
  [QuestionEnums.MULTIPLE_CHOICE]: [1,2,3,4].map(() => ({ name: "", isCorrect: false })),
  [QuestionEnums.TRUE_FALSE]: [{ name: "True", isCorrect: false }, { name: "False", isCorrect: false }],
  [QuestionEnums.SHORT_ANSWER]: [1,2,3,4].map(() => ({ name: "", isCorrect: true })),
}

const Options = () => {
  const form = useFormContext();

  const optionsComponent = (() => {
    const index = form.getValues("activeIndex"); 
    const questionType = form.watch(`questions.${index}.type`) as QuestionEnums;

    switch (questionType) {
      case QuestionEnums.MULTIPLE_CHOICE:
        return <MultipleChoice />;
      case QuestionEnums.TRUE_FALSE:
        return <MultipleChoice isTrueFalseQuestion />;
      case QuestionEnums.SHORT_ANSWER:
        return <OpenEnded />
      default:
        throw new Error("Undefined Question Type");
    }
  })();
  
  return (
    <Stack 
      flex={1} 
      alignItems="center" 
      justifyContent="center"
      padding="25px 50px"
    >
      { optionsComponent }
    </Stack>
  )
}

export default Options