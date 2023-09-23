export const ModalWrapper = ({ children, open }) => {
    return (
        open && (
            <>
                <div className="modal-backdrop" />
                {children}
            </>
        )
    )
}
