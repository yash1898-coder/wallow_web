import { useState } from "react"

export const Tooltip = ({
    children,
    style = "",
    maxWidth = false,
    text,
    className = "",
    position = "",
}) => {
    const [visible, setVisible] = useState(false)

    return (
        <span
            className={className}
            style={{
                position: "relative",
                width: "100%",
                cursor: "pointer",
                display: "inline-block",
            }}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            <span
                style={{
                    ...style,
                    maxWidth: maxWidth ? maxWidth : "unset",
                }}
                data-visible={visible}
                className={`tooltip ${position}`}
            >
                {text}
            </span>
        </span>
    )
}
