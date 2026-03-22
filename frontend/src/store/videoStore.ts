import { create } from 'zustand';
import api from '../lib/axios';

interface VideoState {
  currentVideoId: string | null;
  setCurrentVideoId: (id: string) => void;
  updateProgress: (videoId: string, position: number, completed: boolean) => Promise<void>;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideoId: null,
  setCurrentVideoId: (id) => set({ currentVideoId: id }),
  updateProgress: async (videoId, position, completed) => {
    try {
      await api.post(`/progress/videos/${videoId}`, {
        last_position_seconds: position,
        is_completed: completed
      });
    } catch (error) {
      console.error('Failed to update progress', error);
      throw error;
    }
  }
}));
