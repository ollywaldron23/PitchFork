import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LandingPage from '../../../frontend/src/components/LandingPage';
import { vi } from 'vitest';

describe('LandingPage component', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            positive: 'Great idea!',
            negative: 'Not so great.',
          }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Got an idea/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your idea/i)).toBeInTheDocument();
    expect(screen.getByText(/pitch/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  it('joke mode toggle works', () => {
    render(<LandingPage />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('does not submit when idea input is empty', async () => {
    render(<LandingPage />);
    fireEvent.click(screen.getByText(/pitch/i));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits idea and shows feedback after fetch', async () => {
    render(<LandingPage />);
    fireEvent.change(screen.getByPlaceholderText(/Type your idea/i), {
      target: {
        value:
          'This is a fully valid idea that is definitely longer than fifty characters.',
      },
    });
    fireEvent.click(screen.getByText(/pitch/i));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/review-idea',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idea: 'This is a fully valid idea that is definitely longer than fifty characters.',
            jokeMode: false,
          }),
        })
      );
    });

    // Wait for alert and hover zones
    await waitFor(() => {
      expect(screen.getByText(/pitch/i)).toBeInTheDocument();
    });
  });

  it('resets the form properly', async () => {
    render(<LandingPage />);

    fireEvent.change(screen.getByPlaceholderText(/Type your idea/i), {
      target: { value: 'Flying toaster' },
    });

    fireEvent.click(screen.getByText(/reset/i));

    expect(screen.getByPlaceholderText(/Type your idea/i).value).toBe('');
  });
});
