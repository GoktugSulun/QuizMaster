import { PageContent, PageWrapper } from "@/Core/Layout";
import { styled } from "@mui/material";

export const StyledProfile = styled(PageWrapper)({});

export const StyledProfileContent = styled(PageContent)<{ $isBelowMd: boolean; }>(({ $isBelowMd }) => ({
   display: 'flex',
   flexDirection: 'column',
   padding: $isBelowMd ? '25px' : '25px 50px',
   position: 'relative',
}));

export const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1
});