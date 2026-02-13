import { supabase } from "../lib/supabase";
import { create } from 'zustand';
import { type User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error; 
        if (data.user) set({ user: data.user });
    },

    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (data.user) {
            set({ user: data.user });
            console.log("Store: User set manually after login success");
        }
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null }); 
    },
    

    setUser: (user) => set({ user }),
}));
