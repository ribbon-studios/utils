import { render } from '@testing-library/react';
import { App } from '../App';

describe('<App />', () => {
  it('should render the App', () => {
    const component = render(<App />);

    expect(component.baseElement).toBeTruthy();
  });
});
