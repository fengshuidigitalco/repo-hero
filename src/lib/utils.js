import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';

export const renderWithTheme = (children: JSX.Element) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
