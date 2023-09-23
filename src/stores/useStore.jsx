import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useStore = create(
    persist(
        (set, get) => ({
            modals: {
                thread: false,
                createProduct: false,
                addPeople: false,
                deactivateUser: false,
                changeAccountType: false,
                editProfile: false,
                sendInviteProduct: false,
                sendInviteProductArea: false,
                sendInviteTeam: false,
                inviteMobile: false,
                createTeam: false,
                editTeam: false,
                members: false,
                deletionConfirmation: false,
                addTeams: false,
                imagePreview: false,
                createProductArea: false,
                editProductArea: false,
                uploadProductImage: false,
                uploadProfileImage: false,
                teams: false,
                editProduct: false,
                deleteProduct: false,
            },
            closeAllModals: () => {
                const target = Object.keys(get().modals).find(
                    (v) => get().modals[v]
                )
                if (target)
                    set((state) => ({
                        modals: { ...state.modals, [target]: false },
                    }))
            },
            animatedImpactCard: undefined,
            setAnimatedImpactCard: (animatedImpactCard) =>
                set(() => ({ animatedImpactCard })),
            cookieNotice: true,
            closeCookieNotice: () => set(() => ({ cookieNotice: false })),
            plan: 29.95,
            setPlanCost: (plan) => set(() => ({ plan })),
            toast: { open: false, text: "", error: false },
            openToast: ({ text, error = false, alert = false }) =>
                set(() => ({
                    toast: {
                        open: true,
                        text,
                        error,
                        alert,
                    },
                })),
            closeToast: () =>
                set((state) => ({ toast: { ...state.toast, open: false } })),
            openModal: (modal) => {
                set((state) => ({ modals: { ...state.modals, [modal]: true } }))
            },
            closeModal: (modal) => {
                set((state) => ({
                    modals: { ...state.modals, [modal]: false },
                }))
            },
        }),
        {
            name: "store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(
                        ([key]) => !["modals", "toast"].includes(key)
                    )
                ),
        }
    )
)
