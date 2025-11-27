
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import VendorMarketplace from './VendorMarketplace';
import { EventProvider } from '../context/EventContext';
import { SettingsProvider } from '../context/SettingsContext';
import { AuthProvider } from '../context/AuthContext';

// Mock constants to control seasonality
vi.mock('../constants', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        // @ts-ignore
        ...actual,
        getSeasonalityMultiplier: () => 1.5, // Force 50% surge
    };
});

describe('VendorMarketplace', () => {
  it('displays surge pricing warning when seasonality is high', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
            <SettingsProvider>
                <EventProvider>
                    <VendorMarketplace />
                </EventProvider>
            </SettingsProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/High Demand Season/i)).toBeInTheDocument();
    expect(screen.getByText(/\+50%/i)).toBeInTheDocument();
  });
});
