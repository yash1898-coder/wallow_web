import { useState } from "react"
import { ReactComponent as Caret } from "../../assets/caret.svg"
import { Link } from "react-router-dom"

export const Dropdown = ({ item }) => {
    const [open, setOpen] = useState(false)
    const onLinkClick = () => setOpen(false)

    return (
        <li
            className="desktop-nav__item"
            onMouseLeave={() => setOpen(false)}
        >
            <button
                onMouseEnter={() => setOpen(true)}
                className="desktop-nav__dropdown-toggle"
                aria-expanded={open}
            >
                {item.title}
                <Caret style={{ rotate: open ? "180deg" : "" }} />
            </button>
            <div
                className="desktop-nav-dropdown"
                data-visible={open}
            >
                {item.dropdownLists.map((dropdownList, idx) => (
                    <ul
                        className="desktop-nav-dropdown__list"
                        key={idx}
                    >
                        {dropdownList.title && (
                            <h4 className="desktop-nav-dropdown__list-title">
                                {dropdownList.title}
                            </h4>
                        )}
                        {dropdownList.items.map((dropdownItem, idx) => (
                            <li
                                className="desktop-nav-dropdown__item"
                                key={idx}
                            >
                                <Link
                                    onClick={onLinkClick}
                                    className="desktop-nav-dropdown__link"
                                    to={dropdownItem.href}
                                >
                                    {dropdownItem.icon &&
                                    typeof dropdownItem.icon === "string" ? (
                                        <img
                                            className="desktop-nav-dropdown__item-icon"
                                            src={dropdownItem.icon}
                                            alt={`${dropdownItem.title} icon`}
                                        />
                                    ) : (
                                        dropdownItem.icon
                                    )}
                                    {dropdownItem.img && (
                                        <img
                                            className="desktop-nav-dropdown__item-img"
                                            src={dropdownItem.img}
                                            alt={`${dropdownItem.title} icon`}
                                        />
                                    )}
                                    <div>
                                        <h4 className="desktop-nav-dropdown__item-title">
                                            {dropdownItem.title}
                                        </h4>
                                        {dropdownItem.subtitle && (
                                            <p className="desktop-nav-dropdown__item-subtitle">
                                                {dropdownItem.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </li>
    )
}
