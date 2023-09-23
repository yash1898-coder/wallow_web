import { useRef } from "react"
import image from "../assets/image.svg"

export const FileButton = ({ ...rest }) => {
    const inputRef = useRef(null)

    const onKeyDown = (e) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault()
            inputRef.current?.click()
        }
    }

    return (
        <label
            onKeyDown={onKeyDown}
            role="button"
            aria-controls="image"
            tabIndex={0}
            htmlFor="image"
            className={"file-button"}
        >
            <input
                ref={inputRef}
                name="image"
                id="image"
                type="file"
                {...rest}
            />
            <img
                src={image}
                alt="image"
            />
        </label>
    )
}
