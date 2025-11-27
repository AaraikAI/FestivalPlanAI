
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventProvider, useEvents } from './EventContext';
import { Event, EventType, VendorCategory } from '../types';

// Test Component to consume context
const TestComponent = () => {
  const { events, addEvent, addVendorToEvent, getEvent } = useEvents();

  return (
    <div>
      <div data-testid="event-count">{events.length}</div>
      <button
        data-testid="add-btn"
        onClick={() => addEvent({
          id: 'test-event',
          name: 'Test Event',
          type: EventType.WEDDING,
          date: '2025-01-01',
          location: 'Test Loc',
          budget: 1000,
          spent: 0,
          tasks: [],
          guests: [],
          vendors: [],
          sustainabilityScore: 0,
          image: ''
        })}
      >
        Add Event
      </button>
      <button
        data-testid="add-vendor-btn"
        onClick={() => addVendorToEvent('test-event', 'v1')}
      >
        Add Vendor
      </button>
      <div data-testid="vendor-count">
        {getEvent('test-event')?.vendors.length || 0}
      </div>
    </div>
  );
};

describe('EventContext', () => {
  it('adds an event correctly', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    // Initial count (mock data has 2 events)
    expect(screen.getByTestId('event-count').textContent).toBe('2');

    act(() => {
      screen.getByTestId('add-btn').click();
    });

    expect(screen.getByTestId('event-count').textContent).toBe('3');
  });

  it('adds a vendor to an event and prevents duplicates', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    // Add the test event first
    act(() => {
      screen.getByTestId('add-btn').click();
    });

    // Initial vendor count should be 0
    expect(screen.getByTestId('vendor-count').textContent).toBe('0');

    // Add vendor
    act(() => {
      screen.getByTestId('add-vendor-btn').click();
    });
    expect(screen.getByTestId('vendor-count').textContent).toBe('1');

    // Try adding same vendor again (should prevent duplicate)
    act(() => {
      screen.getByTestId('add-vendor-btn').click();
    });
    expect(screen.getByTestId('vendor-count').textContent).toBe('1');
  });
});
