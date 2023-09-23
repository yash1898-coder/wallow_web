import { create } from 'zustand'
import { produce } from 'immer'
import { useAuthStore } from './useAuthStore'

export const useEditProfileStore = create(
    (set) => ({
        editingUser: useAuthStore.getState().user,
        setEditingUser: (editingUser) => set(() => ({ editingUser })),
        onChange: (e) => {
            const { name, value, checked, type } = e.target
            set(produce((state) => { state.editingUser[name] = type === 'checkbox' ? checked : value }))
        },
    })
)