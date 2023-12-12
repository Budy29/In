import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../constants/consta";

type WaterStore = {
    Token: string | null;
    isLoading: boolean;
    handleLogin: (username: string, password: string) => Promise<void>;
    handleSignup: (
        username: string,
        password: string,
        email: string,
        nama: string,
        confirm_password: string
    ) => Promise<void>;
    userProfile: any[];
    getUserProfile: () => Promise<void>;
    dataKategori: any[];
    getDataKategori: (q: string) => Promise<void>;
    logout: () => void;
};

export const useWaterStore = create<WaterStore>((set, get) => ({
    Token: "",
    isLoading: false,
    userProfile: [],
    handleLogin: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
            const response = await axios.post("https://api-inventory.drabsky.com/login", {
                email, password,
            });
            set({ isLoading: false })
            set({ Token: response.data.token });
            console.log(response)
            set({ userProfile: response.data })
        } catch (error) {
            set({ isLoading: false })
            console.error(error);
        }
    },
    handleSignup: async (
        username,
        password,
        email,
        nama,
        confirm_password
    ) => {
        try {
            const res = await axios.post(API_URL + 'register', {
                username,
                password,
                email,
                nama,
                confirm_password
            })

        } catch (error) {
            // Handle signup error
            console.error("Signup failed:", error);
        }
    },
    userProfile: [],
    getUserProfile: async (id: string) => {
        try {
            const res = await axios.get('https://api-inventory.drabsky.com/users/${id}', {
                headers: {
                    Authorization: `Bearer ${get().Token}`
                }
            })
            console.log(res.data.messages)
            set({ userProfile: res.data.messages.data })
            set({ isLoading: false })
        } catch (error) {
            console.log(error)
            set({ isLoading: true })
        }
    },
    dataKategori: [],
    getDataKategori: async (q) => {
        try {
            // Implement logic to fetch data categories based on 'q'
        } catch (error) {
            // Handle error while fetching data categories
            console.error("Failed to fetch data categories:", error);
        }
    },
    logout: () => {
        // Implement logout logic, maybe clearing tokens or resetting state
        set({ accessToken: null });
    },
}));