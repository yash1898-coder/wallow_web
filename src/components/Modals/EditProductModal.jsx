import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { useRef } from "react"
import { useInputValidation } from "../../hooks/useInputValidation"
import { useMutation, useQueryClient } from "react-query"
import { editProduct } from "../../api/products"
import { ErrorMessage } from "../ErrorMessage"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { Spinner } from "../Spinner"
import { useState } from "react"
import { FileInput } from "../FileInput"

export const EditProductModal = ({ product }) => {
    const { closeModal, openToast } = useStore()
    const { editingProduct, setEditingProduct } = useEditProductStore()
    const { product_lead, product_creator } = editingProduct

    const [img, setImg] = useState(undefined)
    const [imgForFormData, setImgForFormData] = useState(undefined)
    const [name, setName] = useState(editingProduct?.name)
    const [description, setDescription] = useState(editingProduct?.description)

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(
        () =>
            editProduct(editingProduct.id, {
                ...editingProduct,
                name,
                description,
                image: imgForFormData,
                product_creator,
                product_lead,
            }),
        {
            onSuccess: (product) => {
                queryClient.invalidateQueries(["products", editingProduct.id])
                openToast({ text: "Product updated!" })
                closeModal("editProduct")
                setEditingProduct({ ...editingProduct, ...product })
            },
        }
    )

    const onNameChange = (e) => setName(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onImgChange = (e) => {
        const { files } = e.target
        setImg(URL.createObjectURL(files[0]))
        setImgForFormData(files[0])
    }

    const productNameRef = useRef()
    const descriptionRef = useRef()
    const {
        invalid: productNameInvalid,
        makeValid: makeProductNameValid,
        checkValidity: checkProductNameValidity,
    } = useInputValidation(productNameRef)
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
                title={`Edit ${product}`}
                modal={"editProduct"}
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
                    htmlFor="productName"
                >
                    Product name
                </label>
                <input
                    ref={productNameRef}
                    value={name}
                    onChange={(e) => {
                        onNameChange(e)
                        makeProductNameValid()
                    }}
                    required
                    name="name"
                    className={`input  ${productNameInvalid ? "invalid" : ""}`}
                    type="text"
                    id="productName"
                    placeholder="Enter product name"
                />
                <label
                    className="fs-400  label"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    ref={descriptionRef}
                    value={description}
                    onChange={(e) => {
                        onDescriptionChange(e)
                        makeDescriptionValid()
                    }}
                    required
                    name="description"
                    className={`input ${descriptionInvalid ? "invalid" : ""}`}
                    type="text"
                    id="description"
                    placeholder="Enter product description"
                />
                <label
                    className="fs-400  label"
                    htmlFor="img"
                >
                    Upload image
                </label>
                <FileInput
                    file={img}
                    onChange={onImgChange}
                    required={false}
                />
                <button
                    type="button"
                    className="button mt"
                    disabled={!img}
                    style={{ alignSelf: "center", "--margin": "1rem" }}
                    onClick={() => setImg(undefined)}
                >
                    Clear
                </button>
            </form>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer modal__footer--centered">
                <button
                    disabled={isLoading}
                    onClick={() => {
                        checkProductNameValidity()
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
