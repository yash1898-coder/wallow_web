export const CircleIndicator = ({ color }) => {
    return (
        <span
            style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                background: color,
                borderRadius: "100vmax",
            }}
        ></span>
    )
}
