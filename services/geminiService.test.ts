
import { describe, it, expect, vi } from 'vitest';
import { sendMessageToGemini } from './geminiService';

// Mock the Google GenAI SDK
const mockSendMessage = vi.fn();
const mockCreateChat = vi.fn(() => ({
  sendMessage: mockSendMessage
}));

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(() => ({
    chats: {
      create: mockCreateChat
    }
  }))
}));

describe('geminiService', () => {
  it('sends message and returns response text', async () => {
    mockSendMessage.mockResolvedValue({ text: 'AI Response' });
    
    const history = [{ role: 'user' as const, text: 'Hello' }];
    const response = await sendMessageToGemini(history, 'How are you?', 'en');
    
    expect(mockCreateChat).toHaveBeenCalled();
    expect(mockSendMessage).toHaveBeenCalledWith({ message: 'How are you?' });
    expect(response).toBe('AI Response');
  });

  it('handles errors gracefully', async () => {
    mockSendMessage.mockRejectedValue(new Error('API Error'));
    
    const response = await sendMessageToGemini([], 'Test');
    
    expect(response).toContain('having trouble connecting');
  });
  
  it('adjusts system instruction based on language', async () => {
      mockSendMessage.mockResolvedValue({ text: 'Hola' });
      await sendMessageToGemini([], 'Hola', 'es');
      
      // Verify configuration passed to create chat
      const config = mockCreateChat.mock.calls[0][0].config;
      expect(config.systemInstruction).toContain('Respond in Spanish');
  });
});
