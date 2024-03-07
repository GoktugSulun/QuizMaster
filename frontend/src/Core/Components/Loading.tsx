import { CircularProgress, styled, useTheme } from '@mui/material';
import { type ReactNode } from 'react';

type LoadingProps = {
   fullWidth?: boolean;
   blur?: boolean | number;
   size?: number;
   color?: string;
   margin?: string;
   thickness?: number;
}

const Loading = (props: LoadingProps) => {
   const theme = useTheme();
   const { 
      fullWidth=false, 
      blur=false, 
      size=50, 
      color=theme.palette.primary.main, 
      margin='0', 
      thickness=5 
   } = props;
   
   return (
      <LoadingWrapper 
         fullWidth={fullWidth} 
         margin={margin} 
         color={color} 
         blur={blur}
         thickness={thickness}
      >
         <CircularProgress thickness={thickness} size={size} />
      </LoadingWrapper>
   );
};

export default Loading;

type LoadingWrapperProps = {
   fullWidth: boolean;
   blur: boolean | number;
   color: string;
   margin: string;
   thickness?: number;
   children: ReactNode;
}

const LoadingWrapper = styled('div')<LoadingWrapperProps>(({ theme, ...props }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: props.fullWidth ? '100%' : 'auto',
   height: "100%",
   margin: props.margin,
   // zIndex: 10,
   ...(props.blur ? {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      borderRadius: 'inherit',
      background: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: typeof props.blur === "boolean" ? 'blur(1px)' : `blur(${props.blur}px)`
   } : {}),
   '& .MuiCircularProgress-root svg circle': {
      stroke: props.color
   }
}));