import { create } from 'zustand'
import { produce } from 'immer'

export const useEditProductAreaStore = create(
    (set) => ({
        editingProductArea: {
            name: '',
            description: ''
        },
        setEditingProductArea: (editingProductArea) => set(() => ({ editingProductArea })),
        onChange: (e) => {
            const { name, value, checked, type } = e.target
            set(produce((state) => { state.editingProductArea[name] = type === 'checkbox' ? checked : value }))
        },
    })
)