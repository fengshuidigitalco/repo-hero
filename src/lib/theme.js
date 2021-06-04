import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, purple } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
      dark: '#259857',
      light: '#62c48d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: green[700],
      dark: '#FF902C',
      light: '#F0BC61',
      contrastText: '#ffffff',
    },
    warning: {
      main: blue[700],
    },
  },
  flexContainer: {
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  breakpoints: {
    values: {
      xs: 300,
      mobile: 415,
      sm: 500,
      smTab: 610,
      md: 650,
      lg: 800,
      xl: 1025,
    },
  },
});
