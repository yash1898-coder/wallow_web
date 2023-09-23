import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { HeaderMenu } from "../components/HeaderMenu/HeaderMenu"
import { useAuthStore } from "../stores/useAuthStore"
import { NotificationsPopup } from "../components/NotificationsPopup/NotificationsPopup"
import { useOrganization } from "../hooks/useOrganization"

export const OrganizationHeader = () => {
    const { user } = useAuthStore()
    const { organization } = useOrganization()

    return (
        <header
            className="dashboard-header"
            style={{
                paddingLeft: "0.5rem",
            }}
        >
            <Link
                to="/dashboard"
                className="flex fw-600 header__logo logo"
                style={{ "--gap": "0" }}
            >
                <img
                    className="header__logo"
                    src={logo}
                    alt="Wallow logo"
                />
            </Link>

            <div className="flex right-side dashboard-header__right-side">
                <NotificationsPopup />
                <div className="dashboard-header__product">
                    {organization?.profile_image ? (
                        <img
                            className="organization-logo"
                            src={organization?.profile_image}
                            alt={organization?.name}
                        />
                    ) : (
                        organization?.name || user.first_name
                    )}
                </div>
                <HeaderMenu />
            </div>
        </header>
    )
}
