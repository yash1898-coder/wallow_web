import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"
import { ModalHeader } from "./ModalHeader"

export const DeletionConfirmationModal = ({
    isLoading,
    error,
    onClick,
    toDelete,
    modal,
}) => {
    const { closeModal } = useStore()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Delete ${toDelete} ?`}
                modal={modal}
            />
            <div
                className="modal__content mt flow"
                style={{ "--margin": ".75rem" }}
            >
                <p>Are you sure you want to delete {toDelete} ?</p>
                <p>This action is irreversible.</p>
            </div>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    onClick={() => closeModal(modal)}
                    className="button button--inverted"
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    onClick={onClick}
                    form="invite-modal"
                    className="modal__button button button--red"
                >
                    {isLoading && <Spinner />}
                    Delete
                </button>
            </div>
        </dialog>
    )
}
