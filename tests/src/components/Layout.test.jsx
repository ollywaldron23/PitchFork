import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from '../../../frontend/src/components/Layout';

// Mock Navbar so the test stays simple and focused
vi.mock('../../../frontend/src/components/Navbar', () => ({
  default: () => <div data-testid="navbar" />,
}));

describe('Layout component', () => {
  it('renders Navbar and children', () => {
    render(
      <Layout>
        <div data-testid="child">Hello World</div>
      </Layout>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child').textContent).toBe('Hello World');
    expect(document.querySelector('main.main-view')).toBeInTheDocument();
  });
});
