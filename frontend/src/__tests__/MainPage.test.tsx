import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import MainPage from '../pages/MainPage';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Test for MainPage', () => {
  const mockNavigate = jest.fn();
  

  it('renders correctly', () => {

    const { container } = render(<MemoryRouter>
      <MainPage />
    </MemoryRouter>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
