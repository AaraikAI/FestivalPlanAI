
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateEvent from '../../pages/CreateEvent';
import Dashboard from '../../pages/Dashboard';
import { EventProvider } from '../../context/EventContext';
import { SettingsProvider } from '../../context/SettingsContext';
import { AuthProvider } from '../../context/AuthContext';

// Mock scrollTo to avoid jsdom errors
window.scrollTo = vi.fn();

describe('Create Event Integration', () => {
  it('completes the event creation wizard', async () => {
    render(
      <AuthProvider>
        <SettingsProvider>
          <EventProvider>
            <MemoryRouter initialEntries={['/create-event']}>
              <Routes>
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </MemoryRouter>
          </EventProvider>
        </SettingsProvider>
      </AuthProvider>
    );

    // Step 1: Select Type
    const weddingBtn = screen.getByText('Wedding');
    fireEvent.click(weddingBtn);

    // Step 2: Select Template (Standard Setup)
    const templateBtn = screen.getByText('Standard Setup');
    fireEvent.click(templateBtn);

    // Step 3: Fill Details
    const nameInput = screen.getByPlaceholderText('Event Name');
    fireEvent.change(nameInput, { target: { value: 'My Big Wedding' } });

    // Date Input (Label might vary, looking by type usually better or index)
    // The input has type="date"
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        fireEvent.change(dateInput, { target: { value: '2025-12-25' } });
    }

    const budgetInput = screen.getByPlaceholderText('Budget');
    fireEvent.change(budgetInput, { target: { value: '500000' } });

    // Submit
    const createBtn = screen.getByText('Create');
    fireEvent.click(createBtn);

    // Check redirection to Dashboard
    // Dashboard shows "Welcome, Jay Deep!"
    expect(await screen.findByText(/Welcome/i)).toBeInTheDocument();
    
    // Check if new event is listed
    expect(screen.getByText('My Big Wedding')).toBeInTheDocument();
  });
});
