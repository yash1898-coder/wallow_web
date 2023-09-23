import { Navigate, useLocation } from "react-router-dom"
import { useEditProductStore } from "../stores/useEditProductStore"

export const RequireProduct = ({ outlet }) => {
    const { editingProduct } = useEditProductStore()
    const { pathname } = useLocation()

    const allowed = editingProduct || pathname === '/dashboard' || pathname === '/dashboard/'

    const content = (
        allowed
            ? outlet
            : <Navigate to={'/dashboard'} replace={true} />
    )

    return content
}
