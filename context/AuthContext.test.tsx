
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

// Test consumer
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'LoggedIn' : 'LoggedOut'}</div>
      <div data-testid="user-role">{user?.role}</div>
      <button onClick={() => login('Test', 'test@test.com', 'HOST')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('manages login and logout state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initial state
    expect(screen.getByTestId('auth-status').textContent).toBe('LoggedOut');

    // Login
    act(() => {
      screen.getByText('Login').click();
    });
    
    await waitFor(() => {
        expect(screen.getByTestId('auth-status').textContent).toBe('LoggedIn');
    });
    expect(screen.getByTestId('user-role').textContent).toBe('HOST');
    expect(localStorage.getItem('festplan_user')).toBeTruthy();

    // Logout
    act(() => {
      screen.getByText('Logout').click();
    });
    expect(screen.getByTestId('auth-status').textContent).toBe('LoggedOut');
    expect(localStorage.getItem('festplan_user')).toBeFalsy();
  });
});
