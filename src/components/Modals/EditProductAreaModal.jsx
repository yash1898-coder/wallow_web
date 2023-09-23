import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { useRef } from "react"
import { useInputValidation } from "../../hooks/useInputValidation"
import { useEditProductAreaStore } from "../../stores/useEditProductAreaStore"
import { useMutation, useQueryClient } from "react-query"
import { editProductArea } from "../../api/productAreas"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"

export const EditProductAreaModal = ({ productArea, id }) => {
    const { closeModal, openToast } = useStore()
    const { onChange, editingProductArea } = useEditProductAreaStore()
    const { description, name } = editingProductArea

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(
        () => editProductArea(id, { ...productArea, description, name }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["productAreas", id])
                queryClient.invalidateQueries(["productAreas"])
                openToast({ text: "Product area updated!" })
                closeModal("editProductArea")
            },
        }
    )

    const productAreaNameRef = useRef()
    const descriptionRef = useRef()
    const {
        invalid: productAreaNameInvalid,
        makeValid: makeProductAreaNameValid,
        checkValidity: checkProductAreaNameValidity,
    } = useInputValidation(productAreaNameRef)
    const {
        invalid: descriptionInvalid,
        makeValid: makeDescriptionValid,
        checkValidity: checkDescriptionValidity,
    } = useInputValidation(descriptionRef)

    const ref = useRef()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Edit ${productArea.name} product area`}
                modal={"editProductArea"}
            />
            <form
                ref={ref}
                id="create-product-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
                className="modal__content modal-form"
            >
                <label
                    className="fs-400  label"
                    htmlFor="name"
                >
                    Product area name
                </label>
                <input
                    ref={productAreaNameRef}
                    value={editingProductArea.name}
                    onChange={(e) => {
                        onChange(e)
                        makeProductAreaNameValid()
                    }}
                    required
                    name="name"
                    className={`input  ${
                        productAreaNameInvalid ? "invalid" : ""
                    }`}
                    type="text"
                    id="name"
                    placeholder="Enter product area name"
                />
                <label
                    className="fs-400  label"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    ref={descriptionRef}
                    value={editingProductArea.description}
                    onChange={(e) => {
                        onChange(e)
                        makeDescriptionValid()
                    }}
                    required
                    name="description"
                    className={`input ${descriptionInvalid ? "invalid" : ""}`}
                    type="text"
                    id="description"
                    placeholder="Enter product area description"
                />
            </form>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer modal__footer--centered">
                <button
                    disabled={isLoading}
                    onClick={() => {
                        checkProductAreaNameValidity()
                        checkDescriptionValidity()
                    }}
                    form="create-product-form"
                    className="modal__button button button--icon-label-inverted"
                >
                    {isLoading && <Spinner />}
                    Save
                </button>
            </div>
        </dialog>
    )
}
