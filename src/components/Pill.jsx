export const Pill = ({ text, color, number = false }) => {
    return (
        <p
            className="pill"
            style={{
                flexDirection: number ? "column" : "row",
                backgroundColor: `var(--${color})`,
            }}
        >
            {number && <span className="fw-600 fs-475">{number}</span>}
            {text}
        </p>
    )
}
