import { styled } from "@mui/material";

export const FullSizeLoadingWrapper = styled('div')({
   width: '100vw',
   height: '100vh',
   overflow: 'hidden',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
});

export const MainWrapper = styled('div')({
   display: 'flex',
});

export const PageWrapper = styled('div')({
   flex: 1,
   padding: 50
})