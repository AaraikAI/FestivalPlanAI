
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import VendorOnboarding from './VendorOnboarding';
import { EventProvider } from '../context/EventContext';
import { AuthProvider } from '../context/AuthContext';

describe('VendorOnboarding', () => {
  it('navigates through steps', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <EventProvider>
            <VendorOnboarding />
          </EventProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
    
    // Step 1
    fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'My Vendor' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Step 2
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Best vendor ever' } });
    fireEvent.click(screen.getByText('Next'));

    // Step 3
    expect(screen.getByText(/Upload ID Proof/i)).toBeInTheDocument();
  });
  
  it('simulates submission verification', async () => {
      vi.useFakeTimers();
      render(
      <MemoryRouter>
        <AuthProvider>
          <EventProvider>
            <VendorOnboarding />
          </EventProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Fast forward to step 3
    fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    // Submit
    fireEvent.click(screen.getByText('Submit'));
    
    expect(screen.getByText('Verifying...')).toBeInTheDocument();
    
    act(() => {
        vi.runAllTimers();
    });

    await waitFor(() => {
        expect(screen.getByText('Welcome!')).toBeInTheDocument();
    });
    
    vi.useRealTimers();
  });
});
