import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import EmailVerification from '../pages/EmailVerification';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Test for Email', () => {
  const mockNavigate = jest.fn();
  

  it('renders correctly', () => {

    const { container } = render(<MemoryRouter>
      <EmailVerification />
    </MemoryRouter>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
