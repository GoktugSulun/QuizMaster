import { PieChart as MuiPieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

type PieChartProps = {
   data: {
      id: string;
      value: number;
      label: string;
      color: string;
   }[]
} 

const PieChart = (props: PieChartProps) => {

   return (
      <MuiPieChart
         series={[
            {
               arcLabel: (item) => `${item.value !== 0 ? item.value : ''}`,
               arcLabelMinAngle: 0,
               data: props.data,
               startAngle: 0,
               endAngle: 360,
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
      />
   );
};

export default PieChart;
