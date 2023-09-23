import { nav } from "../../layout/Header"
import { Dropdown } from "./Dropdown"
import { Link } from "react-router-dom"

export const DesktopNav = () => {
    return (
        <nav className="desktop-nav">
            <ul className="desktop-nav__list">
                {nav.map((item, idx) =>
                    item.dropdown ? (
                        <Dropdown
                            key={idx}
                            item={item}
                        />
                    ) : item.title !== "Request a demo" ? (
                        <li
                            key={idx}
                            className="desktop-nav__item"
                        >
                            <Link
                                className="desktop-nav__link"
                                to={item.href}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ) : (
                        ""
                    )
                )}
            </ul>
            <div className="flex">
                <Link
                    className="desktop-nav__link desktop-nav__button"
                    target="_blank"
                    to={"https://calendly.com/d/2pm-dd9-xtr/wallow-intro"}
                >
                    Request a demo
                </Link>
                <span className="desktop-nav__button-wrapper">
                    <Link
                        className="desktop-nav__link desktop-nav__button"
                        to={"/login"}
                    >
                        Log in
                    </Link>
                </span>
                <Link
                    className="button desktop-nav__button"
                    to={"/signup"}
                >
                    Get Wallow Free
                </Link>
            </div>
        </nav>
    )
}
