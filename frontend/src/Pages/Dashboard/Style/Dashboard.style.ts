import { Box, IconButton, Stack, Typography, alpha, styled } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import { shouldForwardProp } from "@/Core/Utils";
import { PageWrapper } from "@/Core/Layout";

export const Dashboard = styled(PageWrapper)({});

export const QuizPreview = styled(Stack)(({ theme }) => ({
   background: theme.palette.common.white,
   borderRadius: 20,
   height: '100%',
   boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
   position: "relative"
}));

export const Image = styled('img')({
   width: "100%",
   height: "auto",
   aspectRatio: 3 / 2,
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
   borderRadius: "20px 20px 0 0",
})

export const Link = styled(ReactRouterLink)(({ theme }) => ({
   textDecoration: 'none',
   color: theme.palette.primary.main,
   fontWeight: 'bold',
   '&:hover ': {
      textDecoration: 'underline'
   }
}));

export const EllipsisText = styled(Typography, { shouldForwardProp })<{ $maxRow?: number }>(({ $maxRow }) => ({
   display: '-webkit-box',
   WebkitLineClamp: $maxRow || 1,
   WebkitBoxOrient: 'vertical',
   overflow: 'hidden',
   textOverflow: 'ellipsis'
}));

export const LikeButton = styled(IconButton)(({ theme }) => ({
   background: theme.palette.custom.light,
   '&:hover': {
      background: theme.palette.secondary.main,
   },
   '&.Mui-disabled': {
      background: theme.palette.custom.light,
   },
   '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
   }
}));

export const SaveButton = styled(LikeButton)({});
export const EditButton = styled(LikeButton)({});
export const DeleteButton = styled(LikeButton)({});
export const ResultButton = styled(LikeButton)({});

export const Category = styled(Box, { shouldForwardProp })<{ color: string, $bgColor: string }>(({ color, $bgColor }) => ({
   background: $bgColor,
   color: alpha(color, .8),
   borderRadius: 50
}));

 