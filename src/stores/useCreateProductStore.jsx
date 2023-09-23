import { create } from 'zustand'
import { produce } from 'immer'

export const useCreateProductStore = create(
    (set) => ({
        formData: {
            name: '',
            description: ''
        },
        onChange: (e) => {
            const { name, value, checked, type } = e.target
            set(produce((state) => { state.formData[name] = type === 'checkbox' ? checked : value }))
        },
        resetFormData: () => set(() => ({
            formData: {
                name: '',
                description: ''
            }
        }))
    })
)