import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TeamFunctionIcon } from "../TeamFunctionIcon"
import { Link, useLocation } from "react-router-dom"
import { Spinner } from "../Spinner"
import { ErrorMessage } from "../ErrorMessage"

export const DropdownItem = ({
    error,
    isLoading,
    title,
    icon,
    items,
    onItemClick,
}) => {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    return (
        <li className="sidebar__item sidebar__item--dropdown">
            <button
                aria-expanded={open}
                onClick={() => setOpen((open) => !open)}
                className={`sidebar__link`}
            >
                <img
                    style={{ rotate: open ? "0deg" : "-90deg" }}
                    className="sidebar__icon"
                    src={icon}
                    alt=""
                />
                {title}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        style={{ overflow: "hidden" }}
                        initial={{ height: "0" }}
                        animate={{ height: "auto" }}
                        exit={{ height: "0" }}
                        className="sidebar__list sidebar__list--dropdown"
                    >
                        {error ? (
                            <ErrorMessage message={error.message} />
                        ) : isLoading ? (
                            <Spinner size="20px" />
                        ) : items.length === 0 ? (
                            <li className={`sidebar__item `}>
                                {title === "Teams"
                                    ? "No teams yet."
                                    : title === "Product areas"
                                    ? "No product areas yet."
                                    : "Nothing here."}
                            </li>
                        ) : (
                            items.map((item, idx) => (
                                <li
                                    key={idx}
                                    className={`sidebar__item`}
                                >
                                    <Link
                                        to={item.href}
                                        onClick={onItemClick}
                                        className={`sidebar__link`}
                                        aria-current={
                                            pathname === item.href ? "page" : ""
                                        }
                                    >
                                        {item.bgIcon ? (
                                            <TeamFunctionIcon
                                                color={item?.color}
                                                team={
                                                    item.function ??
                                                    "Engineering"
                                                }
                                            />
                                        ) : (
                                            item.icon
                                        )}
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    )
}
