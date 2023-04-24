import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import Analytics from '../pages/Analytics';
import "../index.css";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../index.css', () => '');

describe('Analytics Page ', () => {
  const mockNavigate = jest.fn();
  

  it('Rendering correctly', () => {

    const { container } = render(<MemoryRouter>
      <Analytics />
    </MemoryRouter>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
