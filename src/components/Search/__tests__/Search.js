import Search from '../Search';
import { renderWithTheme } from '../../../lib';

const testId = 'search';

describe('Search', () => {
  it('renders', () => {
    renderWithTheme(<Search />);
    const search = document.getElementById(testId);
    expect(search).toMatchSnapshot();
  });
});
