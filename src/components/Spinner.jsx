export const Spinner = ({
    style = "",
    className = "",
    size = "50px",
    color = "var(--clr-neutral-550)",
}) => {
    return (
        <span
            style={{ "--_size": size, "--_color": color, ...style }}
            className={`spinner ${className}`}
        ></span>
    )
}
