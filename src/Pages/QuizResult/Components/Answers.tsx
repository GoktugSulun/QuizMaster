import { type Question as QuestionType } from '@/Pages/Quiz/Models/Quiz.model';
import * as S from '../Style/QuizResult.style';
import Question from './Question';

const DUMMY = {
      id: 1,
      name: "Asal sayılar",
      description: "Asal Sayılar description",
      time: 1200,
      questions: [
         { 
            id: 1, 
            name: 'Aşağıdakilerden hangisi asal sayı çarpanlarına bölünebilen bir sayıdır ?',
            time: 6,
            selectedOptionId: 1,
            options: [
               { id: 1, name: "35", isCorrect: false },
               { id: 2, name: "15", isCorrect: false },
               { id: 3, name: "20", isCorrect: false },
               { id: 4, name: "3", isCorrect: true }
            ]
         },
         { 
            id: 2, 
            name: 'Aşağıdakilerden hangisi yanlıştır ?',
            time: 1200,
            selectedOptionId: 7,
            options: [
               { id: 5, name: "Yanlış şık", isCorrect: true },
               { id: 6, name: "Doğru şık", isCorrect: false },
               { id: 7, name: "Doğru şık", isCorrect: false },
               { id: 8, name: "Doğru şık", isCorrect: false }
            ]
         },
         { 
            id: 3, 
            name: 'Aşağıdakilerden hangisi denemedir ?',
            time: 1200,
            selectedOptionId: 12,
            options: [
               { id: 9, name: "Deneme-1", isCorrect: false },
               { id: 10, name: "Deneme-2", isCorrect: false },
               { id: 11, name: "Deneme-3", isCorrect: false },
               { id: 12, name: "Deneme-4", isCorrect: true }
            ]
         },
         { 
            id: 4, 
            name: 'Aşağıdakilerden hangisi asal sayı çarpanlarına bölünebilen bir sayıdır ?',
            time: 1200,
            selectedOptionId: 13,
            options: [
               { id: 13, name: "A", isCorrect: false },
               { id: 14, name: "B", isCorrect: false },
               { id: 15, name: "C", isCorrect: false },
               { id: 16, name: "D", isCorrect: true }
            ]
         },
         { 
            id: 5, 
            name: 'Aşağıdakilerden hangisi asal sayı çarpanlarına bölünebilen bir sayıdır ?',
            time: 1200,
            selectedOptionId: 18,
            options: [
               { id: 17, name: "1111111111", isCorrect: false },
               { id: 18, name: "2222222222", isCorrect: false },
               { id: 19, name: "3333333333", isCorrect: false },
               { id: 20, name: "4444444444", isCorrect: true }
            ]
         }
      ]
}

const Answers = () => {

   return (
      <S.Answers id="answers">
         { DUMMY.questions.map((question, index) => (
            <Question 
               key={question.id} 
               question={question} 
               index={index} 
            />
         )) }
      </S.Answers>
   )
}

export default Answers