import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"
import { useEffect } from "react"
import { useStore } from "../stores/useStore"

export const RequireRoles = ({ outlet = <Outlet />, allowedRoles }) => {
    const location = useLocation()
    const { openToast } = useStore()
    const { user } = useAuthStore()

    const allowed = allowedRoles.some((role) => role === user.role)

    useEffect(() => {
        if (!allowed) {
            openToast({
                text: "You do not have permission to enter this page",
                error: true,
            })
        }
    }, [allowed])

    const content = allowedRoles.some((role) => role === user.role) ? (
        outlet
    ) : (
        <Navigate
            to="/dashboard/progress"
            state={{ from: location }}
            replace={true}
        />
    )

    return content
}
