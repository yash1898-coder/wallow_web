import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"
import { ModalHeader } from "./ModalHeader"

export const DeactivateUserModal = ({ onSubmit, isLoading, error }) => {
    const { closeModal } = useStore()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Deactivate user?`}
                modal={"deactivateUser"}
            />
            <div className="modal__content">
                <p>What happens when an account is deactivated?</p>
                <ul
                    className="list mt"
                    style={{ "--margin": "1rem" }}
                >
                    <li>
                        The member will no longer be able to sign in to the
                        workspace.
                    </li>
                    <li>
                        The member's messages and files will still be
                        accessible.
                    </li>
                </ul>
            </div>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    onClick={() => closeModal("deactivateUser")}
                    className="button button--inverted"
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    onClick={() => {
                        onSubmit()
                    }}
                    form="invite-modal"
                    className="modal__button button button--red"
                >
                    {isLoading && <Spinner />}
                    Deactivate
                </button>
            </div>
        </dialog>
    )
}
