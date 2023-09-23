import { useRef, useState } from "react"
import { ReactComponent as Caret } from "../assets/arrow-down.svg"
import { useIsSticking } from "../hooks/useIsSticking"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export const JumpToDropdown = ({
    style,
    placeholder,
    onJumpTo,
    options,
    priority = false,
    className = "",
    insideModal = false,
    ...rest
}) => {
    const [open, setOpen] = useState(false)
    const [rootMargin, setRootMargin] = useState("0px 0px 90px 0px")
    const ref = useRef(null)
    const { pathname } = useLocation()

    useEffect(() => {
        const header1 = document.querySelector(".dashboard-team__header")
        const header2 = document.querySelector(".dashboard-header")
        const headersHeight =
            header1?.getBoundingClientRect().height +
            header2?.getBoundingClientRect().height

        if (insideModal) {
            setRootMargin("-50.4px 0px 0px 0px")
        } else if (pathname.includes("dashboard/teams") && headersHeight) {
            setRootMargin(`-${+headersHeight.toFixed(2)}px 0px 90px 0px`)
        } else {
            setRootMargin("-66px 0px 90px 0px")
        }
    }, [])

    const [isSticky] = useIsSticking(ref, {
        threshold: [1],
        rootMargin,
    })

    return (
        <div
            className={`jump-to-dropdown-wrapper ${
                insideModal ? "inside-modal" : ""
            } ${className} ${isSticky ? "sticking" : ""}`}
        >
            <div
                {...rest}
                aria-expanded={open}
                style={{
                    ...style,
                    zIndex: priority | open ? "100" : "",
                }}
                className={`jump-to-dropdown`}
                ref={ref}
                tabIndex={0}
                onBlur={(e) => {
                    if (!e.relatedTarget) {
                        setOpen(false)
                    } else if (
                        e.relatedTarget.nodeName !== "INPUT" &&
                        !e.currentTarget.contains(e.relatedTarget)
                    ) {
                        setOpen(false)
                    }
                }}
            >
                <span
                    onClick={() => {
                        setOpen((prev) => !prev)
                    }}
                    className={`jump-to-dropdown__curr-option`}
                >
                    <span
                        className="flex"
                        style={{ "--gap": ".5rem" }}
                    >
                        {placeholder}
                    </span>
                    <span className="jump-to-dropdown__caret-button">
                        <Caret
                            style={{
                                transform: open
                                    ? "rotate(180deg)"
                                    : "rotate(0)",
                            }}
                        />
                    </span>
                </span>
                <div
                    className="jump-to-dropdown__options"
                    data-visible={open}
                >
                    <p className=" fs-300 jump-to-dropdown__options-title">
                        Jump to...
                    </p>
                    <ul className="jump-to-dropdown__options-list">
                        {options.map((option, idx) => (
                            <li
                                key={idx}
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                <button
                                    onClick={() => onJumpTo(option.value)}
                                    className="jump-to-dropdown-option"
                                >
                                    {option?.icon}
                                    {option.value}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
