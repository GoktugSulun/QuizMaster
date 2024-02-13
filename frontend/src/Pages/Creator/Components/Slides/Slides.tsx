import * as S from '../../Style/Creator.style';
import Slide from './Components/Slide';

const Slides = () => {
   return (
      <S.Slides>
         {[1,2,3,4,5].map((i) => <Slide key={i} index={i} />)}
      </S.Slides>
   )
}

export default Slides