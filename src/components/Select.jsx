import { useEffect, useRef, useState } from "react"
import { ReactComponent as Caret } from "../assets/arrow-down.svg"

export const Select = ({
    icon = false,
    multiple = false,
    currOption,
    placeholder = "",
    onChange,
    options,
}) => {
    const [open, setOpen] = useState(false)
    const [highlightedIdx, setHighlightedIdx] = useState(
        options.indexOf(currOption)
    )
    const ref = useRef(null)

    const onSelect = (option) => {
        if (option.value !== currOption.value) {
            onChange(option)
            setOpen(false)
        }
    }

    useEffect(() => {
        const handler = (e) => {
            switch (e.code) {
                case "Enter":
                case "Space":
                    e.preventDefault()
                    setOpen((prev) => !prev)
                    if (open) onSelect(options[highlightedIdx])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!open) {
                        setOpen(true)
                        break
                    }
                    const newValue =
                        highlightedIdx + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        e.preventDefault()
                        setHighlightedIdx(newValue)
                    }
                    break
                }
                case "Escape":
                    setOpen(false)
                    break
            }
        }

        ref.current?.addEventListener("keydown", handler)

        return () => ref.current?.removeEventListener("keydown", handler)
    }, [open, highlightedIdx, options])

    const optionSelected = (option) => {
        return multiple
            ? currOption?.includes(option)
            : option.value === currOption.value
    }

    return (
        <div
            aria-expanded={open}
            style={{ zIndex: open ? "9" : "" }}
            className={`select ${icon ? "select--icon" : ""}`}
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
                className={`select__curr-option ${
                    currOption === undefined
                        ? "select__curr-option--placeholder"
                        : ""
                } `}
            >
                {icon && <span className="select__icon-wrapper">{icon}</span>}
                {placeholder ? (
                    placeholder
                ) : (
                    <>
                        <span
                            className="flex"
                            style={{ "--gap": ".5rem" }}
                        >
                            {currOption.icon && currOption.icon}
                            {currOption.label || currOption.value}
                        </span>
                    </>
                )}
                <span className="select__buttons">
                    <span className="select__caret-button">
                        <Caret
                            style={{
                                transform: open
                                    ? "rotate(180deg)"
                                    : "rotate(0)",
                            }}
                        />
                    </span>
                </span>
            </span>
            <div
                className="select__options"
                data-visible={open}
            >
                <ul className="select__options-list">
                    {options.map((option, idx) => (
                        <li
                            key={idx}
                            onClick={() => {
                                onSelect(option)
                                setOpen(false)
                                setHighlightedIdx(idx)
                            }}
                            className={`select-option ${
                                optionSelected(option) ? "selected" : ""
                            }
                        ${idx === highlightedIdx ? "highlighted" : ""}`}
                        >
                            <span className="select-option__title">
                                {option?.icon}
                                {option.label || option.value}
                            </span>
                            {option.subtitle && (
                                <span className="select-option__subtitle ">
                                    {option.subtitle}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
