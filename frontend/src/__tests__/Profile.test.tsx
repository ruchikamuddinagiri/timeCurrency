import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import Profile from '../pages/Profile';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Test for Profile', () => {
  const mockNavigate = jest.fn();
  

  it('renders correctly', () => {

    const { container } = render(<MemoryRouter>
      <Profile />
    </MemoryRouter>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
