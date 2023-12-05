import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../constants/consta";

type WaterStore = {
    accsesToken: string | null;
    handleLogin: (username: string, password: string) => Promise<void>
    handleSignup: (username: string, password: string, email: string, nama: string, confirm_password: string) => Promise<void>;
}

export const useWaterStore: WaterStore = {
    accsesToken: "",
    handleLogin: async
};
