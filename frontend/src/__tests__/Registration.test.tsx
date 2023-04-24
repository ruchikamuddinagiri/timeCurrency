import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import RegisterForm from '../pages/RegisterForm';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Test for Registeration', () => {
  const mockNavigate = jest.fn();
  

  it('renders correctly', () => {

    const { container } = render(<MemoryRouter>
      <RegisterForm />
    </MemoryRouter>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
