import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: async () => {
        try {
          await $post('user/sign/out');
          set({ user: null });
          window.location.href = '/login';
        } catch (err) {
          console.error(err);
        }
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
