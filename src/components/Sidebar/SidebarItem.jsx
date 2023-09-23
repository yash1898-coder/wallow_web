import { Link, useLocation } from "react-router-dom"

export const SidebarItem = ({
    button,
    title,
    icon,
    onClick,
    href,
    onItemClick,
}) => {
    const { pathname } = useLocation()

    return (
        <li className="sidebar__item">
            {button ? (
                <button
                    onClick={onClick}
                    className={`sidebar__link`}
                >
                    {icon && (
                        <img
                            className="sidebar__icon"
                            src={icon}
                            alt={title}
                        />
                    )}
                    {title}
                </button>
            ) : (
                <Link
                    onClick={onItemClick}
                    aria-current={pathname === href ? "page" : ""}
                    className={`sidebar__link`}
                    to={href}
                >
                    {icon && (
                        <img
                            className={"sidebar__icon sidebar__icon--link"}
                            src={icon}
                            alt={title}
                        />
                    )}
                    {title}
                </Link>
            )}
        </li>
    )
}
