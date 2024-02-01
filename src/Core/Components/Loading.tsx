import { CircularProgress, styled, useTheme } from '@mui/material';
import { type ReactNode } from 'react';

type LoadingProps = {
   fullWidth?: boolean,
   blur?: boolean,
   size?: number,
   color?: string,
   margin?: string
}

const Loading = (props: LoadingProps) => {
   const theme = useTheme();
   const { fullWidth=false, blur=false, size=50, color=theme.palette.primary.main, margin='0' } = props;
   
   return (
      <LoadingWrapper fullWidth={fullWidth} margin={margin} color={color} blur={blur}>
         <CircularProgress size={size} />
      </LoadingWrapper>
   );
};

export default Loading;

type LoadingWrapperProps = {
   fullWidth: boolean,
   blur: boolean,
   color: string,
   margin: string,
   children: ReactNode
}

const LoadingWrapper = styled('div')<LoadingWrapperProps>(({ theme, ...props }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: props.fullWidth ? '100%' : 'auto',
   height: 'auto',
   margin: props.margin,
   ...(props.blur ? {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      borderRadius: 'inherit',
      background: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(1px)',
   } : {}),
   '& .MuiCircularProgress-root svg circle': {
      stroke: props.color
   }
}));