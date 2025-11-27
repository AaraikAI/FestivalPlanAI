
// A simple simulation of AES encryption for the frontend demo context.
// In a strictly secure env, we'd use window.crypto.subtle with proper key management.
// Here we use a generated key stored in session (cleared on tab close) or local storage for demo persistence.

const ENCRYPTION_KEY_STORAGE = 'festplan_enc_key';

// Helper to generate a random key if one doesn't exist
const getOrCreateKey = async (): Promise<CryptoKey> => {
  let jwk = localStorage.getItem(ENCRYPTION_KEY_STORAGE);
  
  if (jwk) {
    return window.crypto.subtle.importKey(
      "jwk",
      JSON.parse(jwk),
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exported = await window.crypto.subtle.exportKey("jwk", key);
  localStorage.setItem(ENCRYPTION_KEY_STORAGE, JSON.stringify(exported));
  return key;
};

export const encryptData = async (data: any): Promise<string> => {
  try {
    const key = await getOrCreateKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(data));

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded
    );

    // Combine IV and data for storage
    const ivArray = Array.from(iv);
    const encryptedArray = Array.from(new Uint8Array(encrypted));
    return JSON.stringify({ iv: ivArray, data: encryptedArray });
  } catch (e) {
    console.error("Encryption Failed", e);
    return JSON.stringify(data); // Fallback for demo stability
  }
};

export const decryptData = async <T>(cipherText: string | null, defaultValue: T): Promise<T> => {
  if (!cipherText) return defaultValue;

  try {
    const parsed = JSON.parse(cipherText);
    if (!parsed.iv || !parsed.data) return parsed as T; // Handle unencrypted legacy data

    const key = await getOrCreateKey();
    const iv = new Uint8Array(parsed.iv);
    const data = new Uint8Array(parsed.data);

    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    const decoded = new TextDecoder().decode(decrypted);
    return JSON.parse(decoded) as T;
  } catch (e) {
    console.error("Decryption Failed", e);
    return defaultValue;
  }
};
