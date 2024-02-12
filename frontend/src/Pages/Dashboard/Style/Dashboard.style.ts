import { Box, IconButton, Stack, Typography, alpha, styled } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import { shouldForwardProp } from "@/Core/Utils";
import { PageWrapper } from "@/Core/Layout";

export const Dashboard = styled(PageWrapper)({});

export const QuizPreview = styled(Stack)(({ theme }) => ({
   background: theme.palette.common.white,
   borderRadius: 20,
   height: '100%',
   boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
}));

export const Image = styled('img')(({ theme }) => ({
   width: '100%',
   height: '180px',
   objectFit: "cover",
   borderRadius: "20px 20px 0 0"
})); 

export const Link = styled(ReactRouterLink)(({ theme }) => ({
   textDecoration: 'none',
   color: theme.palette.primary.main,
   fontWeight: 'bold',
   '&:hover ': {
      textDecoration: 'underline'
   }
}));

export const EllipsisText = styled(Typography, { shouldForwardProp })<{ $maxRow?: number }>(({ theme, $maxRow }) => ({
   display: '-webkit-box',
   WebkitLineClamp: $maxRow || 1,
   WebkitBoxOrient: 'vertical',
   overflow: 'hidden',
   textOverflow: 'ellipsis'
}));

export const LikeButton = styled(IconButton)(({ theme }) => ({
   background: theme.palette.custom.light,
   '&:hover': {
      background: alpha(theme.palette.primary.main, .3),
   },
   '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
   }
}));

export const Category = styled(Box, { shouldForwardProp })<{ color: string, $bgColor: string }>(({ theme, color, $bgColor }) => ({
   background: $bgColor,
   color: alpha(color, .8),
   borderRadius: 50
}));

 