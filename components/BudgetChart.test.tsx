
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BudgetChart from './BudgetChart';
import { SettingsProvider } from '../context/SettingsContext';

// Mock Recharts because it relies on DOM measurement APIs not present in JSDOM
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: ({ children }: any) => <div>{children}</div>,
  Cell: () => <div>Cell</div>,
  Tooltip: () => <div>Tooltip</div>,
  Legend: () => <div>Legend</div>,
}));

describe('BudgetChart', () => {
  it('renders utilization percentage correctly', () => {
    render(
      <SettingsProvider>
        <BudgetChart total={1000} spent={250} />
      </SettingsProvider>
    );

    // 250 / 1000 = 25%
    expect(screen.getByText('25%')).toBeDefined();
    expect(screen.getByText('Utilized')).toBeDefined();
  });

  it('handles zero budget gracefully', () => {
    render(
      <SettingsProvider>
        <BudgetChart total={0} spent={0} />
      </SettingsProvider>
    );

    expect(screen.getByText('0%')).toBeDefined();
  });
});
