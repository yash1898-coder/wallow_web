import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"
import { useEffect } from "react"
import { useStore } from "../stores/useStore"

export const RequireAuth = () => {
    const { token } = useAuthStore()
    const { openToast } = useStore()

    const location = useLocation()
    const allowed = token !== null

    const notLoggedInTryingToJoinTeam = location.pathname.startsWith('/teams/join') && !token
    const notLoggedInTryingToJoinProduct = location.pathname.startsWith('/products/join') && !token

    const redirectTo = (notLoggedInTryingToJoinTeam || notLoggedInTryingToJoinProduct) ? '/signup' : '/login'

    useEffect(() => {
        if (notLoggedInTryingToJoinTeam) {
            openToast({ text: "Please, log in or sign up to access the team", error: true })
        }

        if (notLoggedInTryingToJoinProduct) {
            openToast({ text: "Please, log in or sign up to access the product", error: true })
        }
    }, [])

    const content = (
        allowed
            ? <Outlet />
            : <Navigate to={redirectTo} state={{ from: location }} replace={true} />
    )

    return content
}
