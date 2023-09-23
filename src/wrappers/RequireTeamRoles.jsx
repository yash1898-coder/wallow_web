import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useStore } from "../stores/useStore"
import { useEditTeamStore } from "../stores/useEditTeamStore"

export const RequireTeamRoles = ({ outlet = <Outlet />, allowedRoles }) => {
    const location = useLocation()
    const { openToast } = useStore()
    const { editingTeam } = useEditTeamStore()

    const allowed = allowedRoles.some(role => role === editingTeam.role)

    useEffect(() => {
        if (!allowed) {
            openToast({ text: 'You do not have permission to enter this page', error: true })
        }
    }, [allowed])

    const content = (
        allowedRoles.some(role => role === editingTeam.role)
            ? outlet
            : <Navigate to="/dashboard/progress" state={{ from: location }} replace={true} />
    )

    return content
}
