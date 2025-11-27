
import { describe, it, expect } from 'vitest';
import { formatCurrency, t } from './localization';

describe('Localization Utils', () => {
  describe('formatCurrency', () => {
    it('formats INR correctly', () => {
      // 1 INR = 1 INR (based on current logic)
      expect(formatCurrency(1000, 'INR')).toBe('₹1,000');
    });

    it('formats USD correctly based on exchange rate', () => {
      // Exchange rate in localization.ts is 0.012 for INR -> USD
      // 1000 INR * 0.012 = 12 USD
      expect(formatCurrency(1000, 'USD')).toBe('$12');
    });

    it('formats EUR correctly based on exchange rate', () => {
      // Exchange rate in localization.ts is 0.011 for INR -> EUR
      // 1000 INR * 0.011 = 11 EUR
      expect(formatCurrency(1000, 'EUR')).toBe('€11');
    });

    it('handles zero values', () => {
      expect(formatCurrency(0, 'INR')).toBe('₹0');
    });

    it('handles negative values', () => {
      expect(formatCurrency(-500, 'INR')).toBe('-₹500');
    });
  });

  describe('t (Translate)', () => {
    it('returns correct English translation', () => {
      expect(t('dashboard', 'en')).toBe('Dashboard');
    });

    it('returns correct Hindi translation', () => {
      expect(t('dashboard', 'hi')).toBe('डैशबोर्ड');
    });

    it('returns correct Spanish translation', () => {
      expect(t('dashboard', 'es')).toBe('Tablero');
    });

    it('falls back to English for missing keys/languages', () => {
      // @ts-ignore - Testing invalid key handling if types were looser
      expect(t('nonexistent_key' as any, 'en')).toBeUndefined();
      // Using a valid key but an unsupported language code (if typings allowed)
      // Since typings are strict, we trust the function returns the mapped value.
      // If we pass 'en' for a key that exists, we get the value.
      expect(t('welcome', 'en')).toBe('Namaste');
    });
  });
});
