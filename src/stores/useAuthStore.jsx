import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set(() => ({ token })),
            user: null,
            setUser: (user) => set(() => ({ user })),
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
