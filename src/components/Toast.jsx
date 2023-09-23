import { useStore } from "../stores/useStore"
import { ReactComponent as Close } from '../assets/close.svg'
import { useEffect } from "react"

export const Toast = () => {
    const { toast, closeToast } = useStore()

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (toast.open) closeToast()
        }, 5000)

        return () => clearTimeout(timeout)
    }, [toast.open])

    return (
        <div data-visible={toast.open} className={`toast ${toast.alert ? 'alert' : ''} ${toast.error ? 'error' : ''}`}>
            <button onClick={closeToast} className="toast__close-button"><Close /></button>
            <p>{toast.text}</p>
        </div>
    )
}
