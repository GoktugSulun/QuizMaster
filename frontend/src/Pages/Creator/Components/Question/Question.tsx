import * as S from '../../Style/Creator.style';
import QuestionHeader from './Components/QuestionHeader';
import Options from './Components/Options';

const Question = () => {
   
  return (
    <S.Question>
      <QuestionHeader />
      <Options />
    </S.Question>
  )
}

export default Question