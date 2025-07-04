import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '../../../frontend/src/components/Navbar';

describe('Navbar component', () => {
  it('renders navbar and logo image', () => {
    render(<Navbar />);
    expect(screen.getByRole('img', { name: /pitchfork logo/i })).toBeInTheDocument();
  });

  it('help modal is hidden by default', () => {
    render(<Navbar />);
    expect(screen.queryByText(/what is pitchfork/i)).not.toBeInTheDocument();
  });

  it('shows and hides help modal when clicking icons', async () => {
    render(<Navbar />);

    const helpIcon = document.querySelector('.nav-help-icon');
    expect(helpIcon).toBeInTheDocument();

    fireEvent.click(helpIcon);

    const modalHeading = await screen.findByText(/what is pitchfork/i);
    expect(modalHeading).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', { name: /close help modal/i });

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(screen.queryByText(/what is pitchfork/i)).not.toBeInTheDocument();
  });
});
