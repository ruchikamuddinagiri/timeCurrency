import create from 'zustand';
import { User } from '../api/types';

type AuthStore = {
  authUser: User | null;
  isLoading: boolean;
  setAuthUser: (user: User | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, isLoading })),
}));

export default useAuthStore;
