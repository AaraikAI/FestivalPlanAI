
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { encryptData, decryptData } from './storageService';

// Mock Web Crypto API
const mockSubtle = {
  generateKey: vi.fn(),
  exportKey: vi.fn(),
  importKey: vi.fn(),
  encrypt: vi.fn(),
  decrypt: vi.fn(),
};

Object.defineProperty(globalThis, 'crypto', {
  value: {
    subtle: mockSubtle,
    getRandomValues: (arr: Uint8Array) => arr.fill(1), // Deterministic IV
  },
});

describe('storageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    
    // Default mock implementations
    mockSubtle.generateKey.mockResolvedValue('mock-key');
    mockSubtle.exportKey.mockResolvedValue({ k: 'mock-jwk' });
    mockSubtle.importKey.mockResolvedValue('mock-key-obj');
    
    // Mock encrypt to return a simple buffer based on input
    mockSubtle.encrypt.mockImplementation(async (_, __, data) => {
      return data; // Return raw data as "encrypted" for simple verification
    });

    // Mock decrypt to return the input data
    mockSubtle.decrypt.mockImplementation(async (_, __, data) => {
      return data;
    });
  });

  it('encrypts data successfully', async () => {
    const data = { foo: 'bar' };
    const result = await encryptData(data);
    
    expect(mockSubtle.generateKey).toHaveBeenCalled();
    expect(mockSubtle.encrypt).toHaveBeenCalled();
    
    const parsed = JSON.parse(result);
    expect(parsed).toHaveProperty('iv');
    expect(parsed).toHaveProperty('data');
  });

  it('decrypts data successfully', async () => {
    const originalData = { foo: 'bar' };
    // Simulate what encryptData produces (using our mocks)
    // Encoded '{"foo":"bar"}' -> Array
    const encoded = new TextEncoder().encode(JSON.stringify(originalData));
    const encryptedDataArray = Array.from(encoded);
    
    const cipherText = JSON.stringify({
      iv: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      data: encryptedDataArray
    });

    const result = await decryptData(cipherText, {});
    expect(result).toEqual(originalData);
    expect(mockSubtle.decrypt).toHaveBeenCalled();
  });

  it('returns default value if decryption fails', async () => {
    mockSubtle.decrypt.mockRejectedValue(new Error('Decrypt failed'));
    
    const cipherText = JSON.stringify({ iv: [], data: [] });
    const result = await decryptData(cipherText, 'default');
    
    expect(result).toBe('default');
  });
  
  it('returns raw data if not encrypted structure', async () => {
      const raw = JSON.stringify({ simple: 'data' });
      const result = await decryptData(raw, {});
      expect(result).toEqual({ simple: 'data' });
  });
});
