import { forwardRef, useState } from "react"
import { useSearch } from "../hooks/useSearch"
import { Pfp } from "./Pfp"

/* eslint-disable react/display-name */
export const SearchDropdown = forwardRef(
    (
        {
            name,
            options,
            onChange,
            searchParams,
            placeholder,
            invalid,
            makeValid,
        },
        ref
    ) => {
        const [q, setQ] = useState("")
        const search = useSearch(q, searchParams)
        const [open, setOpen] = useState(false)

        return (
            <div
                aria-expanded={open}
                onClick={() => {
                    setOpen((prev) => !prev)
                }}
                style={{ zIndex: open ? "9" : "" }}
                className={`search-dropdown`}
                tabIndex={0}
                onBlur={(e) => {
                    if (!e.relatedTarget) {
                        setOpen(false)
                    } else if (
                        e.relatedTarget !== ref.current &&
                        !e.currentTarget.contains(e.relatedTarget)
                    ) {
                        setOpen(false)
                    }
                }}
            >
                <form className={"search-dropdown__input-wrapper"}>
                    <input
                        id={name}
                        name={name}
                        ref={ref}
                        required
                        value={q}
                        onChange={(e) => {
                            setOpen(true)
                            setQ(e.target.value)
                            makeValid()
                            onChange(undefined)
                        }}
                        className={`input search-dropdown__input ${
                            invalid ? "invalid" : ""
                        }`}
                        autoComplete="new-password"
                        type="text"
                        placeholder={placeholder}
                    />
                </form>
                <div
                    className="search-dropdown__options"
                    data-visible={open}
                >
                    {search(options).length === 0 ? (
                        <p className="search-dropdown__not-found">
                            Nothing found.
                        </p>
                    ) : (
                        <ul
                            className="search__options"
                            data-visible={open}
                        >
                            {search(options).length > 0 &&
                                search(options).map((option, idx) => (
                                    <li key={idx}>
                                        <button
                                            className={`button-reset search-dropdown__option`}
                                            onClick={() => {
                                                onChange(option)
                                                setQ(option["Full Name"])
                                                makeValid()
                                            }}
                                        >
                                            <Pfp
                                                img={option.profile_image}
                                                name={option["Full Name"]}
                                                size="25px"
                                                fontSize="1rem"
                                            />
                                            {option["Full Name"]}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
)
