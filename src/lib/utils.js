import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';

export const renderWithTheme = (children: JSX.Element) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export const determineErrorMessage = (status) => {
  switch (status) {
    case 403: {
      return 'Search request limit reached. Please try again in a bit';
    }
    case 422: {
      return 'Incorrectly formatted query. This code is broken!';
    }
    case 503: {
      return "Gitub's API is down. Please try again in a bit.";
    }
    default: {
      return 'An error occurred. Please try again in a bit.';
    }
  }
};
