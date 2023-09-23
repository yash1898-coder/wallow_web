import { Link } from "react-router-dom"

export const HeaderMenuItem = ({ item, idx, onItemClick }) => {
    const dropdownLink = (item, idx) => {
        if (item.text) {
            return (
                <li
                    key={idx}
                    className={`header-menu__item`}
                >
                    <div className={`header-menu__text fw-600`}>
                        {item.title}
                    </div>
                </li>
            )
        } else if (item.button) {
            return (
                <li
                    key={idx}
                    className={`header-menu__item`}
                >
                    <button
                        className={`header-menu__link`}
                        onClick={() => {
                            onItemClick()
                            item.onClick()
                        }}
                    >
                        {item.title}
                    </button>
                </li>
            )
        } else {
            return (
                <li
                    key={idx}
                    className={`header-menu__item`}
                >
                    <Link
                        onClick={() => {
                            onItemClick()
                        }}
                        to={item.href}
                        className={`header-menu__link`}
                    >
                        {item.title}
                    </Link>
                </li>
            )
        }
    }

    return dropdownLink(item, idx)
}
