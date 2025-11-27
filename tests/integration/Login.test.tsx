
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import { AuthProvider } from '../../context/AuthContext';

// Mock navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/FestPlan AI/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
  });

  it('handles role switching', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    
    const vendorBtn = screen.getByText('Vendor / Partner');
    fireEvent.click(vendorBtn);
    
    expect(screen.getByText('Sign In as Vendor →')).toBeInTheDocument();
  });

  it('submits form and calls login', async () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/Sign In/i));
    
    expect(screen.getByText(/Processing/i)).toBeInTheDocument();
    
    // Fast-forward simulated delay
    act(() => {
        vi.runAllTimers();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    
    vi.useRealTimers();
  });
});
