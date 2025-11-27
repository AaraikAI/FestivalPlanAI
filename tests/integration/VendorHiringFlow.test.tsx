
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import VendorDetails from '../../pages/VendorDetails';
import EventDetails from '../../pages/EventDetails';
import { EventProvider } from '../../context/EventContext';
import { SettingsProvider } from '../../context/SettingsContext';
import { AuthProvider } from '../../context/AuthContext';
import { MOCK_VENDORS } from '../../constants';

// Mock window.alert
window.alert = vi.fn();

describe('Vendor Hiring Integration', () => {
  it('allows hiring a vendor for an existing event', () => {
    const targetVendor = MOCK_VENDORS[0]; // v1

    render(
      <AuthProvider>
        <SettingsProvider>
          <EventProvider>
            <MemoryRouter initialEntries={[`/vendor/${targetVendor.id}`]}>
              <Routes>
                <Route path="/vendor/:id" element={<VendorDetails />} />
                <Route path="/event/:id" element={<EventDetails />} />
              </Routes>
            </MemoryRouter>
          </EventProvider>
        </SettingsProvider>
      </AuthProvider>
    );

    // Check we are on details page
    expect(screen.getByText(targetVendor.name)).toBeInTheDocument();

    // Click Hire
    const hireBtn = screen.getByText('Hire Vendor');
    fireEvent.click(hireBtn);

    // Modal should appear with list of events (from Mock Data)
    // MOCK_EVENTS[0] is "Sharma's Diwali Bash"
    const eventOption = screen.getByText("Sharma's Diwali Bash");
    fireEvent.click(eventOption);

    // Confirm
    const confirmBtn = screen.getByText('Confirm');
    fireEvent.click(confirmBtn);

    // Should navigate to Event Details
    // Event Details shows "Vendors" count
    // We can verify navigation by looking for Event Name header
    expect(screen.getByText("Sharma's Diwali Bash")).toBeInTheDocument();
  });
});
