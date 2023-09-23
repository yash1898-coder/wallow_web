import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { useCreateProductStore } from "../../stores/useCreateProductStore"
import { useRef } from "react"
import { useInputValidation } from "../../hooks/useInputValidation"
import { useMutation, useQueryClient } from "react-query"
import { createProduct } from "../../api/products"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"
import { useNavigate } from "react-router-dom"
import { useEditProductStore } from "../../stores/useEditProductStore"

export const CreateProductModal = () => {
    const { closeModal, openToast } = useStore()
    const { setEditingProduct } = useEditProductStore()
    const { onChange, formData, resetFormData } = useCreateProductStore()

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(() => createProduct(formData), {
        onSuccess: (createdProduct) => {
            setEditingProduct(createdProduct.context)
            queryClient.invalidateQueries(["products"])
            openToast({ text: "Added new productspace!" })
            closeModal("createProduct")
            navigate("/dashboard/progress")
            resetFormData()
        },
    })

    const productNameRef = useRef()
    // const descriptionRef = useRef()
    const {
        invalid: productNameInvalid,
        makeValid: makeProductNameValid,
        checkValidity: checkProductNameValidity,
    } = useInputValidation(productNameRef)
    // const {
    //     invalid: descriptionInvalid,
    //     makeValid: makeDescriptionValid,
    //     checkValidity: checkDescriptionValidity,
    // } = useInputValidation(descriptionRef)

    const ref = useRef()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={"Create productspace"}
                modal={"createProduct"}
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
                    Create a new productspace and align teams and key
                    stakeholders to share delivery progress, blockers, and
                    impediments, daily.
                </p>
                <label
                    className="fs-400  label"
                    htmlFor="productName"
                >
                    Productspace name
                </label>
                <input
                    ref={productNameRef}
                    value={formData.name}
                    onChange={(e) => {
                        onChange(e)
                        makeProductNameValid()
                    }}
                    required
                    name="name"
                    className={`input  ${productNameInvalid ? "invalid" : ""}`}
                    type="text"
                    id="productName"
                    placeholder="Enter productspace name"
                />
                {/* <label
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
                    placeholder="Enter product description"
                /> */}
            </form>
            <div className="modal__footer modal__footer--centered">
                {error && <ErrorMessage message={error.message} />}
                <button
                    disabled={isLoading}
                    onClick={() => {
                        checkProductNameValidity()
                        // checkDescriptionValidity()
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
