import { nav } from "../../layout/Header"
import { Dropdown } from "./Dropdown"
import { Link } from "react-router-dom"

export const MobileNav = ({ open, onNavLinkClick }) => {
    return (
        <nav
            className="mobile-nav"
            data-visible={open}
        >
            <ul className="mobile-nav__list">
                {nav.map((item, idx) =>
                    item.dropdown ? (
                        <Dropdown
                            onNavLinkClick={onNavLinkClick}
                            key={idx}
                            item={item}
                        />
                    ) : (
                        <li
                            key={idx}
                            className="mobile-nav__item"
                        >
                            <Link
                                onClick={() => onNavLinkClick()}
                                className="mobile-nav__link"
                                to={item.href}
                            >
                                {item.title}
                            </Link>
                        </li>
                    )
                )}
            </ul>
            <div className="flow">
                <Link
                    onClick={onNavLinkClick}
                    className="button mobile-nav__button"
                    to={"/signup"}
                >
                    Get Wallow Free
                </Link>
                <Link
                    onClick={onNavLinkClick}
                    className="button button--inverted mobile-nav__button"
                    to={"/login"}
                >
                    Log in
                </Link>
            </div>
        </nav>
    )
}
