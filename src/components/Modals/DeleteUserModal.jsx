import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"
import { ModalHeader } from "./ModalHeader"

export const DeleteUserModal = ({ onSubmit, user, error, isLoading }) => {
    const { closeModal } = useStore()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Delete user?`}
                modal={"deleteUser"}
            />
            <div className="modal__content">
                <p>
                    Are you sure you want to delete <b>{user["Full Name"]}</b> ?
                </p>
                <p>This action is irreversible.</p>
            </div>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    onClick={() => closeModal("deleteUser")}
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
                    Delete
                </button>
            </div>
        </dialog>
    )
}
