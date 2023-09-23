import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { useRef } from "react"
import { useInputValidation } from "../../hooks/useInputValidation"
import { useMutation, useQueryClient } from "react-query"
import { createProductArea } from "../../api/productAreas"
import { useCreateProductAreaStore } from "../../stores/useCreateProductAreaStore"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { useNavigate } from "react-router-dom"
import { useEditProductAreaStore } from "../../stores/useEditProductAreaStore"

export const CreateProductAreaModal = () => {
    const { closeModal, openToast } = useStore()
    const { editingProduct } = useEditProductStore()
    const { setEditingProductArea } = useEditProductAreaStore()
    const { onChange, formData, resetFormData } = useCreateProductAreaStore()

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(() => createProductArea(editingProduct.id, formData), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["productAreas"])
            navigate(`/dashboard/product-areas/${res.id}`)
            setEditingProductArea(res)
            openToast({ text: "Created a new product area!" })
            closeModal("createProductArea")
            resetFormData()
        },
    })

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
                title={"Create product area"}
                modal={"createProductArea"}
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
                <p>
                    See how Wallow can help your coaches focus on the right
                    things to boost team sentiment and performance.
                </p>
                <label
                    className="fs-400  label"
                    htmlFor="name"
                >
                    Product area name
                </label>
                <input
                    ref={productAreaNameRef}
                    value={formData.productAreaName}
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
                    value={formData.description}
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
                    Create
                </button>
            </div>
        </dialog>
    )
}
