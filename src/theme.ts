import { alpha, createTheme } from '@mui/material/styles';
import { blue, deepPurple, purple, red } from '@mui/material/colors';

declare module '@mui/material/Button' {
   interface ButtonPropsVariantOverrides {
     dashed: true;
   }
 };
 
const defaultTheme = createTheme({
   palette: {
     primary: {
       main: deepPurple[500],
       dark: deepPurple[700],
       light: alpha(deepPurple[500], 0.5)
     },
     secondary: {
       main: '#F9FAFC',
     },
   }
 });
 
const theme = createTheme(defaultTheme, {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover &:not(.Mui-error).MuiOutlinedInput-notchedOutline": {
            borderColor: defaultTheme.palette.primary.main
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: defaultTheme.palette.primary.main,
          color: defaultTheme.palette.common.white,
          textTransform: 'none',
          padding: "5px 15px",
          fontSize: 14,
          minWidth: 'initial',
          transition: 'all 350ms',
          '&:hover': {
            background: defaultTheme.palette.primary.dark,
          }
        }
      },
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${defaultTheme.palette.primary.main}`,
            '&:hover': {
              background: blue
            }
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minWidth: '100px'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.common.black
        }
      }
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       "& path": {
    //         fill: defaultTheme.palette.primary.main
    //       }
    //     }
    //   }
    // },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '&.Mui-error .MuiButtonBase-root': {
            color: defaultTheme.palette.error.main
          }
        },
        asterisk: {
          color: defaultTheme.palette.common.black
        },
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // background: defaultTheme.palette.primary.light,
          // color: defaultTheme.palette.common.white,
          // '& .MuiSvgIcon-root': {
          //   color: defaultTheme.palette.primary.main,
          // }
        },
      }
    }
  },
});

export default theme; 