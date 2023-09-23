import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { Select } from "../components/Select"
import { useState } from "react"
import { Pfp } from "../components/Pfp"
import { HeaderMenu } from "../components/HeaderMenu/HeaderMenu"
import { useQuery, useQueryClient } from "react-query"
import { getProducts } from "../api/products"
import { useEditProductStore } from "../stores/useEditProductStore"
import { useAuthStore } from "../stores/useAuthStore"
import { NotificationsPopup } from "../components/NotificationsPopup/NotificationsPopup"
import { useOrganization } from "../hooks/useOrganization"
import sidebarClosed from "../assets/sidebar/ico_sidebar_off.png"
import { Tooltip } from "../components/Tooltip"

export const DashboardHeader = ({ setSidebarOpen, sidebarOpen }) => {
    const { user } = useAuthStore()
    const { editingProduct, setEditingProduct } = useEditProductStore()
    const [products, setProducts] = useState([])

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { organization } = useOrganization()

    useQuery(["products"], getProducts, {
        retry: false,
        onSuccess: (products) => {
            setProducts(
                products.map((p) => ({
                    ...p,
                    value: p.name,
                    icon: (
                        <Pfp
                            name={p.name}
                            img={p.image}
                            size={"20px"}
                            fontSize={"1rem"}
                        />
                    ),
                }))
            )
        },
    })

    const { pathname } = useLocation()

    const isOnWelcomePage =
        pathname === "/dashboard/" || pathname === "/dashboard"

    const onProductChange = (o) => {
        setEditingProduct({
            ...o,
            value: o.name,
            icon: (
                <Pfp
                    name={o.name}
                    img={o.profile_image}
                />
            ),
        })
        queryClient.invalidateQueries(["progressSummary", editingProduct.id])
        queryClient.invalidateQueries(["blockers", editingProduct.id])
        queryClient.invalidateQueries(["productAreas", editingProduct.id])
        queryClient.invalidateQueries(["teams", editingProduct.id])
        navigate("/dashboard/progress")
    }

    return (
        <header
            className="dashboard-header"
            style={{
                paddingLeft: isOnWelcomePage ? "0.5rem" : "",
            }}
        >
            {isOnWelcomePage && (
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
            )}
            {!isOnWelcomePage && (
                <div className="flex">
                    {!sidebarOpen && (
                        <Tooltip
                            text={"Open sidebar"}
                            position={"right"}
                        >
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="icon-button"
                                style={{ height: 40 }}
                            >
                                <img
                                    src={sidebarClosed}
                                    alt="sidebar"
                                />
                            </button>
                        </Tooltip>
                    )}
                </div>
            )}

            <div className="flex right-side dashboard-header__right-side">
                <NotificationsPopup />
                {!isOnWelcomePage && (
                    <Select
                        placeholder="Switch productspace"
                        currOption={editingProduct}
                        options={products}
                        onChange={(o) => onProductChange(o)}
                    />
                )}
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
