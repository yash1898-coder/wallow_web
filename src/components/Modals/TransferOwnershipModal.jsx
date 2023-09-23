import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../ErrorMessage"
import { Pfp } from "../Pfp"
import { Spinner } from "../Spinner"
import { ModalHeader } from "./ModalHeader"

export const TransferOwnershipModal = ({
    isLoading,
    error,
    onSubmit,
    selectedMember,
}) => {
    const { closeModal } = useStore()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={"Transfer Ownership"}
                modal={"transferOwnership"}
            />
            <div className="modal__content modal__content--even-cols">
                <div
                    className="flow"
                    data-spacing="small"
                >
                    <p>
                        Are you sure you want to make{" "}
                        <b>{selectedMember["Full Name"]}</b> the new
                        organization owner? This cannot be undone.
                    </p>
                    <p>
                        <b>Transfer Ownership to:</b>
                    </p>
                    <div className="flex profile-card">
                        <Pfp
                            img={selectedMember.profile_image}
                            name={selectedMember["Full Name"]}
                        />
                        <div>
                            <p>
                                <b>{selectedMember["Full Name"]}</b>
                            </p>
                            <p>{selectedMember.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    onClick={() => closeModal("transferOwnership")}
                    className="button button--inverted"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onSubmit()}
                    form="transfer-ownership-form"
                    disabled={isLoading}
                    className="modal__button button button--green"
                >
                    {isLoading && <Spinner />}
                    Transfer Ownership
                </button>
            </div>
        </dialog>
    )
}
