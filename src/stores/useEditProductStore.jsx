import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useEditProductStore = create(persist((set) => ({
    editingProduct: undefined,
    setEditingProduct: (editingProduct) => set(() => ({ editingProduct })),
}),
    {
        name: 'product',
        storage: createJSONStorage(() => localStorage)
    }
))