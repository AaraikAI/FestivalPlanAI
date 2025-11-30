
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CommunityPost } from '../types';
import { MOCK_COMMUNITY_POSTS } from '../constants';
import { encryptData, decryptData } from '../services/storageService';
import { useAuth } from './AuthContext';

interface CommunityContextType {
  posts: CommunityPost[];
  addPost: (content: string, tags: string[], image?: string) => void;
  likePost: (postId: string) => void;
  isLoading: boolean;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load Posts
  useEffect(() => {
    const loadPosts = async () => {
        const stored = localStorage.getItem('festplan_community');
        if (stored) {
            const decrypted = await decryptData<CommunityPost[]>(stored, MOCK_COMMUNITY_POSTS);
            setPosts(decrypted);
        } else {
            setPosts(MOCK_COMMUNITY_POSTS);
        }
        setIsLoading(false);
    };
    loadPosts();
  }, []);

  // Save Posts
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
        const save = async () => {
            const encrypted = await encryptData(posts);
            localStorage.setItem('festplan_community', encrypted);
        };
        save();
    }
  }, [posts, isLoading]);

  const addPost = (content: string, tags: string[], image?: string) => {
    const newPost: CommunityPost = {
        id: `post_${Date.now()}`,
        author: user?.name || 'Anonymous',
        avatar: user?.avatar || '?', // In a real app this would be a URL
        title: 'New Update', // Simplified for this demo
        content,
        likes: 0,
        comments: 0,
        tags,
        timestamp: 'Just now',
        image
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
      setPosts(prev => prev.map(p => {
          if (p.id === postId) {
              return { ...p, likes: p.likes + 1 };
          }
          return p;
      }));
  };

  return (
    <CommunityContext.Provider value={{ posts, addPost, likePost, isLoading }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) throw new Error('useCommunity must be used within CommunityProvider');
  return context;
};
