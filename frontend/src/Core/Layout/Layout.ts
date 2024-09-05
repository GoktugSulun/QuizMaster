import { styled } from "@mui/material";
import { shouldForwardProp } from "../Utils";

export const FullSizeLoadingWrapper = styled('div', { shouldForwardProp })<{$autoHeight?: boolean;}>(({ $autoHeight }) => ({
   width: '100vw',
   height: $autoHeight ? '100%' : '100vh',
   overflow: 'hidden',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

export const MainWrapper = styled('div')({
   width: '100vw',
   minHeight: '100vh',
   display: 'flex',
   padding: "0 20px 10px 10px",
   gap: 30
});

export const PageWrapper = styled('div')({
   flex: 1,
   padding: '30px 15px 0',
});

export const ContentWrapper = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   flex: 1
});

export const PageContent = styled('div')(({ theme }) => ({
   background: theme.palette.common.white,
   borderRadius: 15,
   height: '100%',
   border: `1px solid ${theme.palette.secondary.light}`,
}));

