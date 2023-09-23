import { useMutation, useQueryClient } from "react-query"
import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { deleteProduct } from "../../api/products"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { ErrorMessage } from "../ErrorMessage"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../Spinner"

export const DeleteProductModal = () => {
    const { closeModal, openToast } = useStore()
    const { editingProduct } = useEditProductStore()

    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(() => deleteProduct(editingProduct.id), {
        onSuccess: () => {
            queryClient.invalidateQueries([
                "products",
                { id: editingProduct.id },
            ])
            openToast({ text: "Productspace deleted!" })
            closeModal("deleteProduct")
            navigate("/dashboard")
        },
    })

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Delete ${editingProduct.name} ?`}
                modal={"deleteProduct"}
            />
            <div
                className="modal__content mt flow"
                style={{ "--margin": ".75rem" }}
            >
                <p>Are you sure you want to delete {editingProduct.name} ?</p>
                <p>This action is irreversible.</p>
            </div>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    onClick={() => closeModal("deleteProduct")}
                    className="button button--inverted"
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    onClick={onSubmit}
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
