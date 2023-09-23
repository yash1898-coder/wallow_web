
export const MessageTooltip = ({ children, text, visible, offsetLeft = 0, offsetRight = 0 }) => {

    return (
        <div className="tooltip-wrapper">
            <span style={{ marginLeft: offsetLeft, marginRight: offsetRight }}
                data-visible={visible} className="tooltip">{text}</span>
            {children}
        </div>
    )
}
