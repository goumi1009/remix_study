import { create } from 'zustand';

type AuthStoreState = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthStoreActions = {
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuth = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken });
  },
  clearTokens: () => {
    set({ accessToken: null, refreshToken: null });
  },
}));
