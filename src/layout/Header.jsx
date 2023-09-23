import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"
import { MobileNav } from "../components/MobileNav/MobileNav"
import products from "../assets/sidebar/Product.png"
import progress from "../assets/sidebar/Progress.png"
import blockers from "../assets/sidebar/Blocker.png"
import impediments from "../assets/sidebar/Impediment.png"
import insights from "../assets/sidebar/insights.png"
import retrospective from "../assets/sidebar/Retrospective.png"
import sentiment from "../assets/sidebar/Sentiment.png"
import { DesktopNav } from "../components/DesktopNav/DesktopNav"

export const nav = [
    {
        title: "Product",
        dropdown: true,
        dropdownLists: [
            {
                items: [
                    {
                        title: "Products",
                        icon: products,
                        href: "/features/products",
                        subtitle: "Centralize your knowledge",
                    },
                    {
                        title: "Progress",
                        icon: progress,
                        href: "/features/progress",
                        subtitle: "Centralize your knowledge",
                    },
                    {
                        title: "Blockers",
                        icon: blockers,
                        href: "/features/blockers",
                        subtitle: "Centralize your knowledge",
                    },
                ],
            },
            {
                items: [
                    {
                        title: "Impediments",
                        icon: impediments,
                        href: "/features/impediments",
                        subtitle: "Centralize your knowledge",
                    },
                    {
                        title: "Insights",
                        icon: insights,
                        href: "/features/insights",
                        subtitle: "Centralize your knowledge",
                    },
                    {
                        title: "Retrospective",
                        icon: retrospective,
                        href: "/features/retrospective",
                        subtitle: "Centralize your knowledge",
                    },
                ],
            },
            {
                items: [
                    {
                        title: "Sentiment",
                        icon: sentiment,
                        href: "/features/sentiment",
                        subtitle: "Centralize your knowledge",
                    },
                ],
            },
        ],
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Request a demo",
        href: "https://calendly.com/d/2pm-dd9-xtr/wallow-intro",
    },
]

export const Header = () => {
    const { pathname } = useLocation()
    const [navOpen, setNavOpen] = useState(false)
    useEffect(() => {
        if (navOpen === false) {
            document.body.style.overflow = "auto"
        } else {
            document.body.style.overflow = "hidden"
        }
    }, [navOpen])

    const isOnAuthPage =
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/verify-email") ||
        pathname.startsWith("/change-password") ||
        pathname.startsWith("/reset-password") ||
        pathname.includes("/join")

    const isOnDashboard = pathname.startsWith("/dashboard")

    const onNavLinkClick = () => setNavOpen(false)

    return (
        <header className="header">
            <Link
                to="/"
                className="flex fw-600 header__logo logo"
                style={{ "--gap": "0" }}
            >
                <img
                    className="header__logo"
                    src={logo}
                    alt="Wallow logo"
                />
            </Link>
            {!isOnAuthPage && !isOnDashboard && (
                <button
                    className={`nav-toggle`}
                    aria-expanded={navOpen ? "true" : "false"}
                    onClick={() => {
                        setNavOpen((prev) => !prev)
                    }}
                ></button>
            )}

            {!isOnAuthPage && !isOnDashboard && (
                <>
                    <MobileNav
                        onNavLinkClick={onNavLinkClick}
                        open={navOpen}
                    />
                    <DesktopNav />
                </>
            )}
        </header>
    )
}
