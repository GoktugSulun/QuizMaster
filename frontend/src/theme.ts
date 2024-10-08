import { alpha, createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

declare module '@mui/material/Button' {
   interface ButtonPropsVariantOverrides {
     dashed: true;
   }
};

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette['primary'];
  }
  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}
 
const defaultTheme = createTheme({
  palette: {
    custom: {
      // main: 'rgba(129, 117, 192, 0.8)',
      main: alpha('#8175c0', 0.8),
      light: '#EDEAFB'
    },
    primary: {
      main: deepPurple[500],
      dark: deepPurple[700],
      light: '#EDEAFB',
    },
    secondary: {
      main: '#F9FAFC',
      light: 'rgba(0, 0, 0, 0.16)',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    }
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
      // variants: [
      //   {
      //     props: { variant: 'dashed' },
      //     style: {
      //       textTransform: 'none',
      //       border: `2px dashed ${defaultTheme.palette.primary.main}`,
      //       '&:hover': {
      //         background: blue
      //       }
      //     },
      //   },
      //   {
      //     props: { variant: 'dashed', color: 'secondary' },
      //     style: {
      //       border: `4px dashed ${red[500]}`,
      //     },
      //   },
      // ],
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
        },
        paragraph: {
          margin: 0,
          color: '#5e5e5e'
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