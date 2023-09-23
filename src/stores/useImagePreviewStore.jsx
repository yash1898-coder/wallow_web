import { create } from "zustand"

export const useImagePreviewStore = create((set) => ({
    currentImage: "",
    onCurrentImageChange: (currentImage) => set(() => ({ currentImage })),
}))
