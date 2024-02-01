import { Box, IconButton, Typography, alpha, styled } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import { shouldForwardProp } from "@/Core/Utils";
import { PageWrapper } from "@/Core/Layout";

export const Dashboard = styled(PageWrapper)(({ theme }) => ({
   
}));

export const Quiz = styled('div')(({ theme }) => ({
   background: theme.palette.common.white,
   borderRadius: 20,
   height: '100%',
   position: 'relative',
   '& .quiz-img': {
      width: '100%',
      height: '180px',
      objectFit: 'cover'
   },
   ':hover': {
      cursor: 'pointer',
      '& .MuiTypography-root a': {
         // color: theme.palette.primary.main,
         textDecoration: 'underline'
      }
   },
}));

export const Image = styled('img')(({ theme }) => ({
   width: '100%',
   height: '180px',
   objectFit: "cover",
   borderRadius: "20px 20px 0 0"
})); 

export const Link = styled(ReactRouterLink)(({ theme }) => ({
   textDecoration: 'none',
   color: theme.palette.common.black,
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
   position: 'absolute',
   top: 10,
   right: 10,
   background: 'rgba(0, 0, 0, 0.2)',
   '&:hover': {
      background: 'rgba(0, 0, 0, 0.3)',
   },
   '& .MuiSvgIcon-root': {
      color: theme.palette.common.white
   }
}));

export const Category = styled(Box, { shouldForwardProp })<{ color: string, $bgColor: string }>(({ theme, color, $bgColor }) => ({
   background: $bgColor,
   color: alpha(color, .8),
   margin: '15px 20px',
   padding: '5px 15px',
   borderRadius: 50
}));

 