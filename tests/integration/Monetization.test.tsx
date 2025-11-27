
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CreateEvent from '../../pages/CreateEvent';
import { EventProvider } from '../../context/EventContext';
import { SettingsProvider } from '../../context/SettingsContext';

// Mock alert to capture the monetization block
window.alert = vi.fn();

describe('Monetization Gate', () => {
  it('blocks Premium templates for Free tier users', () => {
    render(
      <SettingsProvider>
         <EventProvider>
            <MemoryRouter>
              <CreateEvent />
            </MemoryRouter>
         </EventProvider>
      </SettingsProvider>
    );

    // Step 1: Select Type
    fireEvent.click(screen.getByText('Wedding'));

    // Step 2: Try to click "Royal Wedding (Pro)"
    const premiumTemplate = screen.getByText(/Royal Wedding/i);
    fireEvent.click(premiumTemplate);

    // Verify alert was called
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Upgrade to Pro'));
    
    // Should NOT have advanced to Step 3 (Inputs shouldn't be visible)
    const nameInput = screen.queryByPlaceholderText('Event Name');
    expect(nameInput).not.toBeInTheDocument();
  });
});
