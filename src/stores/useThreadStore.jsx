import { create } from 'zustand'
import { produce } from 'immer'
import testPerson1 from '../assets/dashboard/testPerson1.jpeg'

export const useThreadStore = create(
    (set) => ({
        messages: [
            {
                pfp: testPerson1,
                name: 'Charles',
                message: 'I am working on story id #5314124, I am complete.'
            },
            {
                pfp: testPerson1,
                name: 'Charles',
                message: 'I am working on story id #5314124, I am complete.'
            },
        ],
        feedbackItem: null,
        setFeedbackItem: (feedbackItem) => set(() => ({ feedbackItem })),
        formData: {
            message: '',
        },
        resetFormData: () => set(() => ({ formData: { message: '' } })),
        onChange: (e) => {
            const { name, value, checked, type } = e.target
            set(produce((state) => { state.formData[name] = type === 'checkbox' ? checked : value }))
        },
    })
)