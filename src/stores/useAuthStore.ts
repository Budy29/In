import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface Auth  {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = createWithEqualityFn<Auth>((set, get) => ({
    accessToken: "",
    setAccessToken: (token) => {
        set({accessToken: token})
    },
    logout: () => {
        set({accessToken: ""})
    }
}), shallow);
