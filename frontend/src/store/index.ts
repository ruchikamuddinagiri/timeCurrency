import create from 'zustand';
import { IUser } from '../api/types';

type AuthStore = {
  authUser: IUser | null;
  isLoading: boolean;
  setAuthUser: (user: IUser | null) => void;
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
