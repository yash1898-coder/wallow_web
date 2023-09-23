import { useEffect, useState } from "react"

export const usePopover = ({ prevCharRef, onSubmit, value, resetFormData=()=>{} }) => {
    const [popoverVisible, setPopoverVisible] = useState(false)
    const [popoverQuery, setPopoverQuery] = useState("")
    const [popoverFocused, setPopoverFocused] = useState("")

    const showPopover = (e) => {
        if (e.key === "Escape" || e.key === "Backspace") {
            setPopoverVisible(false)
            return
        }
        const { value } = e.target
        const match = value.match(/@([^ ]*)$/)
        if (match) {
            setPopoverQuery(match[1])
        }
        if (
            (prevCharRef.current === " " && value.endsWith("@")) ||
            value === "@"
        ) {
            setPopoverVisible(true)
        } else {
            if (!match) setPopoverVisible(false)
        }
        prevCharRef.current = value[value.length - 1]
    }
    const onKeyDown = (e) => {
        if (e.key === "Enter" && value.trim().length > 0 && !popoverVisible) {
            e.preventDefault()
            onSubmit();
            resetFormData();
        }

        if (e.key === "Enter") {
            e.preventDefault()
            setPopoverFocused(e.key)
        } else {
            setPopoverFocused("")
        }
    }

    const onKeyUp = (e) => {
        showPopover(e)
        if (e.code === "ArrowUp" || e.code === "ArrowDown") {
            setPopoverFocused(e.key)
        } else {
            setPopoverFocused("")
        }
    }

    useEffect(() => {
        const closeOnEsc = (e) => {
            if (e.key === "Escape") {
                setPopoverVisible(false)
            }
        }
        document.addEventListener("keydown", closeOnEsc)

        return () => {
            document.removeEventListener("keydown", closeOnEsc)
        }
    }, [])

    return {
        showPopover,
        popoverVisible,
        setPopoverVisible,
        popoverFocused,
        popoverQuery,
        onKeyDown,
        onKeyUp,
    }
}
