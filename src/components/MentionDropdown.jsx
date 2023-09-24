import { useEffect, useRef, useState } from "react"
import { useEditProductStore } from "../stores/useEditProductStore"
import { getProductMembers } from "../api/products"
import { useQuery } from "react-query"
import { useSearch } from "../hooks/useSearch"

export const MentionDropdown = ({
    open,
    setOpen,
    onChange,
    query,
    focused,
    textareaRef,
    position,
    chatMeassge
}) => {
    const search = useSearch(query, ["Full Name"])

    const { editingProduct } = useEditProductStore()
    const { isLoading, data: members } = useQuery(
        ["products", "members", editingProduct?.id],
        () => getProductMembers(editingProduct?.id),
        {
            retry: false,
        }
    )

    const options = members ?? []

    const [highlightedIdx, setHighlightedIdx] = useState(0)
    const ref = useRef(null)

    const onSelect = (option) => {
        onChange(option)
        setOpen(false)
        textareaRef.current.focus()
    }

    useEffect(() => {
        if (search(options).length < 1) {
            setOpen(false)
        }
    }, [options, search])

    useEffect(() => {
        if (focused && open) {
            ref.current.focus()
            if (focused === "ArrowDown") {
                setHighlightedIdx((prev) => prev + 1)
            } else if (focused === "ArrowUp") {
                setHighlightedIdx((prev) => prev - 1)
            }
        }
        if (focused === "Enter" && open) {
            ref.current.focus()
            onSelect(search(options)[highlightedIdx]["Full Name"].split(" ")[0])
        }
    }, [focused, open])

    useEffect(() => {
        if (search(options).length === 1) {
            setHighlightedIdx(0)
        }
    }, [options, search])

    useEffect(() => {
        const container = ref.current
        const handler = (e) => {
            switch (e.code) {
                case "Enter":
                case "Space":
                    e.preventDefault()
                    setOpen((prev) => !prev)
                    if (open) {
                        onSelect(
                            search(options)[highlightedIdx]["Full Name"].split(
                                " "
                            )[0]
                        )
                    }
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!open) {
                        setOpen(true)
                        break
                    }
                    const newValue =
                        highlightedIdx + (e.code === "ArrowDown" ? 1 : -1)

                    if (newValue >= 0 && newValue < search(options).length) {
                        e.preventDefault()
                        setHighlightedIdx(newValue)
                    } else if (newValue === search(options).length) {
                        e.preventDefault()
                        setHighlightedIdx(0)
                    } else if (e.code === "ArrowUp" && highlightedIdx === 0) {
                        setHighlightedIdx(search(options).length - 1)
                    }
                    break
                }
                case "Escape":
                    setOpen(false)
                    break
            }
        }

        container?.addEventListener("keydown", handler)

        return () => {
            container?.removeEventListener("keydown", handler)
        }
    }, [open, highlightedIdx, options, search])

    return (
        <ul
            ref={ref}
            tabIndex={0}
            onBlur={(e) => {
                if (
                    !e.relatedTarget ||
                    !e.currentTarget.contains(e.relatedTarget)
                ) {
                    setOpen(false)
                }
            }}
            style={{
                zIndex: open ? "9" : "",
                bottom: position === "bottom" ? "auto" : "",
                top: position === "bottom" ? "100%" : "",
            }}
            id="mention-popover"
            data-visible={open}
            className="mention-dropdown"
        >
            {search(options).map((option, idx) => (
                <li
                    key={idx}
                    onClick={() => {
                        onSelect(option["Full Name"].split(" ")[0])
                        setOpen(false)
                        setHighlightedIdx(idx)
                    }}
                    className={`select-option
                        ${idx === highlightedIdx ? "highlighted" : ""}
                        `}
                >
                    {option["Full Name"]}
                </li>
            ))}
        </ul>
    )
}
