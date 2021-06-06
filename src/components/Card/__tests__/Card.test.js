import { Card } from '../Card';
import { renderWithTheme } from '../../../lib';
const PROPS = {
  id: 'test',
  title: 'Test Card',
  content: 'Card Content',
  color: 300,
};

const testId = `${PROPS.id}-card`;

describe('card', () => {
  it('renders', () => {
    renderWithTheme(<Card {...PROPS} />);
    const renderedCard = document.getElementById(testId);
    expect(renderedCard).toMatchSnapshot();
  });

  it('renders with footer', () => {
    renderWithTheme(<Card {...PROPS} footer="Card footer" />);
    const cardFooter = document.getElementById(`${testId}-footer`);
    expect(cardFooter).toBeInTheDocument();
  });
});
