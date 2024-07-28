import { formatDateTime } from "@/Core/Helper";
import { useAppSelector } from "@/Core/Hooks";
import { SelectInput } from "@/Core/Inputs"
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom";
import QuizResultThunks from "../Store/QuizResult.thunk";

type ResultOptionFormType = {
   selectedResultId: string;
}

const ResultOptions = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { allResults } = useAppSelector((state) => state.QuizResult);
   const resultId = searchParams.get("resultId") as string;

   const form = useForm<ResultOptionFormType>({ 
      defaultValues: {
         selectedResultId: resultId
      } 
   });

   const options = allResults.map((result) => {
      const { date, time } = formatDateTime(result.sessionDate === null ? new Date() : new Date(result.sessionDate))
      return { 
         id: result.resultId, 
         name: `${date} : ${time}`
      }
   })
   
   useEffect(() => {
      if (form.watch("selectedResultId")) {
         searchParams.set("resultId", form.watch("selectedResultId"));
         setSearchParams(searchParams);
         QuizResultThunks.getQuizResult(form.watch("selectedResultId"));
      }
   }, [form.watch("selectedResultId")]);

   return (
      <SelectInput
         control={form.control}
         name="selectedResultId"
         options={options}
         label="Date"
         shrink
      />
   )
}

export default ResultOptions