import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3bb570',
      dark: '#259857',
      light: '#62c48d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF9D45',
      dark: '#FF902C',
      light: '#F0BC61',
      contrastText: '#ffffff',
    },
    success: {
      main: '#0A8609',
      dark: '#066006',
      light: '#81C784',
      contrastText: '#ffffff',
    },
    info: {
      main: '#1B9EFF',
      dark: '#0B79D0',
      light: '#BBDEFB',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FF9D45',
      dark: '#F57C00',
      light: '#FFB74D',
      contrastText: '#ffffff',
    },
    error: {
      main: '#E45555',
      dark: '#D32F2F',
      light: '#E57373',
      contrastText: '#ffffff',
    },
    grey: {
      50: '#FAFAFA', // PolarBear
      100: '#F5F5F5',
      200: '#EEEEEE', // Koala
      300: '#E0E0E0', // Dolphin
      400: '#BDBDBD', // Squirrel
      500: '#9E9E9E', // Rhino
      600: '#757575',
      700: '#616161',
      800: '#424242', // Hippo
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#B1B1B1', // Panther
    },
    text: {
      primary: '#1B1B1B',
      secondary: 'rgba(0, 0, 0, .38)',
      disabled: 'rgba(0, 0, 0, .38)',
      hint: 'rgba(0, 0, 0, .38)',
    },
    action: {
      active: 'rgba(0, 0, 0, .54)',
      hover: 'rgba(0, 0, 0, .04)',
      selected: 'rgba(0, 0, 0, .08)',
      disabled: 'rgba(0, 0, 0, .26)',
      disabledBackground: 'rgba(0, 0, 0, .12)',
      focus: 'rgba(0, 0, 0, .12)',
    },
    common: {
      black: '#1b1b1b',
      white: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#fafafa',
    },
    divider: 'rgba(0, 0, 0, .12)',
  },
  typography: {
    h1: {
      fontFamily: 'Lato',
      fontSize: 96,
      lineHeight: '112px',
      fontWeight: 'lighter',
      letterSpacing: -1.5,
    },
    h2: {
      fontFamily: 'Lato',
      fontSize: 60,
      lineHeight: '72px',
      fontWeight: 'lighter',
      letterSpacing: -0.5,
    },
    h3: {
      fontFamily: 'Lato',
      fontSize: 48,
      lineHeight: '56px',
      fontWeight: 'normal',
      letterSpacing: 0,
    },
    h4: {
      fontFamily: 'Lato',
      fontSize: 34,
      lineHeight: '42px',
      fontWeight: 'normal',
      letterSpacing: 0.25,
    },
    h5: {
      fontFamily: 'Lato',
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: 'normal',
      letterSpacing: 0,
    },
    h6: {
      fontFamily: 'Lato',
      fontSize: 20,
      lineHeight: '32px',
      fontWeight: 'normal',
      letterSpacing: 0.15,
    },
    subtitle1: {
      fontFamily: 'Lato',
      fontSize: 16,
      lineHeight: '28px',
      fontWeight: 'normal',
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontFamily: 'Lato',
      fontSize: 14,
      lineHeight: '22px',
      fontWeight: 'normal',
      letterSpacing: 0.1,
    },
    body1: {
      fontFamily: 'Lato',
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 'normal',
      letterSpacing: 0.15,
    },
    body2: {
      fontFamily: 'Lato',
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 'normal',
      letterSpacing: 0.15,
    },
    caption: {
      fontFamily: 'Lato',
      fontSize: 12,
      lineHeight: '20px',
      fontWeight: 'normal',
      letterSpacing: 0.4,
    },
    overline: {
      fontFamily: 'Lato',
      fontSize: 12,
      lineHeight: '32px',
      fontWeight: 'normal',
      letterSpacing: 1,
    },
    button: {
      fontFamily: 'Lato',
      fontSize: 12,
      lineHeight: '14px',
      fontWeight: 'normal',
      letterSpacing: 0.3,
      textTransform: 'capitalize',
    },
  },
  flexContainer: {
    row: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  breakpoints: {
    values: {
      xs: 300,
      galaxyX5: 361,
      mobile: 415,
      sm: 500,
      surfaceDuo: 540,
      smTab: 610,
      md: 650,
      lg: 800,
      lgr: 825,
      xl: 1025,
    },
  },
  plantHealth: {
    green: '#7ED321',
    yellow: '#FCD308',
    red: '#D0021B',
  },
});
