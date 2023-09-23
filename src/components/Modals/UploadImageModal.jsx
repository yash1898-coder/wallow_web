import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../ErrorMessage"
import { FileInput } from "../FileInput"
import { Spinner } from "../Spinner"
import { ModalHeader } from "./ModalHeader"
import { useState } from "react"

export const UploadImageModal = ({ modal, onSubmit, error, isLoading }) => {
    const { closeModal } = useStore()
    const [img, setImg] = useState(undefined)
    const [imgForFormData, setImgForFormData] = useState(undefined)

    const onChange = (e) => {
        const { files } = e.target
        setImg(URL.createObjectURL(files[0]))
        setImgForFormData(files[0])
    }

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Upload image`}
                modal={modal}
            />
            <form
                id="upload-product-img"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(imgForFormData)
                }}
                className="modal__content flow"
            >
                <FileInput
                    file={img}
                    onChange={onChange}
                />
                <button
                    className="button"
                    disabled={!img}
                    style={{ alignSelf: "center" }}
                    onClick={() => setImg(undefined)}
                >
                    Clear
                </button>
            </form>
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
                    form="upload-product-img"
                    className="button button--green"
                >
                    {isLoading && <Spinner />}
                    Submit
                </button>
            </div>
        </dialog>
    )
}
