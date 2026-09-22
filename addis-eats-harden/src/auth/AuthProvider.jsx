import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  loading: false,

  signIn: async (credentials) => {
    set({ loading: true });

    await new Promise((resolve) => setTimeout(resolve, 400));

    set({
      user: {
        name: credentials.email.split("@")[0],
        email: credentials.email
      },
      loading: false
    });
  },

  signOut: () => set({ user: null })
}));