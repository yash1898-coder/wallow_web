import { useState } from "react"
import { Pfp } from "../Pfp"
import { useStore } from "../../stores/useStore"
import { HeaderMenuItem } from "./HeaderMenuItem"
import { HeaderMenuDropdownItem } from "./HeaderMenuDropdownItem"
import { useAuthStore } from "../../stores/useAuthStore"
import { useMutation, useQueryClient } from "react-query"
import { logout } from "../../api/accounts"
import { useNavigate } from "react-router-dom"
import { useOrganization } from "../../hooks/useOrganization"

export const HeaderMenu = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { openModal } = useStore()
    const { user, setUser, setToken } = useAuthStore()
    const queryClient = useQueryClient()

    const { organization } = useOrganization()

    const { mutate: onLogout } = useMutation(() => logout(), {
        onSuccess: () => {
            queryClient.invalidateQueries(["accounts"])
            navigate("/login")
            setToken(null)
            setUser(null)
        },
    })

    const getDropdownItems = () => {
        let dropdown = []
        if (user.role.includes("Owner")) {
            dropdown = [
                {
                    items: [
                        {
                            title: "Invite team",
                            button: true,
                            onClick: () => openModal("sendInviteOrganization"),
                        },
                        {
                            title: "Billing",
                            dropdown: true,
                            items: [
                                {
                                    title: "Overview",
                                    href: "/billing/overview",
                                },
                                {
                                    title: "Invoices",
                                    href: "/billing/invoices",
                                },
                                // {
                                //     title: "Payment method",
                                //     href: "/billing/payment-methods",
                                // },
                                {
                                    title: "Billing history",
                                    href: "/billing/history",
                                },
                                {
                                    title: "User limits",
                                    href: "/billing/user-limits",
                                },
                                {
                                    title: "Preferences",
                                    href: "/billing/preferences",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "Organization",
                    items: [
                        {
                            title: organization?.profile_image ? (
                                <img
                                    className="organization-logo"
                                    src={organization?.profile_image}
                                    alt={organization?.name}
                                />
                            ) : (
                                organization?.name || user.first_name
                            ),
                            text: true,
                        },
                        { title: "Settings", href: "/organization/settings" },
                        { title: "Members", href: "/organization/members" },
                        {
                            title: "Edit your profile",
                            onClick: () => openModal("editProfile"),
                            button: true,
                        },
                    ],
                },
                {
                    items: [
                        {
                            title: "Logout",
                            onClick: () => onLogout(),
                            button: true,
                        },
                    ],
                },
            ]
        } else {
            return [
                {
                    title: "Organization",
                    items: [
                        {
                            title: organization?.profile_image ? (
                                <img
                                    className="organization-logo"
                                    src={organization?.profile_image}
                                    alt={organization?.name}
                                />
                            ) : (
                                organization?.name || user.first_name
                            ),
                            text: true,
                        },
                        {
                            title: "Edit your profile",
                            onClick: () => openModal("editProfile"),
                            button: true,
                        },
                    ],
                },
                {
                    items: [
                        {
                            title: "Logout",
                            onClick: () => onLogout(),
                            button: true,
                        },
                    ],
                },
            ]
        }
        return dropdown
    }

    const onItemClick = () => setOpen(false)

    return (
        <div
            tabIndex={0}
            onBlur={(e) => {
                if (
                    !e.relatedTarget ||
                    !e.currentTarget.contains(e.relatedTarget)
                ) {
                    setOpen(false)
                }
            }}
            className="header-menu"
        >
            <button
                aria-expanded={open}
                onClick={() => setOpen((open) => !open)}
                className="header-menu__toggle fw-500 fs-500"
            >
                <Pfp
                    img={user.profile_image}
                    name={user.first_name}
                />
            </button>
            <div
                className="header-menu__content"
                data-visible={open}
            >
                <div className="flex">
                    <button
                        className="pfp-button"
                        onClick={() => openModal("uploadProfileImage")}
                    >
                        <Pfp
                            img={user.profile_image}
                            name={user.first_name}
                        />
                    </button>
                    <h4 className="header-menu__pfp-name">
                        {user.first_name} {user.last_name}
                    </h4>
                </div>
                {getDropdownItems().map((list, idx) => (
                    <div
                        className="header-menu__group"
                        key={idx}
                    >
                        {list.title && (
                            <h5 className=" header-menu__group-title">
                                {list.title}
                            </h5>
                        )}
                        <ul className="header-menu__list">
                            {list.items.map((item, idx) =>
                                item.dropdown ? (
                                    <HeaderMenuDropdownItem
                                        key={idx}
                                        {...item}
                                        onItemClick={onItemClick}
                                    />
                                ) : (
                                    <HeaderMenuItem
                                        onItemClick={onItemClick}
                                        key={idx}
                                        item={item}
                                        idx={idx}
                                    />
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
