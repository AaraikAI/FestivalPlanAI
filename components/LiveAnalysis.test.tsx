
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SentimentTracker, WeatherRisk } from './LiveAnalysis';

// Mock Recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  AreaChart: ({ children }: any) => <div>{children}</div>,
  Area: () => <div>Area</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
  defs: ({ children }: any) => <defs>{children}</defs>,
  linearGradient: ({ children }: any) => <linearGradient>{children}</linearGradient>,
  stop: () => <stop />
}));

describe('LiveAnalysis', () => {
  it('SentimentTracker renders without crashing', () => {
    const { container } = render(<SentimentTracker />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Live Crowd Mood');
  });

  it('WeatherRisk renders correctly', () => {
    const { container } = render(<WeatherRisk />);
    expect(container.textContent).toContain('AI Risk Prediction');
    expect(container.textContent).toContain('Low Risk');
  });
});
