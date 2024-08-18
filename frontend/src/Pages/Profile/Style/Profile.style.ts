import { PageContent, PageWrapper } from "@/Core/Layout";
import { styled } from "@mui/material";

export const StyledProfile = styled(PageWrapper)({});

export const StyledProfileContent = styled(PageContent)(() => ({
   display: 'flex',
   flexDirection: 'column',
   padding: '25px 50px',
   position: 'relative',
}));