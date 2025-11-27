
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SettingsProvider, useSettings } from './SettingsContext';
import { AuthProvider } from './AuthContext';

const TestComponent = () => {
  const { togglePrivacySetting, privacy, exportUserData } = useSettings();
  return (
    <div>
      <div data-testid="passive-mode">{privacy.shareDataForCredits ? 'ON' : 'OFF'}</div>
      <button onClick={() => togglePrivacySetting('shareDataForCredits')}>Toggle Passive</button>
      <button onClick={exportUserData}>Export</button>
    </div>
  );
};

describe('SettingsContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock URL.createObjectURL and document interaction
    globalThis.URL.createObjectURL = vi.fn();
    document.createElement = vi.fn().mockReturnValue({
        setAttribute: vi.fn(),
        click: vi.fn(),
        remove: vi.fn(),
    } as any);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('toggles privacy settings', () => {
    render(
      <AuthProvider>
        <SettingsProvider>
          <TestComponent />
        </SettingsProvider>
      </AuthProvider>
    );

    expect(screen.getByTestId('passive-mode').textContent).toBe('OFF');
    
    act(() => {
        screen.getByText('Toggle Passive').click();
    });
    
    expect(screen.getByTestId('passive-mode').textContent).toBe('ON');
  });

  it('handles data export', () => {
      render(
        <AuthProvider>
          <SettingsProvider>
            <TestComponent />
          </SettingsProvider>
        </AuthProvider>
      );
      
      act(() => {
          screen.getByText('Export').click();
      });
      
      expect(document.createElement).toHaveBeenCalledWith('a');
  });
});
