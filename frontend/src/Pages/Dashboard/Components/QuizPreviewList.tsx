import img1 from '../../../Pngs/img-1.jpg';
import img2 from '../../../Pngs/img-2.jpg';
import img3 from '../../../Pngs/img-3.jpg';
import { Grid } from "@mui/material";
import QuizPreview from './QuizPreview';

const items = [
  {
    id: 1, 
    title: 'Asal Sayılar adpajpokasopdap padasdsapodsak adpakaspokdsaop sosos ososods', 
    description: '1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş! 1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş! 1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş!',
    category: 'Mathematics',
    created_at: new Date(),
    updated_at: new Date(),
    img: img1,
    time: '00:30 sec',
    liked: true,
    saved: false,
  },
  {
    id: 2, 
    title: 'Asal Sayılar-2', 
    description: '2-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş!',
    category: 'Physics',
    created_at: new Date(),
    updated_at: new Date(),
    img: img2,
    time: '01:45 min',
    liked: false,
    saved: false,
  },
  {
    id: 3, 
    title: 'Asal Sayılar-3', 
    description: '3-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş!',
    category: 'Software',
    created_at: new Date(),
    updated_at: new Date(),
    img: img3,
    time: '15:00 min',
    liked: true,
    saved: true,
  }
]

const QuizPreviewList = () => {
  return (
    <Grid container spacing={5}>
      { items.map((item) => (
          <Grid key={item.id} item md={12} lg={4}>
            <QuizPreview data={item} />
          </Grid>
        )) 
      }
    </Grid>
  )
}

export default QuizPreviewList;