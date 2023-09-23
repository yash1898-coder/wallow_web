import { Outlet, useLocation } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Toast } from "../components/Toast"
import { CookieNotice } from "../components/CookieNotice"

export const Layout = () => {
    const { pathname } = useLocation()
    const isOnAuthPage =
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/verify-email") ||
        pathname.startsWith("/change-password") ||
        pathname.startsWith("/reset-password") ||
        pathname.includes("/join")

    return (
        <>
            <Header />
            <div className="main-wrapper">
                <main>
                    <CookieNotice />
                    <Toast />
                    <Outlet />
                </main>
            </div>
            {!isOnAuthPage && <Footer />}
        </>
    )
}
