import { type TooltipProps, styled, Tooltip, tooltipClasses, alpha } from "@mui/material";
import { shouldForwardProp } from "@/Core/Utils";

type CustomTooltipProps = TooltipProps & {
  $bgColor?: string;
  $color?: string;
}

const CustomTooltip = styled(({ className, ...props }: CustomTooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
 ), { shouldForwardProp })(({ theme, ...props }) => ({
   [`& .${tooltipClasses.arrow}`]: {
      color: props?.$bgColor || theme.palette.custom.light,
      fontSize: 'large',
      "&:before": {
        border: `1px solid ${props?.$color || alpha(theme.palette.primary.main, 0.3)}`,
      }
    },
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: props?.$bgColor || theme.palette.custom.light,
      color: props?.$color || theme.palette.primary.main,
      border: `1px solid ${props?.$color || alpha(theme.palette.primary.main, 0.3)}`,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '18px'
   }
 }));

 export default CustomTooltip;