import { useEditProductStore } from "../../stores/useEditProductStore"
import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../ErrorMessage"
import { Select } from "../Select"
import { Spinner } from "../Spinner"
import { ModalHeader } from "./ModalHeader"

export const ChangeAccountTypeModal = ({
    isLoading,
    error,
    user,
    accountType,
    onSubmit,
    options,
    onChange,
}) => {
    const { closeModal } = useStore()
    const { editingProduct } = useEditProductStore()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Change account type`}
                modal={"changeAccountType"}
            />
            <div className="modal__content">
                <p className="mb">
                    Select the account type <b>{user["Full Name"]}</b> should
                    have for <b>{editingProduct.name}</b>.
                </p>
                <Select
                    options={options}
                    currOption={accountType}
                    onChange={onChange}
                />
            </div>
            <div className="modal__footer">
                {error && <ErrorMessage message={error.message} />}
                <button
                    onClick={() => closeModal("changeAccountType")}
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
                    className="modal__button button button--green"
                >
                    {isLoading && <Spinner />}
                    Save
                </button>
            </div>
        </dialog>
    )
}
