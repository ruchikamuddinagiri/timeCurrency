import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import "../index.css";
import Tasks from '../pages/Tasks';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../index.css', () => '');


describe('Test for Tasks', () => {
  const mockNavigate = jest.fn();
  

  it('renders correctly', () => {

    const { container } = render(<MemoryRouter>
      <Tasks />
    </MemoryRouter>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
