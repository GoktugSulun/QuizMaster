import img1 from '../../../Pngs/img-1.jpg';
import img2 from '../../../Pngs/img-2.jpg';
import img3 from '../../../Pngs/img-3.jpg';
import { Grid } from "@mui/material";
import Quiz from './Quiz';

const items = [
  {
    id: 1, 
    title: 'Asal Sayılar adpajpokasopdap padasdsapodsak adpakaspokdsaop sosos ososods', 
    description: '1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş! 1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş! 1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş!',
    created_at: new Date(),
    updated_at: new Date(),
    img: img1,
    time: '00:30 sec',
    liked: true,
  },
  {
    id: 2, 
    title: 'Asal Sayılar-2', 
    description: '2-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş!',
    created_at: new Date(),
    updated_at: new Date(),
    img: img2,
    time: '01:45 min',
    liked: false,
  },
  {
    id: 3, 
    title: 'Asal Sayılar-3', 
    description: '3-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş!',
    created_at: new Date(),
    updated_at: new Date(),
    img: img3,
    time: '15:00 min',
    liked: true,
  }
]

const QuizList = () => {
  return (
    <Grid container spacing={5}>
      { items.map((item) => (
          <Grid key={item.id} item xs={12} md={4}>
            <Quiz data={item} />
          </Grid>
        )) 
      }
    </Grid>
  )
}

export default QuizList;