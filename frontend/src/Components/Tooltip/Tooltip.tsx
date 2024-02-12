import { type TooltipProps, styled, Tooltip, tooltipClasses, alpha } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
 ))(({ theme }) => ({
   [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.custom.light,
      fontSize: 'large',
      "&:before": {
        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
      }
    },
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.custom.light,
      color: theme.palette.primary.main,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '18px'
   }
 }));

 export default CustomTooltip;