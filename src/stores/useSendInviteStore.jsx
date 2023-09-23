import { create } from 'zustand'

export const useSendInviteStore = create(
    (set) => ({
        value: '',
        setValue: (value) => set(() => ({ value }))
    })
)