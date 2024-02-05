import { alpha, useTheme } from '@mui/material';
import { PieChart as MuiPieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const PieChart = () => {
   const theme = useTheme();

   return (
      <MuiPieChart
         series={[
            {
               arcLabel: (item) => `${item.value !== 0 ? item.value : ''}`,
               arcLabelMinAngle: -360,
               data: [
                  { id: 1, value: 15, label: 'Correct', color: alpha(theme.palette.success.light, 0.8) },
                  { id: 2, value: 3, label: 'Wrong', color: alpha(theme.palette.error.light, 0.8) },
                  { id: 3, value: 2, label: 'Blank', color: theme.palette.grey[300] },
               ],
               startAngle: 0,
               endAngle: -360,
               cornerRadius: 10,
               cx: '55%'
            },
         ]}
         margin={{ top: 80 }}
         slotProps={{ 
            legend: { 
               position: { 
                  horizontal: 'middle', 
                  vertical: 'top' 
               }, 
               direction: 'row',
               itemGap: 30
            } 
         }}
         sx={{
            [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            },
         }}
         // width={600}
         // height={300}
      />
   );
};

export default PieChart;
