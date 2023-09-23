import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useStore } from "../stores/useStore"
import { useEditProductStore } from "../stores/useEditProductStore"

export const RequireProductRoles = ({ outlet = <Outlet />, allowedRoles }) => {
    const location = useLocation()
    const { openToast } = useStore()
    const { editingProduct } = useEditProductStore()

    const allowed = allowedRoles.some(role => role === editingProduct.role)

    useEffect(() => {
        if (!allowed) {
            openToast({ text: 'You do not have permission to enter this page', error: true })
        }
    }, [allowed])

    const content = (
        allowed
            ? outlet
            : <Navigate to="/dashboard/progress" state={{ from: location }} replace={true} />
    )

    return content
}
